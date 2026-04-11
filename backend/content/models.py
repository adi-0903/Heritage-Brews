from django.db import models
from django.utils.text import slugify


class BlogPost(models.Model):
    """Heritage Brews journal articles — stories, recipes, history."""
    CATEGORY_CHOICES = [
        ('history', 'History'),
        ('recipe', 'Recipe'),
        ('culture', 'Culture'),
        ('origin', 'Origin Story'),
        ('guide', 'Guide'),
    ]

    title = models.CharField(max_length=300)
    slug = models.SlugField(unique=True, blank=True, max_length=350)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='history')
    excerpt = models.TextField()
    body = models.TextField()  # Supports Markdown / rich text
    cover_image = models.ImageField(upload_to='blog/', blank=True, null=True)
    cover_image_url = models.URLField(blank=True, default='')
    author_name = models.CharField(max_length=100, default='Heritage Brews Editorial')
    read_time = models.PositiveIntegerField(default=5)  # minutes
    is_featured = models.BooleanField(default=False)
    is_published = models.BooleanField(default=True)
    published_at = models.DateTimeField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-published_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Estate(models.Model):
    """Tea estate origins displayed on the Estates page."""
    name = models.CharField(max_length=200)
    tagline = models.CharField(max_length=200, blank=True, default='')
    description = models.TextField()
    image = models.ImageField(upload_to='estates/', blank=True, null=True)
    image_url = models.URLField(blank=True, default='')
    altitude = models.CharField(max_length=50, blank=True, default='')
    region = models.CharField(max_length=100, blank=True, default='')
    map_latitude = models.FloatField(null=True, blank=True)
    map_longitude = models.FloatField(null=True, blank=True)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return self.name


class Farmer(models.Model):
    """Farmer profiles linked to estates."""
    name = models.CharField(max_length=200)
    estate = models.ForeignKey(Estate, on_delete=models.CASCADE, related_name='farmers')
    bio = models.TextField()
    photo = models.ImageField(upload_to='farmers/', blank=True, null=True)
    photo_url = models.URLField(blank=True, default='')
    generation = models.CharField(max_length=50, blank=True, default='')
    quote = models.TextField(blank=True, default='')

    def __str__(self):
        return f"{self.name} — {self.estate.name}"


class NewsletterSubscriber(models.Model):
    """Email newsletter subscriptions."""
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.email
