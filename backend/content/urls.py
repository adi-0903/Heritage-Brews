from django.urls import path
from . import views

urlpatterns = [
    path('stories/', views.BlogPostListView.as_view(), name='story-list'),
    path('stories/<slug:slug>/', views.BlogPostDetailView.as_view(), name='story-detail'),
    path('estates/', views.EstateListView.as_view(), name='estate-list'),
    path('farmers/', views.FarmerListView.as_view(), name='farmer-list'),
    path('newsletter/', views.NewsletterSubscribeView.as_view(), name='newsletter-subscribe'),
]
