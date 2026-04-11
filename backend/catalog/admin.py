from django.contrib import admin
from .models import Category, Product, SommelierCuration, GiftHamper


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'icon', 'display_order', 'is_active']
    list_editable = ['display_order', 'is_active']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'origin', 'is_available', 'is_featured']
    list_filter = ['category', 'is_available', 'is_featured', 'origin']
    search_fields = ['name', 'description']
    list_editable = ['price', 'is_available', 'is_featured']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(SommelierCuration)
class SommelierCurationAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'is_active']
    list_editable = ['price', 'is_active']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(GiftHamper)
class GiftHamperAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'occasion', 'is_limited', 'is_active']
    list_filter = ['occasion', 'is_limited', 'is_active']
    list_editable = ['price', 'is_active']
    prepopulated_fields = {'slug': ('name',)}
