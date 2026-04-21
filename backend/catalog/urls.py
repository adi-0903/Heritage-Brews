from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.CategoryListView.as_view(), name='category-list'),
    path('products/', views.ProductListView.as_view(), name='product-list'),
    path('products/featured/', views.featured_products, name='product-featured'),
    path('products/<slug:slug>/', views.ProductDetailView.as_view(), name='product-detail'),
    path('curations/', views.SommelierCurationListView.as_view(), name='sommelier-curation-list'),
    path('gifts/', views.GiftHamperListView.as_view(), name='gift-list'),
    path('gifts/<slug:slug>/', views.GiftHamperDetailView.as_view(), name='gift-detail'),
    path('ai/chat/', views.ArchivistChatView.as_view(), name='archivist-chat'),
    path('admin/products/', views.AdminProductListView.as_view(), name='admin-product-list'),
    path('admin/products/create/', views.AdminProductCreateView.as_view(), name='admin-product-create'),
    path('admin/products/<int:pk>/', views.AdminProductUpdateView.as_view(), name='admin-product-update'),
    
    path('admin/curations/', views.AdminSommelierCurationListView.as_view(), name='admin-curation-list'),
    path('admin/curations/create/', views.AdminSommelierCurationCreateView.as_view(), name='admin-curation-create'),
    path('admin/curations/<int:pk>/', views.AdminSommelierCurationUpdateView.as_view(), name='admin-curation-update'),
    
    path('admin/gifts/', views.AdminGiftHamperListView.as_view(), name='admin-gift-list'),
    path('admin/gifts/create/', views.AdminGiftHamperCreateView.as_view(), name='admin-gift-create'),
    path('admin/gifts/<int:pk>/', views.AdminGiftHamperUpdateView.as_view(), name='admin-gift-update'),
]
