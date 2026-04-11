from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.db.models import Sum, Q
from .models import RewardTier, TokenTransaction
from .serializers import RewardTierSerializer, TokenTransactionSerializer


class RewardTierListView(generics.ListAPIView):
    """GET /api/rewards/tiers/ — List all loyalty tiers."""
    queryset = RewardTier.objects.all()
    serializer_class = RewardTierSerializer
    permission_classes = [AllowAny]
    pagination_class = None


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def rewards_dashboard(request):
    """GET /api/rewards/dashboard/ — User's complete rewards dashboard."""
    profile = request.user.profile
    transactions = TokenTransaction.objects.filter(user=request.user)

    total_earned = transactions.filter(amount__gt=0).aggregate(total=Sum('amount'))['total'] or 0
    total_redeemed = abs(transactions.filter(amount__lt=0).aggregate(total=Sum('amount'))['total'] or 0)

    tier_display_map = dict(profile.TIER_CHOICES)

    return Response({
        'tea_tokens': profile.tea_tokens,
        'loyalty_tier': profile.loyalty_tier,
        'loyalty_tier_display': tier_display_map.get(profile.loyalty_tier, profile.loyalty_tier),
        'next_tier_tokens': profile.next_tier_tokens,
        'total_earned': total_earned,
        'total_redeemed': total_redeemed,
    })


class TokenTransactionListView(generics.ListAPIView):
    """GET /api/rewards/history/ — User's token transaction history."""
    serializer_class = TokenTransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return TokenTransaction.objects.filter(user=self.request.user)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def redeem_tokens(request):
    """
    POST /api/rewards/redeem/
    Redeem tokens for a discount on the next order.
    Rate: 100 tokens = ₹50 discount.
    """
    tokens_to_redeem = request.data.get('tokens', 0)
    try:
        tokens_to_redeem = int(tokens_to_redeem)
    except (TypeError, ValueError):
        return Response({'error': 'Invalid token amount.'}, status=status.HTTP_400_BAD_REQUEST)

    if tokens_to_redeem < 100:
        return Response({'error': 'Minimum 100 tokens required for redemption.'}, status=status.HTTP_400_BAD_REQUEST)

    profile = request.user.profile
    if profile.tea_tokens < tokens_to_redeem:
        return Response({'error': 'Insufficient tokens.'}, status=status.HTTP_400_BAD_REQUEST)

    # Debit tokens
    discount = (tokens_to_redeem // 100) * 50  # ₹50 per 100 tokens
    actual_tokens = (tokens_to_redeem // 100) * 100  # Round down to nearest 100

    profile.tea_tokens -= actual_tokens
    profile.save(update_fields=['tea_tokens'])
    profile.recalculate_tier()

    # Log transaction
    TokenTransaction.objects.create(
        user=request.user,
        amount=-actual_tokens,
        transaction_type='redeem',
        reason=f'Redeemed {actual_tokens} tokens for ₹{discount} discount',
    )

    return Response({
        'message': f'Successfully redeemed {actual_tokens} tokens for ₹{discount} discount!',
        'tokens_redeemed': actual_tokens,
        'discount_amount': discount,
        'remaining_tokens': profile.tea_tokens,
    })
