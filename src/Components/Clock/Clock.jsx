import React from 'react';
import { useTime } from '../../contexts/TimeContext';
import './Clock.css';

const Clock = ({ is12Hour = true }) => {
  const { locationTime, timezone } = useTime();

  const formatTime = () => {
    // If we have a timezone, format the time using that timezone
    if (timezone && typeof timezone === 'string') {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: is12Hour,
      });
      
      const parts = formatter.formatToParts(now);
      const timeObj = {};
      parts.forEach(part => {
        timeObj[part.type] = part.value;
      });
      
      if (is12Hour) {
        const ampm = timeObj.dayPeriod || (parseInt(timeObj.hour) >= 12 ? 'PM' : 'AM');
        return {
          time: `${String(timeObj.hour).padStart(2, '0')}:${String(timeObj.minute).padStart(2, '0')}:${String(timeObj.second).padStart(2, '0')}`,
          ampm,
        };
      } else {
        // For 24-hour format, use hour12: false
        const formatter24 = new Intl.DateTimeFormat('en-US', {
          timeZone: timezone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
        
        const parts24 = formatter24.formatToParts(now);
        const timeObj24 = {};
        parts24.forEach(part => {
          timeObj24[part.type] = part.value;
        });
        
        return {
          time: `${String(timeObj24.hour).padStart(2, '0')}:${String(timeObj24.minute).padStart(2, '0')}:${String(timeObj24.second).padStart(2, '0')}`,
          ampm: null,
        };
      }
    }
    
    // Fallback: use locationTime directly
    const hours = locationTime.getHours();
    const minutes = locationTime.getMinutes();
    const seconds = locationTime.getSeconds();

    if (is12Hour) {
      const hours12 = hours % 12 || 12;
      const ampm = hours >= 12 ? 'PM' : 'AM';
      return {
        time: `${String(hours12).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
        ampm,
      };
    } else {
      return {
        time: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
        ampm: null,
      };
    }
  };

  const formatDate = () => {
    // If we have a timezone, format the date using that timezone
    if (timezone && typeof timezone === 'string') {
      const now = new Date();
      return now.toLocaleDateString('en-US', {
        timeZone: timezone,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
    // Otherwise, use the locationTime date components directly
    const year = locationTime.getFullYear();
    const month = locationTime.getMonth();
    const day = locationTime.getDate();
    const weekday = locationTime.getDay();
    
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    return `${weekdays[weekday]}, ${months[month]} ${day}, ${year}`;
  };

  const { time: timeString, ampm } = formatTime();

  return (
    <div className="clock-container">
      <div className="clock-time">
        <span className="clock-hours-minutes">{timeString}</span>
        {ampm && <span className="clock-ampm">{ampm}</span>}
      </div>
      <div className="clock-date">{formatDate()}</div>
    </div>
  );
};

export default Clock;

