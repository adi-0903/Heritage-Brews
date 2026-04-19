import random
import requests
import os
from django.conf import settings
from django.core.cache import cache
from django.http import FileResponse, Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.views import View

class ArchiveImageProxy(View):
    """
    Serves generated archival images to bypass browser 'file://' restrictions.
    """
    def get(self, request):
        filename = request.GET.get('file')
        if not filename:
            raise Http404("Filename required.")

        # Path to frontend public images
        BRAIN_PATH = os.path.join(settings.BASE_DIR, '..', 'frontend', 'public', 'images')
        file_path = os.path.join(BRAIN_PATH, filename)

        if not os.path.exists(file_path):
            # Fallback for library background
            if filename == "cinematic_library_background.png":
                # Search for any file containing that string in the BRAIN_PATH
                files = [f for f in os.listdir(BRAIN_PATH) if "cinematic_library_background" in f]
                if files:
                    file_path = os.path.join(BRAIN_PATH, files[0])
            else:
                raise Http404(f"Archival image {filename} not found.")

        return FileResponse(open(file_path, 'rb'), content_type='image/png')

class WeatherProxyView(APIView):
    permission_classes = [AllowAny]
    
    # Heritage Estate Registry
    ESTATES = {
        'darjeeling': {'lat': 27.0371, 'lon': 88.2636, 'name': 'Makaibari Estate'},
        'assam': {'lat': 26.7509, 'lon': 94.2037, 'name': 'Dibrugarh Estate'},
        'nilgiri': {'lat': 11.3530, 'lon': 76.7950, 'name': 'Coonoor Estate'}
    }

    def get(self, request):
        api_key = getattr(settings, 'OPENWEATHER_API_KEY', None)
        results = {}

        for slug, coords in self.ESTATES.items():
            cache_key = f"weather_{slug}"
            data = cache.get(cache_key)

            if not data:
                if api_key:
                    try:
                        url = f"https://api.openweathermap.org/data/2.5/weather?lat={coords['lat']}&lon={coords['lon']}&appid={api_key}&units=metric"
                        response = requests.get(url, timeout=5)
                        weather_json = response.json()
                        
                        if response.status_code == 200:
                            data = {
                                'temp': round(weather_json['main']['temp']),
                                'condition': weather_json['weather'][0]['main'],
                                'description': weather_json['weather'][0]['description'],
                                'is_live': True
                            }
                        else:
                            print(f"API Error for {slug}: {weather_json.get('message')}")
                            data = self.get_mock_weather(slug)
                    except Exception as e:
                        print(f"Weather fetch failed for {slug}: {e}")
                        data = self.get_mock_weather(slug)
                else:
                    # Fallback to Mocked Atmosphere if no key exists
                    data = self.get_mock_weather(slug)
                
                # Cache for 1 hour to preserve API integrity
                cache.set(cache_key, data, 3600)
            
            results[slug] = data
            
            # Privilege Check for Activation
            if request.user.is_authenticated and hasattr(request.user, 'profile'):
                membership = request.user.profile.active_membership
                if membership and 'weather_live' in (membership.feature_keys or []):
                    # User has live syncing activated
                    results[slug]['is_activated'] = True
                    results[slug]['note'] = "Live Archival Syncing Active"
                else:
                    results[slug]['is_activated'] = False
                    if not results[slug].get('is_live'):
                        results[slug]['note'] = "Archival Simulation (Acquire Lineage for Live Sync)"
            else:
                results[slug]['is_activated'] = False

        return Response({
            'status': 'archival_telemetry_active',
            'estates': results
        })

    def get_mock_weather(self, slug):
        """Generates realistic atmospheric conditions for development."""
        conditions = [
            {'condition': 'Rain', 'description': 'misty mountain rain', 'temp_range': (16, 22)},
            {'condition': 'Clouds', 'description': 'heavy rolling mist', 'temp_range': (18, 24)},
            {'condition': 'Clear', 'description': 'golden hour clarity', 'temp_range': (22, 28)},
            {'condition': 'Drizzle', 'description': 'archival soft dew', 'temp_range': (17, 21)},
        ]
        
        # Consistent random based on slug for demo stability
        random.seed(len(slug)) 
        selected = random.choice(conditions)
        
        return {
            'temp': random.randint(*selected['temp_range']),
            'condition': selected['condition'],
            'description': selected['description'],
            'is_live': False,
            'note': 'Archival Simulation'
        }
