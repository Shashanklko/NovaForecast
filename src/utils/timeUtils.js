// Get timezone from coordinates using a free API
export const getTimezoneFromCoordinates = async (latitude, longitude) => {
  try {
    // Use TimeZoneDB API (free tier available) or calculate from longitude
    // For simplicity, we'll use a timezone lookup API
    const response = await fetch(
      `https://api.timezonedb.com/v2.1/get-time-zone?key=YOUR_API_KEY&format=json&by=position&lat=${latitude}&lng=${longitude}`
    );
    
    if (!response.ok) {
      throw new Error('Timezone API failed');
    }
    
    const data = await response.json();
    return data.zoneName || 'UTC';
  } catch (error) {
    // Fallback: calculate approximate timezone from longitude
    // Each 15 degrees of longitude = 1 hour time difference
    const offsetHours = Math.round(longitude / 15);
    const offsetMinutes = Math.round((longitude % 15) * 4);
    const totalOffsetMinutes = offsetHours * 60 + offsetMinutes;
    
    // Convert to timezone string (e.g., "UTC+5:30")
    const sign = totalOffsetMinutes >= 0 ? '+' : '-';
    const absOffset = Math.abs(totalOffsetMinutes);
    const hours = Math.floor(absOffset / 60);
    const minutes = absOffset % 60;
    
    return `UTC${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }
};

// Get timezone from weather API response (if available)
export const getTimezoneFromWeatherData = (weatherData) => {
  if (weatherData?.timezone) {
    return weatherData.timezone;
  }
  return null;
};

// Get current time in a specific timezone
export const getTimeInTimezone = (timezone) => {
  try {
    // Use Intl API to format time in specific timezone
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    
    const parts = formatter.formatToParts(now);
    const timeObj = {};
    parts.forEach(part => {
      timeObj[part.type] = part.value;
    });
    
    // Create a date object in the target timezone
    const year = parseInt(timeObj.year);
    const month = parseInt(timeObj.month) - 1; // Month is 0-indexed
    const day = parseInt(timeObj.day);
    const hour = parseInt(timeObj.hour);
    const minute = parseInt(timeObj.minute);
    const second = parseInt(timeObj.second);
    
    // Create date in UTC, then adjust for timezone
    const utcDate = new Date(Date.UTC(year, month, day, hour, minute, second));
    
    // Get timezone offset
    const tzDate = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
    const utcDate2 = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
    const offset = tzDate.getTime() - utcDate2.getTime();
    
    return new Date(utcDate.getTime() - offset);
  } catch (error) {
    console.error('Error getting time in timezone:', error);
    // Fallback: calculate from timezone offset
    return calculateTimeFromOffset(timezone);
  }
};

// Calculate time from timezone offset string (e.g., "UTC+5:30")
const calculateTimeFromOffset = (timezone) => {
  const match = timezone.match(/UTC([+-])(\d{2}):(\d{2})/);
  if (!match) {
    return new Date(); // Fallback to local time
  }
  
  const sign = match[1] === '+' ? 1 : -1;
  const hours = parseInt(match[2]);
  const minutes = parseInt(match[3]);
  const offsetMinutes = sign * (hours * 60 + minutes);
  
  const now = new Date();
  const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
  const targetTime = new Date(utcTime + (offsetMinutes * 60000));
  
  return targetTime;
};

// Get time of day based on hour
export const getTimeOfDay = (hour) => {
  if (hour >= 0 && hour < 2) {
    return 'midnight';
  } else if (hour >= 2 && hour < 5) {
    return 'night';
  } else if (hour >= 5 && hour < 12) {
    return 'morning';
  } else if (hour >= 12 && hour < 14) {
    return 'noon';
  } else if (hour >= 14 && hour < 18) {
    return 'afternoon';
  } else if (hour >= 18 && hour < 22) {
    return 'evening';
  } else {
    return 'night';
  }
};

// Format time of day for display
export const formatTimeOfDay = (timeOfDay) => {
  const timeOfDayMap = {
    midnight: 'Midnight',
    night: 'Night',
    morning: 'Morning',
    noon: 'Noon',
    afternoon: 'Afternoon',
    evening: 'Evening',
  };
  
  return timeOfDayMap[timeOfDay] || 'Day';
};

