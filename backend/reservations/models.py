import random
import string
from django.db import models
from django.contrib.auth.models import User


class Reservation(models.Model):
    """Table reservation at the Heritage Brews Haveli."""

    SCOPE_CHOICES = [
        ('table', 'Standard Table Reservation'),
        ('partial', 'Exclusive Sanctuary (Hourly Private Booking)'),
        ('full', 'The Grand Buyout (Full Day Haveli Reservation)'),
    ]

    GUEST_CHOICES = [
        ('1-2', '1–2 Connoisseurs'),
        ('3-5', '3–5 Patrons'),
        ('6-10', '6–10 Patrons'),
        ('10-25', '10–25 (Private Gathering)'),
        ('25+', '25+ (Grand Celebration)'),
    ]

    OCCASION_CHOICES = [
        ('casual', 'Casual Visit / High Tea'),
        ('birthday', 'Birthday Celebration'),
        ('anniversary', 'Anniversary / Engagement'),
        ('business', 'Corporate Meeting / Offsite'),
        ('wedding', 'Pre-Wedding / Shagun Ceremony'),
        ('other', 'Other Cultural Gathering'),
    ]

    STATUS_CHOICES = [
        ('pending', 'Pending Review'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
        ('no_show', 'No Show'),
    ]

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='reservations')
    patron_name = models.CharField(max_length=200)
    phone = models.CharField(max_length=15)

    scope = models.CharField(max_length=20, choices=SCOPE_CHOICES)
    date = models.DateField()
    time_or_duration = models.CharField(max_length=100)
    guests = models.CharField(max_length=10, choices=GUEST_CHOICES)
    occasion = models.CharField(max_length=20, choices=OCCASION_CHOICES)
    special_instructions = models.TextField(blank=True, default='')

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    confirmation_code = models.CharField(max_length=12, unique=True, editable=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date', '-created_at']

    def save(self, *args, **kwargs):
        if not self.confirmation_code:
            self.confirmation_code = self._generate_code()
        super().save(*args, **kwargs)

    def _generate_code(self):
        """Generate a unique archive-style code like HB1263."""
        while True:
            # Generate prefix 'HB' followed by 4-6 random digits
            digits = ''.join(random.choices(string.digits, k=4))
            code = f"HB{digits}"
            if not Reservation.objects.filter(confirmation_code=code).exists():
                return code

    def __str__(self):
        return f"{self.patron_name} — {self.date} [{self.confirmation_code}]"
