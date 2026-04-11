from django.urls import path
from .views import WeatherProxyView, ArchiveImageProxy

urlpatterns = [
    path('telemetry/', WeatherProxyView.as_view(), name='weather-telemetry'),
    path('archive-image/', ArchiveImageProxy.as_view(), name='archive-image'),
]
