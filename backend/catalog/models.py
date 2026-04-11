from django.db import models
from django.utils.text import slugify


class Category(models.Model):
    """Product categories: Heritage Teas, Shade-Grown Coffees, Snacks, Sweets"""
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(blank=True, default='')
    icon = models.CharField(max_length=50, blank=True, default='eco')
    display_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name_plural = 'Categories'
        ordering = ['display_order', 'name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Product(models.Model):
    """Individual menu items — teas, coffees, snacks, sweets."""
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    image_url = models.URLField(blank=True, default='')  # For external hosted images

    is_available = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    origin = models.CharField(max_length=100, blank=True, default='')  # "Darjeeling", "Coorg"
    tags = models.JSONField(default=list, blank=True)  # ["bestseller", "new"]

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['category__display_order', 'name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} — ₹{self.price}"

    @property
    def display_image(self):
        """Return the image URL, preferring uploaded file over external URL."""
        if self.image:
            return self.image.url
        return self.image_url


class SommelierCuration(models.Model):
    """Sommelier curated boxes: Silver, Shahi Brass (One-time purchase)."""
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True)
    tagline = models.CharField(max_length=200, blank=True, default='')
    price = models.DecimalField(max_digits=8, decimal_places=2)
    features = models.JSONField(default=list)  # ["1x 250g Rare Estate Blend", ...]
    icon = models.CharField(max_length=50, default='workspace_premium')
    badge_text = models.CharField(max_length=50, blank=True, default='')
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['price']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} — ₹{self.price}"


class GiftHamper(models.Model):
    """Curated gift boxes for festivals and occasions."""
    OCCASION_CHOICES = [
        ('diwali', 'Diwali'),
        ('anniversary', 'Anniversary'),
        ('corporate', 'Corporate'),
        ('wedding', 'Wedding'),
        ('birthday', 'Birthday'),
        ('general', 'General'),
    ]

    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    image = models.ImageField(upload_to='hampers/', blank=True, null=True)
    image_url = models.URLField(blank=True, default='')
    occasion = models.CharField(max_length=20, choices=OCCASION_CHOICES, default='general')
    contents = models.JSONField(default=list)  # ["Zaffrani Chai 200g", "Brass Kulhad Set"]
    is_limited = models.BooleanField(default=False)
    badge_text = models.CharField(max_length=50, blank=True, default='')
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['price']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} — ₹{self.price}"
