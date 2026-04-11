from rest_framework import serializers
from .models import RewardTier, TokenTransaction


class RewardTierSerializer(serializers.ModelSerializer):
    class Meta:
        model = RewardTier
        fields = '__all__'


class TokenTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TokenTransaction
        fields = ['id', 'amount', 'transaction_type', 'reason', 'created_at']


class RewardsDashboardSerializer(serializers.Serializer):
    """Aggregated rewards dashboard for the current user."""
    tea_tokens = serializers.IntegerField()
    loyalty_tier = serializers.CharField()
    loyalty_tier_display = serializers.CharField()
    next_tier_tokens = serializers.IntegerField()
    total_earned = serializers.IntegerField()
    total_redeemed = serializers.IntegerField()
