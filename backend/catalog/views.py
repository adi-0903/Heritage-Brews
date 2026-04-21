from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from .models import Category, Product, SommelierCuration, GiftHamper
from .serializers import (
    CategorySerializer, ProductListSerializer, ProductDetailSerializer,
    SommelierCurationSerializer, GiftHamperListSerializer, GiftHamperDetailSerializer,
    AdminProductUpdateSerializer, AdminCurationUpdateSerializer, AdminHamperUpdateSerializer,
    AdminProductCreateSerializer, AdminCurationCreateSerializer, AdminHamperCreateSerializer,
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


class AdminProductListView(generics.ListAPIView):
    """GET /api/catalog/admin/products/ — List all products for admins."""
    queryset = Product.objects.all().select_related('category').order_by('-created_at')
    serializer_class = ProductListSerializer
    permission_classes = [IsAdminUser]
    pagination_class = None


class AdminProductUpdateView(generics.UpdateAPIView):
    """PATCH /api/catalog/admin/products/<pk>/ — Update product stock & price."""
    queryset = Product.objects.all()
    serializer_class = AdminProductUpdateSerializer
    permission_classes = [IsAdminUser]

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)


class AdminSommelierCurationListView(generics.ListAPIView):
    queryset = SommelierCuration.objects.all().order_by('-price')
    serializer_class = SommelierCurationSerializer
    permission_classes = [IsAdminUser]
    pagination_class = None


class AdminSommelierCurationUpdateView(generics.UpdateAPIView):
    """PATCH /api/catalog/admin/curations/<pk>/ — Update curation stock & price."""
    queryset = SommelierCuration.objects.all()
    serializer_class = AdminCurationUpdateSerializer
    permission_classes = [IsAdminUser]

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)


class AdminGiftHamperListView(generics.ListAPIView):
    queryset = GiftHamper.objects.all().order_by('-created_at')
    serializer_class = GiftHamperListSerializer
    permission_classes = [IsAdminUser]
    pagination_class = None


class AdminGiftHamperUpdateView(generics.UpdateAPIView):
    """PATCH /api/catalog/admin/gifts/<pk>/ — Update hamper stock & price."""
    queryset = GiftHamper.objects.all()
    serializer_class = AdminHamperUpdateSerializer
    permission_classes = [IsAdminUser]

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)


class AdminProductCreateView(generics.CreateAPIView):
    """POST /api/catalog/admin/products/create/ — Add a new product."""
    queryset = Product.objects.all()
    serializer_class = AdminProductCreateSerializer
    permission_classes = [IsAdminUser]


class AdminSommelierCurationCreateView(generics.CreateAPIView):
    """POST /api/catalog/admin/curations/create/ — Add a new curation."""
    queryset = SommelierCuration.objects.all()
    serializer_class = AdminCurationCreateSerializer
    permission_classes = [IsAdminUser]


class AdminGiftHamperCreateView(generics.CreateAPIView):
    """POST /api/catalog/admin/gifts/create/ — Add a new hamper."""
    queryset = GiftHamper.objects.all()
    serializer_class = AdminHamperCreateSerializer
    permission_classes = [IsAdminUser]


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


from rest_framework.views import APIView
from .ai_service import get_archivist_response

class ArchivistChatView(APIView):
    """Archivist AI: A royal Indian sommelier concierge."""
    permission_classes = [AllowAny]
    
    def post(self, request):
        message = request.data.get('message')
        history = request.data.get('history', [])
        
        if not message:
            return Response({"error": "No message provided"}, status=400)
        
        try:
            # Fetch catalog context for the Archivist's autonomous agency
            products = Product.objects.filter(is_available=True)
            product_list = [f"ID:{p.id} - {p.name} (₹{p.price})" for p in products]
            product_context = "\n".join(product_list)
            
            response_text = get_archivist_response(message, history, product_context)
            return Response({
                "response": response_text,
                "role": "The Archivist",
                "dialect": "Royal Indian Sommelier"
            })
        except Exception as e:
            return Response({"message": str(e)}, status=500)
