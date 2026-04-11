from rest_framework import serializers
from .models import MembershipTier

class MembershipTierSerializer(serializers.ModelSerializer):
    class Meta:
        model = MembershipTier
        fields = '__all__'
