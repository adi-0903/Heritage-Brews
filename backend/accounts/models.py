from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    """
    Extended user profile for Heritage Brews customers.
    Stores delivery defaults, loyalty info, and preferences.
    """

    TIER_CHOICES = [
        ('naya_patron', 'Naya Patron'),          # 0–1000 tokens
        ('brass_baron', 'Brass Baron'),          # 1000–5000 tokens
        ('heritage_keeper', 'Heritage Keeper'),  # 5000–15000 tokens
        ('maharaja', 'Maharaja'),                # 15000+ tokens
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    phone = models.CharField(max_length=15, blank=True, default='')
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)

    # Delivery defaults (pre-fill checkout)
    default_address = models.TextField(blank=True, default='')
    default_city = models.CharField(max_length=100, blank=True, default='')
    default_pincode = models.CharField(max_length=10, blank=True, default='')

    # Rewards & Loyalty
    tea_tokens = models.PositiveIntegerField(default=0)
    loyalty_tier = models.CharField(max_length=20, choices=TIER_CHOICES, default='naya_patron')

    # Membership
    active_membership = models.ForeignKey('memberships.MembershipTier', on_delete=models.SET_NULL, null=True, blank=True, related_name='members')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'User Profile'
        verbose_name_plural = 'User Profiles'

    def __str__(self):
        return f"{self.user.username}'s Profile"

    def recalculate_tier(self):
        """Auto-update loyalty tier based on token count."""
        if self.tea_tokens >= 15000:
            self.loyalty_tier = 'maharaja'
        elif self.tea_tokens >= 5000:
            self.loyalty_tier = 'heritage_keeper'
        elif self.tea_tokens >= 1000:
            self.loyalty_tier = 'brass_baron'
        else:
            self.loyalty_tier = 'naya_patron'
        self.save(update_fields=['loyalty_tier'])

    @property
    def next_tier_tokens(self):
        """Tokens needed to reach the next tier."""
        thresholds = {'naya_patron': 1000, 'brass_baron': 5000, 'heritage_keeper': 15000, 'maharaja': None}
        target = thresholds.get(self.loyalty_tier)
        if target is None:
            return 0
        return max(0, target - self.tea_tokens)
