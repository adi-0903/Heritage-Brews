from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .serializers import (
    RegisterSerializer, UserSerializer,
    ProfileUpdateSerializer, ChangePasswordSerializer,
    GoogleLoginSerializer
)
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from django.conf import settings
from django.utils.crypto import get_random_string
import os


class RegisterView(generics.CreateAPIView):
    """
    POST /api/auth/register/
    Create a new user account with profile.
    """
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Generate tokens immediately after registration
        refresh = RefreshToken.for_user(user)
        return Response({
            'message': 'Registration successful. Welcome to Heritage Brews!',
            'user': UserSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        }, status=status.HTTP_201_CREATED)


class ProfileView(generics.RetrieveUpdateAPIView):
    """
    GET  /api/auth/profile/ — Retrieve current user's full profile
    PUT  /api/auth/profile/ — Update profile + user fields
    """
    serializer_class = ProfileUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.profile

    def retrieve(self, request, *args, **kwargs):
        user_data = UserSerializer(request.user).data
        return Response(user_data)


class ChangePasswordView(generics.UpdateAPIView):
    """
    PUT /api/auth/password/change/
    Change the authenticated user's password.
    """
    serializer_class = ChangePasswordSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        request.user.set_password(serializer.validated_data['new_password'])
        request.user.save()
        return Response({'message': 'Password updated successfully.'})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """
    POST /api/auth/logout/
    Blacklist the refresh token to log out.
    """
    try:
        refresh_token = request.data.get('refresh')
        if not refresh_token:
            return Response({'error': 'Refresh token is required.'}, status=status.HTTP_400_BAD_REQUEST)
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({'message': 'Logged out successfully.'})
    except Exception:
        return Response({'error': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)


class GoogleLoginView(generics.GenericAPIView):
    """
    POST /api/auth/google/
    Login or Register via Google ID Token
    """
    serializer_class = GoogleLoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = serializer.validated_data['credential']

        try:
            # Verify the Google token with clock skew tolerance
            client_id = os.environ.get('GOOGLE_CLIENT_ID', getattr(settings, 'GOOGLE_CLIENT_ID', None))
            idinfo = id_token.verify_oauth2_token(
                token, 
                google_requests.Request(), 
                client_id,
                clock_skew_in_seconds=60
            )
            
            email = idinfo.get('email')
            given_name = idinfo.get('given_name', '')
            family_name = idinfo.get('family_name', '')
            
            # Check or create user
            user = User.objects.filter(email=email).first()
            if not user:
                # Need to create a new user
                username = email.split('@')[0]
                if User.objects.filter(username=username).exists():
                    username = f"{username}_{get_random_string(4)}"
                
                user = User.objects.create_user(
                    username=username,
                    email=email,
                    first_name=given_name,
                    last_name=family_name,
                    password=get_random_string(32)
                )
            else:
                # Optionally update user's profile with latest google data
                pass
            
            # Generate local JWT tokens
            refresh = RefreshToken.for_user(user)
            return Response({
                'message': 'Google login successful.',
                'user': UserSerializer(user).data,
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            }, status=status.HTTP_200_OK)

        except ValueError as e:
            print("Google Token Error:", str(e))
            return Response({'error': f'Invalid Google token: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
