import React from 'react';
import { getBackgroundGradient } from '../../utils/weatherUtils';
import './Background.css';

const Background = ({ weatherCode, isDay, children }) => {
  const backgroundStyle = weatherCode !== undefined && weatherCode !== null
    ? {
        background: getBackgroundGradient(weatherCode, isDay),
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite',
      }
    : {};

  return (
    <div className="weather-background" style={backgroundStyle}>
      {children}
    </div>
  );
};

export default Background;

