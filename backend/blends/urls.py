from django.urls import path
from . import views

urlpatterns = [
    path('spices/', views.SpiceOptionListView.as_view(), name='spice-list'),
    path('', views.CustomBlendCreateView.as_view(), name='blend-create'),
    path('my/', views.CustomBlendListView.as_view(), name='blend-list'),
    path('community/', views.CommunityBlendListView.as_view(), name='blend-community'),
    path('<int:pk>/', views.CustomBlendDeleteView.as_view(), name='blend-delete'),
]
