from rest_framework import serializers
from .models import SpiceOption, CustomBlend


class SpiceOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpiceOption
        fields = '__all__'


class CustomBlendSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = CustomBlend
        fields = [
            'id', 'name', 'spice_levels', 'flavor_tags', 'intensity_label',
            'is_public', 'username', 'created_at',
        ]
        read_only_fields = ['id', 'intensity_label', 'username', 'created_at']


class CreateBlendSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomBlend
        fields = ['name', 'spice_levels', 'flavor_tags', 'is_public']
