import React, { createContext, useContext } from 'react';
import { useLocationTime } from '../hooks/useLocationTime';
import { getTimeOfDay, formatTimeOfDay } from '../utils/timeUtils';

const TimeContext = createContext(null);

export const TimeProvider = ({ children, location, weatherData }) => {
  const { locationTime, timezone } = useLocationTime(location, weatherData);
  
  // Get time of day
  const hour = locationTime.getHours();
  const timeOfDay = getTimeOfDay(hour);
  const timeOfDayFormatted = formatTimeOfDay(timeOfDay);

  const value = {
    locationTime,
    timezone,
    timeOfDay,
    timeOfDayFormatted,
    hour,
  };

  return (
    <TimeContext.Provider value={value}>
      {children}
    </TimeContext.Provider>
  );
};

export const useTime = () => {
  const context = useContext(TimeContext);
  if (!context) {
    // Fallback to local time if context is not available
    return {
      locationTime: new Date(),
      timezone: null,
      timeOfDay: 'day',
      timeOfDayFormatted: 'Day',
      hour: new Date().getHours(),
    };
  }
  return context;
};

