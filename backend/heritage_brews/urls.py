"""
Heritage Brews — Root URL Configuration
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


@api_view(['GET'])
@permission_classes([AllowAny])
def api_root(request):
    """API Health Check & Welcome Endpoint"""
    return Response({
        'message': 'Heritage Brews API — विरासत चाय',
        'version': '1.0.0',
        'status': 'running',
        'endpoints': {
            'auth': '/api/auth/',
            'catalog': '/api/catalog/',
            'cart': '/api/cart/',
            'orders': '/api/orders/',
            'reservations': '/api/reservations/',
            'blends': '/api/blends/',
            'rewards': '/api/rewards/',
            'content': '/api/content/',
        }
    })


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_root, name='api-root'),
    path('api/auth/', include('accounts.urls')),
    path('api/catalog/', include('catalog.urls')),
    path('api/cart/', include('orders.cart_urls')),
    path('api/orders/', include('orders.urls')),
    path('api/reservations/', include('reservations.urls')),
    path('api/blends/', include('blends.urls')),
    path('api/rewards/', include('rewards.urls')),
    path('api/content/', include('content.urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
