from rest_framework import serializers
from .models import BlogPost, Estate, Farmer, NewsletterSubscriber


class BlogPostListSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'category', 'excerpt', 'cover_image',
            'cover_image_url', 'author_name', 'read_time', 'is_featured',
            'published_at',
        ]


class BlogPostDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = '__all__'


class FarmerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Farmer
        fields = ['id', 'name', 'bio', 'photo', 'photo_url', 'generation', 'quote']


class EstateSerializer(serializers.ModelSerializer):
    farmers = FarmerSerializer(many=True, read_only=True)

    class Meta:
        model = Estate
        fields = [
            'id', 'name', 'tagline', 'description', 'image', 'image_url',
            'altitude', 'region', 'map_latitude', 'map_longitude', 'farmers',
        ]


class NewsletterSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = ['email']
