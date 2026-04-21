from rest_framework import serializers
from .models import Category, Product, SommelierCuration, GiftHamper


class ProductListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'description', 'price', 'image',
            'category', 'category_name', 'is_available', 'is_featured',
            'origin', 'tags', 'stock_quantity',
        ]

    def get_image(self, obj):
        return obj.display_image


class ProductDetailSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'

    def get_image(self, obj):
        return obj.display_image


class CategorySerializer(serializers.ModelSerializer):
    product_count = serializers.SerializerMethodField()
    products = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'icon', 'display_order', 'product_count', 'products']

    def get_product_count(self, obj):
        return obj.products.filter(is_available=True).count()
        
    def get_products(self, obj):
        products = obj.products.filter(is_available=True)
        return ProductListSerializer(products, many=True).data


class SommelierCurationSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = SommelierCuration
        fields = '__all__'

    def get_image(self, obj):
        return obj.display_image


class GiftHamperListSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = GiftHamper
        fields = [
            'id', 'name', 'slug', 'description', 'price', 'image',
            'occasion', 'contents', 'is_limited', 'badge_text',
            'stock_quantity', 'is_active',
        ]

    def get_image(self, obj):
        return obj.display_image


class GiftHamperDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = GiftHamper
        fields = '__all__'


# ────────────────────────────────────────────────────────────
# Admin PATCH-only serializers (stock & price management)
# These are intentionally narrow — only expose mutable fields.
# Use PATCH (not PUT) so unchanged fields are left untouched.
# ────────────────────────────────────────────────────────────

class AdminProductUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['price', 'stock_quantity', 'is_available']


class AdminCurationUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = SommelierCuration
        fields = ['price', 'stock_quantity', 'is_active']


class AdminHamperUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = GiftHamper
        fields = ['price', 'stock_quantity', 'is_active']


# ────────────────────────────────────────────────────────────
# Full Creation Serializers (Admin only)
# ────────────────────────────────────────────────────────────

class AdminProductCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'category', 'name', 'description', 'price', 
            'image', 'image_url', 'stock_quantity', 'is_available', 
            'is_featured', 'origin'
        ]

class AdminCurationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = SommelierCuration
        fields = [
            'name', 'description', 'price', 'image', 'image_url', 
            'stock_quantity', 'is_active', 'badge_text', 
            'features', 'tagline'
        ]

class AdminHamperCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = GiftHamper
        fields = [
            'name', 'description', 'price', 'image', 'image_url', 
            'occasion', 'contents', 'is_limited', 
            'badge_text', 'stock_quantity', 'is_active'
        ]
