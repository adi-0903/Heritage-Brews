from django.urls import path
from . import views

urlpatterns = [
    path('', views.OrderListView.as_view(), name='order-list'),
    path('admin/all/', views.AdminOrderListView.as_view(), name='admin-order-list'),
    path('admin/user/<int:user_id>/', views.admin_user_orders_view, name='admin-user-orders'),
    path('admin/<str:order_number>/', views.AdminOrderUpdateView.as_view(), name='admin-order-update'),
    path('<str:order_number>/', views.OrderDetailView.as_view(), name='order-detail'),
    path('payments/initiate/', views.payment_initiate, name='payment-initiate'),
    path('payments/verify/', views.payment_verify, name='payment-verify'),
]
