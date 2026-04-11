from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MembershipTierViewSet

router = DefaultRouter()
router.register(r'tiers', MembershipTierViewSet, basename='membership-tier')

urlpatterns = [
    path('', include(router.urls)),
]
