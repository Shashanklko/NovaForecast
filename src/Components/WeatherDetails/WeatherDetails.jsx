import React from 'react';
import './WeatherDetails.css';

const WeatherDetails = ({ weather, isCelsius }) => {
  if (!weather) return null;

  const details = [
    {
      label: 'Humidity',
      value: weather.humidity ? `${weather.humidity}%` : 'N/A',
      icon: '💧',
    },
    {
      label: 'Wind Speed',
      value: weather.windSpeed ? `${weather.windSpeed} km/h` : 'N/A',
      icon: '💨',
    },
    {
      label: 'UV Index',
      value: weather.uvIndex !== undefined ? weather.uvIndex : 'N/A',
      icon: '☀️',
    },
    {
      label: 'Precipitation',
      value: weather.precipitation !== undefined ? `${weather.precipitation}mm` : 'N/A',
      icon: '🌧️',
    },
  ];

  return (
    <div className="weather-details">
      
      <div className="weather-details-grid">
        {details.map((detail, index) => (
          <div key={index} className="weather-detail-item">
            <div className="detail-icon">{detail.icon}</div>
            <div className="detail-content">
              <div className="detail-label">{detail.label}</div>
              <div className="detail-value">{detail.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDetails;

