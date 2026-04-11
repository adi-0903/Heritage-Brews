from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import SpiceOption, CustomBlend
from .serializers import SpiceOptionSerializer, CustomBlendSerializer, CreateBlendSerializer


class SpiceOptionListView(generics.ListAPIView):
    """GET /api/blends/spices/ — List all available spice options."""
    queryset = SpiceOption.objects.all()
    serializer_class = SpiceOptionSerializer
    permission_classes = [AllowAny]
    pagination_class = None


class CustomBlendCreateView(generics.CreateAPIView):
    """POST /api/blends/ — Save a custom blend."""
    serializer_class = CreateBlendSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CustomBlendListView(generics.ListAPIView):
    """GET /api/blends/ — List user's saved blends."""
    serializer_class = CustomBlendSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CustomBlend.objects.filter(user=self.request.user)


class CommunityBlendListView(generics.ListAPIView):
    """GET /api/blends/community/ — List public community blends."""
    queryset = CustomBlend.objects.filter(is_public=True).select_related('user')
    serializer_class = CustomBlendSerializer
    permission_classes = [AllowAny]


class CustomBlendDeleteView(generics.DestroyAPIView):
    """DELETE /api/blends/<id>/ — Delete a user's blend."""
    serializer_class = CustomBlendSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CustomBlend.objects.filter(user=self.request.user)
