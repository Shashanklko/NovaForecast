import React from 'react';
import { getWeatherIcon, getWeatherCode, convertToFahrenheit } from '../../utils/weatherUtils';
import './WeatherSummary.css';

const WeatherSummary = ({ currentWeather, location, isCelsius }) => {
  if (!currentWeather || !currentWeather.temperature) {
    return null;
  }

  const temperature = isCelsius
    ? `${Math.round(currentWeather.temperature)}°C`
    : `${convertToFahrenheit(currentWeather.temperature)}°F`;

  const weatherCode = currentWeather.WeatherCode || currentWeather.weatherCode;
  const isDay = currentWeather.isDay !== undefined ? currentWeather.isDay : true;
  const icon = getWeatherIcon(weatherCode, isDay);
  const condition = getWeatherCode(weatherCode);

  // Format location name
  const locationName = location?.name || 'Loading location...';
  const locationDisplay = location?.country 
    ? `${locationName}, ${location.country}`
    : locationName;

  return (
    <div className="weather-summary">
      <div className="weather-summary-icon">{icon}</div>
      <div className="weather-summary-content">
        <div className="weather-summary-temp">{temperature}</div>
        {condition && (
          <div className="weather-summary-condition">{condition}</div>
        )}
        {location && (
          <div className="weather-summary-location">📍 {locationDisplay}</div>
        )}
      </div>
    </div>
  );
};

export default WeatherSummary;

