from django.db import models
from django.contrib.auth.models import User


class SpiceOption(models.Model):
    """Available spices for the Chai Masala Builder."""
    name_en = models.CharField(max_length=50)      # "Elaichi"
    name_hi = models.CharField(max_length=50)      # "इलायची"
    description = models.CharField(max_length=200) # "Green Cardamom • Sweet & Floral"
    icon = models.CharField(max_length=50, default='eco')
    default_intensity = models.PositiveIntegerField(default=30)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return f"{self.name_en} ({self.name_hi})"


class CustomBlend(models.Model):
    """User-created custom chai blend with spice intensity levels."""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blends')
    name = models.CharField(max_length=200)
    spice_levels = models.JSONField()        # {"elaichi": 30, "adrak": 60, ...}
    flavor_tags = models.JSONField(default=list)  # ["Spicy", "Floral"]
    intensity_label = models.CharField(max_length=50, blank=True, default='Aromatic')
    is_public = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} by {self.user.username}"

    def save(self, *args, **kwargs):
        # Auto-calculate intensity label from spice levels
        if self.spice_levels:
            avg = sum(self.spice_levels.values()) / len(self.spice_levels)
            if avg > 70:
                self.intensity_label = 'Bold'
            elif avg > 40:
                self.intensity_label = 'Aromatic'
            else:
                self.intensity_label = 'Mild'
        super().save(*args, **kwargs)
