from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.CategoryListView.as_view(), name='category-list'),
    path('products/', views.ProductListView.as_view(), name='product-list'),
    path('products/featured/', views.featured_products, name='product-featured'),
    path('products/<slug:slug>/', views.ProductDetailView.as_view(), name='product-detail'),
    path('subscriptions/', views.SubscriptionPlanListView.as_view(), name='subscription-list'),
    path('gifts/', views.GiftHamperListView.as_view(), name='gift-list'),
    path('gifts/<slug:slug>/', views.GiftHamperDetailView.as_view(), name='gift-detail'),
]
