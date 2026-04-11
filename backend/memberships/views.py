from rest_framework import viewsets
from .models import MembershipTier
from .serializers import MembershipTierSerializer

class MembershipTierViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MembershipTier.objects.filter(is_active=True)
    serializer_class = MembershipTierSerializer
