from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import BlogPost, Estate, Farmer, NewsletterSubscriber
from .serializers import (
    BlogPostListSerializer, BlogPostDetailSerializer,
    EstateSerializer, FarmerSerializer, NewsletterSerializer,
)


class BlogPostListView(generics.ListAPIView):
    """GET /api/content/stories/ — List published blog posts."""
    queryset = BlogPost.objects.filter(is_published=True)
    serializer_class = BlogPostListSerializer
    permission_classes = [AllowAny]
    filterset_fields = ['category', 'is_featured']
    search_fields = ['title', 'excerpt', 'body']
    ordering_fields = ['published_at', 'read_time']


class BlogPostDetailView(generics.RetrieveAPIView):
    """GET /api/content/stories/<slug>/ — Blog post detail."""
    queryset = BlogPost.objects.filter(is_published=True)
    serializer_class = BlogPostDetailSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'


class EstateListView(generics.ListAPIView):
    """GET /api/content/estates/ — List tea estates with farmers."""
    queryset = Estate.objects.prefetch_related('farmers').all()
    serializer_class = EstateSerializer
    permission_classes = [AllowAny]
    pagination_class = None


class FarmerListView(generics.ListAPIView):
    """GET /api/content/farmers/ — List all farmer profiles."""
    queryset = Farmer.objects.select_related('estate').all()
    serializer_class = FarmerSerializer
    permission_classes = [AllowAny]
    pagination_class = None


class NewsletterSubscribeView(generics.CreateAPIView):
    """POST /api/content/newsletter/ — Subscribe to newsletter."""
    serializer_class = NewsletterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        email = request.data.get('email', '').lower().strip()
        if NewsletterSubscriber.objects.filter(email=email).exists():
            return Response(
                {'message': 'You are already subscribed to our newsletter!'},
                status=status.HTTP_200_OK,
            )
        serializer = self.get_serializer(data={'email': email})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {'message': 'Welcome to the Heritage Brews family! 🍵'},
            status=status.HTTP_201_CREATED,
        )
