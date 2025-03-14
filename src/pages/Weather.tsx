// src/pages/Weather.tsx
import React, { useEffect, useState } from 'react';
import { useBackNavigation } from '../hooks/useBackNavigation';
import CloudSunIcon from '../assets/pixel-icons/Weather-Cloud-Sun-Fine--Streamline-Pixel.svg';
import MoonStarsIcon from '../assets/pixel-icons/Weather-Cresent-Moon-Stars--Streamline-Pixel.svg';
import SnowmanIcon from '../assets/pixel-icons/Weather-Snowman--Streamline-Pixel.svg';
import ThermometerIcon from '../assets/pixel-icons/Weather-Temperature-Thermometer--Streamline-Pixel.svg';
import UmbrellaSnowingIcon from '../assets/pixel-icons/Weather-Umbrella-Snowing--Streamline-Pixel.svg';
import WindFlagIcon from '../assets/pixel-icons/Weather-Wind-Flag--Streamline-Pixel.svg';
import './css/Weather.css';

interface WeatherData {
  temp: number;
  condition: string;
  conditionCode: number;
  isDay: boolean;
}

const Weather: React.FC = () => {
  const handleBackClick = useBackNavigation();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // API key from .env
  const API_KEY = import.meta.env.VITE_WEATHERAPI_KEY || 'FALLBACK_API_KEY';
  const API_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Marrakech&aqi=no`;

  // Map condition codes to icons (based on WeatherAPI.com codes)
  const getWeatherIcon = (conditionCode: number, isDay: boolean) => {
    // Reference: https://www.weatherapi.com/docs/conditions.json
    switch (conditionCode) {
      case 1000: // Sunny (day) or Clear (night)
        return isDay ? CloudSunIcon : MoonStarsIcon;
      case 1003: // Partly cloudy
      case 1006: // Cloudy
      case 1009: // Overcast
        return isDay ? CloudSunIcon : MoonStarsIcon;
      case 1063: // Patchy rain possible
      case 1180: // Patchy light rain
      case 1183: // Light rain
      case 1186: // Moderate rain at times
      case 1189: // Moderate rain
      case 1192: // Heavy rain at times
      case 1195: // Heavy rain
        return UmbrellaSnowingIcon; // Using for rain
      case 1066: // Patchy snow possible
      case 1210: // Patchy light snow
      case 1213: // Light snow
      case 1216: // Moderate snow
      case 1219: // Heavy snow
      case 1222: // Heavy snow showers
        return SnowmanIcon; // Snow-related conditions
      case 1072: // Patchy freezing drizzle
      case 1198: // Light freezing rain
      case 1201: // Moderate or heavy freezing rain
        return UmbrellaSnowingIcon; // Freezing rain
      case 1087: // Thundery outbreaks possible
      case 1273: // Patchy light rain with thunder
      case 1276: // Moderate or heavy rain with thunder
        return UmbrellaSnowingIcon; // Thunder (using rain icon)
      case 1114: // Blowing snow
      case 1117: // Blizzard
        return WindFlagIcon; // Windy snow conditions
      default:
        return ThermometerIcon; // Fallback for unknown or extreme conditions
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      if (!API_KEY || API_KEY === 'FALLBACK_API_KEY') {
        setError('Hey, the WeatherAPI key’s missing. Toss it in the .env file, will ya?');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Weather fetch bombed out');
        const data = await response.json();

        setWeather({
          temp: data.current.temp_c,
          condition: data.current.condition.text,
          conditionCode: data.current.condition.code,
          isDay: data.current.is_day === 1,
        });
        setLoading(false);
      } catch (err) {
        setError('Oops, couldn’t grab the weather—maybe the internet’s on a coffee break.');
        setLoading(false);
      }
    };

    fetchWeather();
  }, [API_URL]);

  return (
    <div className="page-content">
      <h1>Weather in Marrakech</h1>
      {loading && <p>Fetching the Marrakech weather vibes...</p>}
      {error && <p className="error">{error}</p>}
      {weather && !loading && !error && (
        <div className="weather-container">
          <div className="icon-city">
            <img
              src={getWeatherIcon(weather.conditionCode, weather.isDay)}
              alt={weather.condition}
              className="weather-icon"
            />
            <span className="city-name">Marrakech</span>
          </div>
          <div className="weather-info">
            <p className="temperature">{weather.temp}°C</p>
            <p className="description">{weather.condition}</p>
          </div>
        </div>
      )}
      <a href="/" onClick={handleBackClick} className="back-link">
        Back to Home
      </a>
    </div>
  );
};

export default Weather;