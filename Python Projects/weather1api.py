import datetime as dt
import requests

BASE_URL = "http://api.openweathermap.org/data/2.5/weather?"
API_KEY = "08433b31f61bd5e694f932daba1313da"
CITY = str(input("Please Enter the City Name : "))

def kelvin_to_celsius_fahreinheit(kelvin):
    celsius =  kelvin - 273.15
    fareinheit = celsius * (9/5) * 32
    return celsius, fareinheit

url = BASE_URL + "appid=" + API_KEY + "&q=" + CITY

response = requests.get(url).json()

temp_kelvin = response['main']['temp']
temp_celsius, temp_fareinheit = kelvin_to_celsius_fahreinheit(temp_kelvin)
feels_like_kelvin = response['main']['feels_like']
feels_like_celsius, feels_like_fareinheit = kelvin_to_celsius_fahreinheit(feels_like_kelvin)
wind_speed = response['wind']['speed']
humidity = response['main']['humidity']
description = response['weather'][0]['description']
sunrise_time = dt.datetime.utcfromtimestamp(response['sys']['sunrise']) + dt.timedelta(seconds=response['timezone'])
sunset_time = dt.datetime.utcfromtimestamp(response['sys']['sunset']) + dt.timedelta(seconds=response['timezone'])

print(f"Temperature in {CITY}: {temp_celsius:.2f}°C or {temp_fareinheit:.2f}°F")
print(f"Temperature in {CITY}: feels like {feels_like_celsius:.2f} or {feels_like_fareinheit:.2f}°F")
print(f"Humidity in {CITY}: {humidity}%")
print(f"Wind Speed in {CITY}: {wind_speed}m/s")
print(f"General Weather in {CITY}: {description}")
print(f"Sun rises in {CITY} at {sunrise_time} local time.")
print(f"Sun sets in {CITY} at {sunset_time} local time.")
