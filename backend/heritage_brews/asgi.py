"""ASGI config for heritage_brews project."""
import os
from django.core.asgi import get_asgi_application
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'heritage_brews.settings')
application = get_asgi_application()
