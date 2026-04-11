from rest_framework import serializers
from .models import Category, Product, SubscriptionPlan, GiftHamper


class ProductListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'description', 'price', 'image',
            'category', 'category_name', 'is_available', 'is_featured',
            'origin', 'tags',
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


class SubscriptionPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionPlan
        fields = '__all__'


class GiftHamperListSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = GiftHamper
        fields = [
            'id', 'name', 'slug', 'description', 'price', 'image',
            'occasion', 'contents', 'is_limited', 'badge_text',
        ]

    def get_image(self, obj):
        if obj.image:
            return obj.image.url
        return obj.image_url


class GiftHamperDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = GiftHamper
        fields = '__all__'
