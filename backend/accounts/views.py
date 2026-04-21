from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .serializers import (
    RegisterSerializer, UserSerializer,
    ProfileUpdateSerializer, ChangePasswordSerializer,
    GoogleLoginSerializer, AdminUserSerializer
)
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from django.utils import timezone
from django.db.models import Sum
import os

# Circular import prevention: import inside the view if necessary, 
# but these are standard model imports.


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
        token = serializer.validated_data.get('credential')
        access_token_str = request.data.get('access_token')

        try:
            if token:
                # Verify the Google ID token
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
            elif access_token_str:
                # Verify via access token by calling Google's userinfo endpoint
                import requests
                response = requests.get(
                    'https://www.googleapis.com/oauth2/v3/userinfo',
                    params={'access_token': access_token_str}
                )
                if not response.ok:
                    return Response({'error': 'Invalid access token'}, status=status.HTTP_400_BAD_REQUEST)
                
                idinfo = response.json()
                email = idinfo.get('email')
                given_name = idinfo.get('given_name', '')
                family_name = idinfo.get('family_name', '')
            else:
                return Response({'error': 'No token provided'}, status=status.HTTP_400_BAD_REQUEST)
            
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

        except Exception as e:
            print("Google Token Error:", str(e))
            return Response({'error': f'Google authentication failed: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_stats_view(request):
    """
    GET /api/auth/admin/stats/
    Returns live statistics for the Admin Dashboard. Restricted to staff.
    """
    if not request.user.is_staff:
        return Response({'error': 'Archivist privileges required.'}, status=status.HTTP_403_FORBIDDEN)

    from orders.models import Order
    from reservations.models import Reservation
    from catalog.models import Product

    # 1. Royal Revenue (Sum of all paid orders)
    revenue_sum = Order.objects.filter(payment_status='paid').aggregate(total=Sum('total'))['total'] or 0
    total_revenue = f"₹{int(revenue_sum):,}"

    # 2. Active Decrees (Orders not yet delivered or cancelled)
    active_decrees = Order.objects.exclude(status__in=['delivered', 'cancelled']).count()

    # 3. Haveli Occupancy (Percentage of confirmed reservations vs total)
    total_res = Reservation.objects.count()
    confirmed_res = Reservation.objects.filter(status='confirmed').count()
    
    if total_res > 0:
        rate = (confirmed_res / total_res) * 100
        occupancy_rate = f"{int(rate)}%"
    else:
        occupancy_rate = "0%"

    # 4. Vault Reserves (Total items: Products + Curations + Hampers)
    from catalog.models import SommelierCuration, GiftHamper
    product_count = Product.objects.filter(is_available=True).count()
    curation_count = SommelierCuration.objects.filter(is_active=True).count()
    hamper_count = GiftHamper.objects.filter(is_active=True).count()
    vault_item_count = product_count + curation_count + hamper_count
    vault_reserves = f"{vault_item_count} items"

    # 5. Total Registered Patrons (Normal users only, excluding archivists/admins)
    total_patrons = User.objects.filter(is_staff=False, is_superuser=False).count()

    return Response({
        'total_revenue': total_revenue,
        'active_decrees': active_decrees,
        'haveli_occupancy': occupancy_rate,
        'vault_reserves': vault_reserves,
        'total_patrons': total_patrons,
        'revenue_delta': '+12%',
        'occupancy_delta': '+5%',
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_users_list_view(request):
    """
    GET /api/auth/admin/users/
    Returns a list of all patrons with their order counts and spending.
    """
    if not request.user.is_staff:
        return Response({'error': 'Archivist privileges required.'}, status=status.HTTP_403_FORBIDDEN)

    from .serializers import AdminUserSerializer
    users = User.objects.filter(is_staff=False, is_superuser=False).order_by('-date_joined')
    serializer = AdminUserSerializer(users, many=True)
    return Response(serializer.data)
