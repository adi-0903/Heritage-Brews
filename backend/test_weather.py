import requests

def test_weather_api():
    api_key = "6bfed39cf1b219b28c114f2a47b71c48"
    # Darjeeling coordinates
    lat, lon = 27.0371, 88.2636
    url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}&units=metric"
    
    print(f"Pinging OpenWeather for Darjeeling (Makaibari)...")
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            data = response.json()
            print("✅ SUCCESS: Satellite Telemetry Active!")
            print(f"📍 Location: {data['name']}")
            print(f"🌡️ Temperature: {data['main']['temp']}°C")
            print(f"☁️ Condition: {data['weather'][0]['main']} ({data['weather'][0]['description']})")
        else:
            print(f"❌ ERROR: API returned status {response.status_code}")
            print(f"Response: {response.text}")
    except Exception as e:
        print(f"❌ ERROR: Connection Failed: {e}")

if __name__ == "__main__":
    test_weather_api()
