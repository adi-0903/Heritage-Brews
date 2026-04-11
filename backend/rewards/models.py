from django.db import models
from django.contrib.auth.models import User


class RewardTier(models.Model):
    """Loyalty tier definitions: Pehla Cup, Chai Premi, Masala Raja, Shahi Mehman."""
    name = models.CharField(max_length=50)
    slug = models.SlugField(unique=True)
    min_tokens = models.PositiveIntegerField()
    max_tokens = models.PositiveIntegerField(null=True, blank=True)  # null = unlimited (top tier)
    icon = models.CharField(max_length=50, default='filter_vintage')
    color = models.CharField(max_length=7, default='#cd7f32')  # Hex color for badge
    description = models.TextField(blank=True, default='')
    perks = models.JSONField(default=list)

    class Meta:
        ordering = ['min_tokens']

    def __str__(self):
        max_display = self.max_tokens if self.max_tokens else '∞'
        return f"{self.name} ({self.min_tokens}–{max_display} tokens)"


class TokenTransaction(models.Model):
    """Ledger of token credits and debits for each user."""
    TRANSACTION_TYPES = [
        ('earn', 'Earned'),
        ('redeem', 'Redeemed'),
        ('bonus', 'Bonus'),
        ('expire', 'Expired'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='token_transactions')
    amount = models.IntegerField()  # Positive = credit, negative = debit
    transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPES, default='earn')
    reason = models.CharField(max_length=200)
    order = models.ForeignKey(
        'orders.Order', on_delete=models.SET_NULL,
        null=True, blank=True, related_name='token_transactions',
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        sign = '+' if self.amount > 0 else ''
        return f"{sign}{self.amount} tokens — {self.reason}"
