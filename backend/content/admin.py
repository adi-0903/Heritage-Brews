from django.contrib import admin
from .models import BlogPost, Estate, Farmer, NewsletterSubscriber


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'author_name', 'read_time', 'is_featured', 'is_published', 'published_at']
    list_filter = ['category', 'is_featured', 'is_published']
    search_fields = ['title', 'excerpt', 'body']
    list_editable = ['is_featured', 'is_published']
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'published_at'


class FarmerInline(admin.TabularInline):
    model = Farmer
    extra = 0


@admin.register(Estate)
class EstateAdmin(admin.ModelAdmin):
    list_display = ['name', 'region', 'altitude', 'display_order']
    list_editable = ['display_order']
    inlines = [FarmerInline]


@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ['email', 'subscribed_at', 'is_active']
    list_filter = ['is_active']
    search_fields = ['email']
