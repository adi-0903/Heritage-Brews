from django.contrib import admin
from .models import SpiceOption, CustomBlend


@admin.register(SpiceOption)
class SpiceOptionAdmin(admin.ModelAdmin):
    list_display = ['name_en', 'name_hi', 'description', 'icon', 'default_intensity', 'display_order']
    list_editable = ['display_order', 'default_intensity']


@admin.register(CustomBlend)
class CustomBlendAdmin(admin.ModelAdmin):
    list_display = ['name', 'user', 'intensity_label', 'is_public', 'created_at']
    list_filter = ['is_public', 'intensity_label']
    search_fields = ['name', 'user__username']
