import React from 'react';
import { formatDate, getWeatherIcon, convertToFahrenheit } from '../../utils/weatherUtils';
import './WeatherCard.css';

const WeatherCard = ({ weather, isCelsius, onClick, isSelected = false }) => {
  const { date, maxTemperature, minTemperature, weatherCode } = weather;
  // For daily forecasts, use day icon (daily forecasts represent daytime conditions)
  // Check if it's today - if so, use current time, otherwise default to day
  const now = new Date();
  const isToday = date instanceof Date && 
    date.toDateString() === now.toDateString();
  const hourOfDay = isToday ? now.getHours() : 12; // Use current hour if today, else noon
  const isDay = hourOfDay >= 6 && hourOfDay < 20; // 6 AM to 8 PM
  const icon = getWeatherIcon(weatherCode, isDay);
  const maxTemp = isCelsius ? `${maxTemperature}°C` : `${convertToFahrenheit(maxTemperature)}°F`;
  const minTemp = isCelsius ? `${minTemperature}°C` : `${convertToFahrenheit(minTemperature)}°F`;

  return (
    <div 
      className={`weather-card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
    >
      <div className="weather-card-date">{formatDate(date)}</div>
      <div className="weather-card-icon">{icon}</div>
      <div className="weather-card-temps">
        <span className="temp-high">{maxTemp}</span>
        <span className="temp-low">{minTemp}</span>
      </div>
    </div>
  );
};

export default WeatherCard;

