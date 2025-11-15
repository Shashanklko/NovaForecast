import React, { useRef, useEffect } from 'react';
import { formatTime, getWeatherIcon, convertToFahrenheit } from '../../utils/weatherUtils';
import './HourlyForecast.css';

const HourlyForecast = ({ hourlyData, isCelsius, currentHour }) => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current && currentHour !== undefined) {
      const scrollPosition = currentHour * 100; // Approximate scroll position
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [currentHour]);

  if (!hourlyData || hourlyData.length === 0) {
    return (
      <div className="hourly-forecast">
        <h3 className="hourly-forecast-title">24-Hour Forecast</h3>
        <div className="hourly-forecast-empty">No hourly data available</div>
      </div>
    );
  }

  return (
    <div className="hourly-forecast">
      <h3 className="hourly-forecast-title">24-Hour Forecast</h3>
      <div className="hourly-forecast-container" ref={scrollContainerRef}>
        {hourlyData.map((hour, index) => {
          const temp = isCelsius 
            ? `${Math.round(hour.temperature)}°C` 
            : `${convertToFahrenheit(hour.temperature)}°F`;
          // Determine if it's day or night based on hour
          const hourOfDay = new Date(hour.time).getHours();
          const isDay = hourOfDay >= 6 && hourOfDay < 20; // 6 AM to 8 PM
          const icon = getWeatherIcon(hour.weatherCode, isDay);
          const isCurrent = index === currentHour;

          return (
            <div 
              key={index} 
              className={`hourly-item ${isCurrent ? 'current' : ''}`}
            >
              <div className="hourly-time">{formatTime(hour.time)}</div>
              <div className="hourly-icon">{icon}</div>
              <div className="hourly-temp">{temp}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;

