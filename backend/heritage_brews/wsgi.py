"""WSGI config for heritage_brews project."""
import os
from django.core.wsgi import get_wsgi_application
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'heritage_brews.settings')
application = get_wsgi_application()
