from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Category, Product, SommelierCuration, GiftHamper
from .serializers import (
    CategorySerializer, ProductListSerializer, ProductDetailSerializer,
    SommelierCurationSerializer, GiftHamperListSerializer, GiftHamperDetailSerializer,
)
from .filters import ProductFilter, GiftHamperFilter


class CategoryListView(generics.ListAPIView):
    """GET /api/catalog/categories/ — List all product categories."""
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]
    pagination_class = None


class ProductListView(generics.ListAPIView):
    """GET /api/catalog/products/ — List products with filtering."""
    queryset = Product.objects.filter(is_available=True).select_related('category')
    serializer_class = ProductListSerializer
    permission_classes = [AllowAny]
    filterset_class = ProductFilter
    search_fields = ['name', 'description', 'origin']
    ordering_fields = ['price', 'name', 'created_at']


class ProductDetailView(generics.RetrieveAPIView):
    """GET /api/catalog/products/<slug>/ — Product detail."""
    queryset = Product.objects.filter(is_available=True)
    serializer_class = ProductDetailSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'


@api_view(['GET'])
@permission_classes([AllowAny])
def featured_products(request):
    """GET /api/catalog/products/featured/ — Featured products for homepage."""
    products = Product.objects.filter(is_featured=True, is_available=True).select_related('category')[:8]
    serializer = ProductListSerializer(products, many=True)
    return Response(serializer.data)


class SommelierCurationListView(generics.ListAPIView):
    """GET /api/catalog/subscriptions/ — List sommelier curation boxes."""
    queryset = SommelierCuration.objects.filter(is_active=True)
    serializer_class = SommelierCurationSerializer
    permission_classes = [AllowAny]
    pagination_class = None


class GiftHamperListView(generics.ListAPIView):
    """GET /api/catalog/gifts/ — List gift hampers with filtering."""
    queryset = GiftHamper.objects.filter(is_active=True)
    serializer_class = GiftHamperListSerializer
    permission_classes = [AllowAny]
    filterset_class = GiftHamperFilter
    pagination_class = None


class GiftHamperDetailView(generics.RetrieveAPIView):
    """GET /api/catalog/gifts/<slug>/ — Gift hamper detail."""
    queryset = GiftHamper.objects.filter(is_active=True)
    serializer_class = GiftHamperDetailSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'
