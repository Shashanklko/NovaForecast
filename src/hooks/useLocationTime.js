import { useState, useEffect } from 'react';

export const useLocationTime = (location, weatherData) => {
  const [locationTime, setLocationTime] = useState(new Date());
  const [timezone, setTimezone] = useState(null);

  useEffect(() => {
    // Get timezone from weather data (most accurate)
    let detectedTimezone = null;
    if (weatherData?.timezone) {
      detectedTimezone = weatherData.timezone;
      setTimezone(detectedTimezone);
    } else if (location?.latitude && location?.longitude) {
      // Calculate approximate timezone from coordinates as fallback
      // Each 15 degrees of longitude ≈ 1 hour time difference
      const offsetHours = Math.round(location.longitude / 15);
      const offsetMinutes = Math.round((location.longitude % 15) * 4);
      const totalOffsetMinutes = offsetHours * 60 + offsetMinutes;
      
      detectedTimezone = {
        offset: totalOffsetMinutes,
        isOffset: true,
      };
      setTimezone(detectedTimezone);
    } else {
      setTimezone(null);
    }

    // Update time every second
    const timer = setInterval(() => {
      if (detectedTimezone) {
        if (typeof detectedTimezone === 'string') {
          // IANA timezone format (e.g., "America/New_York")
          try {
            const now = new Date();
            
            // Get time string in target timezone
            const timeString = now.toLocaleString('en-US', {
              timeZone: detectedTimezone,
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false,
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            });
            
            // Parse the time string to get components
            // Format: "MM/DD/YYYY, HH:MM:SS"
            const [datePart, timePart] = timeString.split(', ');
            const [month, day, year] = datePart.split('/').map(Number);
            const [hour, minute, second] = timePart.split(':').map(Number);
            
            // Create a date object representing this time
            // We need to create it as if it were in local timezone
            // but adjust for the actual timezone offset
            const localDate = new Date(year, month - 1, day, hour, minute, second);
            
            // Get the same moment in local timezone
            const localTimeString = now.toLocaleString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false,
            });
            const [localHour, localMin, localSec] = localTimeString.split(':').map(Number);
            const localDate2 = new Date(year, month - 1, day, localHour, localMin, localSec);
            
            // Calculate the difference
            const diff = localDate.getTime() - localDate2.getTime();
            const targetTime = new Date(now.getTime() + diff);
            
            setLocationTime(targetTime);
          } catch (error) {
            console.error('Error formatting time in timezone:', error);
            // Fallback to local time
            setLocationTime(new Date());
          }
        } else if (detectedTimezone.isOffset && detectedTimezone.offset !== undefined) {
          // Offset-based timezone (calculated from coordinates)
          const now = new Date();
          const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
          const targetTime = new Date(utcTime + (detectedTimezone.offset * 60000));
          setLocationTime(targetTime);
        } else {
          setLocationTime(new Date());
        }
      } else {
        // No location/timezone, use local time
        setLocationTime(new Date());
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [location, weatherData]);

  return { locationTime, timezone };
};

