from django.db import models

class MembershipTier(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=10, default="INR")
    billing_cycle = models.CharField(max_length=50, default="Per Annum")
    heritage_level = models.IntegerField(default=1) # 1: Novice, 2: Adept, 3: Grandmaster
    features = models.JSONField(default=list) # List of strings
    is_active = models.BooleanField(default=True)
    discount_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    feature_keys = models.JSONField(default=list, blank=True) # e.g. ["weather_live", "vault_access"]
    
    class Meta:
        ordering = ['heritage_level']

    def __str__(self):
        return f"{self.title} - {self.price} {self.currency}"
