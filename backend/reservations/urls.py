from django.urls import path
from . import views

urlpatterns = [
    path('', views.ReservationCreateView.as_view(), name='reservation-create'),
    path('list/', views.ReservationListView.as_view(), name='reservation-list'),
    path('admin/all/', views.AdminReservationListView.as_view(), name='admin-reservation-list'),
    path('admin/<str:confirmation_code>/', views.AdminReservationUpdateView.as_view(), name='admin-reservation-update'),
    path('availability/', views.reservation_availability, name='reservation-availability'),
    path('<str:code>/', views.reservation_status, name='reservation-status'),
    path('<str:code>/cancel/', views.reservation_cancel, name='reservation-cancel'),
]
