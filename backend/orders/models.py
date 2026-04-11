import uuid
from django.db import models
from django.contrib.auth.models import User


class Cart(models.Model):
    """Server-side cart. Authenticated users get a persistent cart; guests use session."""
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True, related_name='cart')
    session_key = models.CharField(max_length=40, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Shopping Cart'

    def __str__(self):
        if self.user:
            return f"Cart of {self.user.username}"
        return f"Guest Cart ({self.session_key[:8]}...)"

    @property
    def total_items(self):
        return sum(item.quantity for item in self.items.all())

    @property
    def subtotal(self):
        return sum(item.line_total for item in self.items.all())


class CartItem(models.Model):
    """Individual item in the cart."""
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey('catalog.Product', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['cart', 'product']

    def __str__(self):
        return f"{self.quantity}x {self.product.name}"

    @property
    def line_total(self):
        return self.product.price * self.quantity


class Order(models.Model):
    """Finalized order placed by a customer."""

    PAYMENT_CHOICES = [
        ('upi', 'Digital UPI Vault'),
        ('card', 'Credit/Debit Card'),
        ('bank', 'Traditional Banking'),
        ('netbanking', 'Traditional Banking'),
        ('cod', 'Cash on Arrival'),
    ]

    PAYMENT_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
    ]

    STATUS_CHOICES = [
        ('placed', 'Order Placed'),
        ('confirmed', 'Confirmed'),
        ('preparing', 'Preparing'),
        ('shipped', 'Shipped'),
        ('out_for_delivery', 'Out for Delivery'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    ]

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='orders')
    order_number = models.CharField(max_length=20, unique=True, editable=False)

    # Delivery Info (snapshot at order time)
    patron_name = models.CharField(max_length=200)
    phone = models.CharField(max_length=15)
    address = models.TextField()
    city = models.CharField(max_length=100)
    pincode = models.CharField(max_length=10)
    special_instructions = models.TextField(blank=True, default='')

    # Pricing
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    delivery_fee = models.DecimalField(max_digits=6, decimal_places=2, default=50.00)
    discount = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)
    total = models.DecimalField(max_digits=10, decimal_places=2)

    # Payment
    payment_method = models.CharField(max_length=20, choices=PAYMENT_CHOICES)
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='pending')
    payment_id = models.CharField(max_length=100, blank=True, default='')  # Razorpay/Stripe ID

    # Status
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='placed')

    # Rewards
    tokens_earned = models.PositiveIntegerField(default=0)
    tokens_redeemed = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.order_number:
            self.order_number = self._generate_order_number()
        super().save(*args, **kwargs)

    def _generate_order_number(self):
        """Generate a unique order number like HB-2026-A3F2."""
        short_uuid = uuid.uuid4().hex[:6].upper()
        from django.utils import timezone
        year = timezone.now().year
        return f"HB-{year}-{short_uuid}"

    def __str__(self):
        return f"Order {self.order_number} — ₹{self.total}"


class OrderItem(models.Model):
    """Snapshot of a product at order time (prices are frozen)."""
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey('catalog.Product', on_delete=models.SET_NULL, null=True, blank=True)
    membership_tier = models.ForeignKey('memberships.MembershipTier', on_delete=models.SET_NULL, null=True, blank=True)
    product_name = models.CharField(max_length=200)
    product_price = models.DecimalField(max_digits=8, decimal_places=2)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.quantity}x {self.product_name}"

    @property
    def line_total(self):
        return self.product_price * self.quantity
