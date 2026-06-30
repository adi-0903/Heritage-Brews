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

import time
from concurrent.futures import ThreadPoolExecutor

# Process-level memory cache to handle multi-worker/serverless cold start cache misses
_WEATHER_MEM_CACHE = {}  # slug -> (timestamp, data)

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
        now = time.time()
        
        slugs_to_fetch = []
        for slug in self.ESTATES.keys():
            cache_key = f"weather_{slug}"
            data = cache.get(cache_key)
            
            # Fallback to local memory cache if django cache misses (common in serverless/multiprocess)
            if not data and slug in _WEATHER_MEM_CACHE:
                cached_time, cached_data = _WEATHER_MEM_CACHE[slug]
                if now - cached_time < 3600:
                    data = cached_data
                    cache.set(cache_key, data, 3600)  # Populate django cache
            
            if data:
                results[slug] = data.copy() if hasattr(data, 'copy') else data
            else:
                slugs_to_fetch.append(slug)

        if slugs_to_fetch:
            def fetch_weather(slug):
                coords = self.ESTATES[slug]
                if api_key:
                    try:
                        clean_api_key = api_key.strip("'\" \t\r\n")
                        url = f"https://api.openweathermap.org/data/2.5/weather?lat={coords['lat']}&lon={coords['lon']}&appid={clean_api_key}&units=metric"
                        # Short timeout to avoid blocking thread for too long if OpenWeather is down/slow
                        response = requests.get(url, timeout=2.5)
                        weather_json = response.json()
                        
                        if response.status_code == 200:
                            return {
                                'temp': round(weather_json['main']['temp']),
                                'condition': weather_json['weather'][0]['main'],
                                'description': weather_json['weather'][0]['description'],
                                'is_live': True
                            }
                        else:
                            err_msg = weather_json.get('message', 'Unknown Error')
                            print(f"API Error for {slug}: {err_msg}")
                            mock_data = self.get_mock_weather(slug)
                            mock_data['error_reason'] = f"Status {response.status_code}: {err_msg}"
                            return mock_data
                    except Exception as e:
                        print(f"Weather fetch failed for {slug}: {e}")
                        mock_data = self.get_mock_weather(slug)
                        mock_data['error_reason'] = f"Exception: {str(e)}"
                        return mock_data
                else:
                    mock_data = self.get_mock_weather(slug)
                    mock_data['error_reason'] = "OPENWEATHER_API_KEY is missing or evaluated to None"
                    return mock_data

            with ThreadPoolExecutor(max_workers=len(slugs_to_fetch)) as executor:
                fetched_results = list(executor.map(fetch_weather, slugs_to_fetch))
                
            for slug, data in zip(slugs_to_fetch, fetched_results):
                cache.set(f"weather_{slug}", data, 3600)
                _WEATHER_MEM_CACHE[slug] = (now, data)
                results[slug] = data.copy() if hasattr(data, 'copy') else data

        # Final Privilege Check for Activation
        for slug in self.ESTATES.keys():
            if request.user.is_authenticated and hasattr(request.user, 'profile'):
                membership = request.user.profile.active_membership
                if membership and 'weather_live' in (membership.feature_keys or []):
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
