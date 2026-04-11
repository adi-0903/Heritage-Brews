from django.urls import path
from . import views

urlpatterns = [
    path('', views.ReservationCreateView.as_view(), name='reservation-create'),
    path('list/', views.ReservationListView.as_view(), name='reservation-list'),
    path('availability/', views.reservation_availability, name='reservation-availability'),
    path('<str:code>/', views.reservation_status, name='reservation-status'),
    path('<str:code>/cancel/', views.reservation_cancel, name='reservation-cancel'),
]
