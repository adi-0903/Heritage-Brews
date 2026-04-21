import django_filters
from .models import Product, GiftHamper


class ProductFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name='price', lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name='price', lookup_expr='lte')
    category = django_filters.CharFilter(field_name='category__slug')
    category_name = django_filters.CharFilter(field_name='category__name', lookup_expr='iexact')
    origin = django_filters.CharFilter(field_name='origin', lookup_expr='icontains')

    class Meta:
        model = Product
        fields = ['category', 'is_available', 'is_featured', 'origin']


class GiftHamperFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name='price', lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name='price', lookup_expr='lte')

    class Meta:
        model = GiftHamper
        fields = ['occasion', 'is_limited']
