from django.urls import path
from . import views

urlpatterns = [
    path('', views.CartView.as_view(), name='cart-view'),
    path('items/', views.CartItemAddView.as_view(), name='cart-add'),
    path('items/<int:pk>/', views.CartItemUpdateView.as_view(), name='cart-item-update'),
    path('clear/', views.CartClearView.as_view(), name='cart-clear'),
]
