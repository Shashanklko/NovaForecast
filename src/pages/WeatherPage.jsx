import React, { useState, useEffect, useMemo } from 'react';
import { useWeather } from '../hooks/useWeather';
import { useGeolocation } from '../hooks/useGeolocation';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/weatherUtils';
import { TimeProvider } from '../contexts/TimeContext';

// Components (add .jsx explicitly)
import WeatherSummary from '../Components/WeatherSummary/WeatherSummary.jsx';
import WeatherCard from '../Components/WeatherCard/WeatherCard.jsx';
import HourlyForecast from '../Components/HourlyForecast/HourlyForecast.jsx';
import SearchBar from '../Components/SearchBar/SearchBar.jsx';
import WeatherDetails from '../Components/WeatherDetails/WeatherDetails.jsx';
import LoadingSkeleton from '../Components/LoadingSkeleton/LoadingSkeleton.jsx';
import Clock from '../Components/Clock/Clock.jsx';
import ToggleSwitch from '../Components/ToggleSwitch/ToggleSwitch.jsx';
import Background from '../Components/Background/Background.jsx';
import ExtensionInstall from '../Components/ExtensionInstall/ExtensionInstall.jsx';

import './WeatherPage.css';

const WeatherPage = () => {
  const { coords: geoCoords } = useGeolocation();
  const { weather, loading, error, location, fetchWeatherByCity, fetchWeatherByCoords, refetch } = useWeather();
  const [isCelsius, setIsCelsius] = useState(getFromLocalStorage('isCelsius', true));
  const [is12Hour, setIs12Hour] = useState(getFromLocalStorage('is12Hour', true));
  const [selectedDay, setSelectedDay] = useState(0);
  const [favorites, setFavorites] = useState(getFromLocalStorage('favorites', []));

  useEffect(() => {
    if (geoCoords) {
      fetchWeatherByCoords(geoCoords.latitude, geoCoords.longitude);
    }
  }, [geoCoords, fetchWeatherByCoords]);

  useEffect(() => {
    saveToLocalStorage('isCelsius', isCelsius);
  }, [isCelsius]);

  useEffect(() => {
    saveToLocalStorage('is12Hour', is12Hour);
  }, [is12Hour]);

  const processedData = useMemo(() => {
    if (!weather) return null;

    const current = weather.current_weather;
    const daily = weather.daily;
    const hourly = weather.hourly;

    // Process daily data
    const weeklyWeather = daily.time.map((time, i) => ({
      date: new Date(time),
      minTemperature: daily.temperature_2m_min[i],
      maxTemperature: daily.temperature_2m_max[i],
      weatherCode: daily.weathercode[i],
      precipitation: daily.precipitation_sum?.[i],
      sunrise: daily.sunrise?.[i] ? new Date(daily.sunrise[i]) : null,
      sunset: daily.sunset?.[i] ? new Date(daily.sunset[i]) : null,
    }));

    // Process hourly data (next 24 hours)
    // Get current hour in location timezone
    let currentHour = 0;
    if (weather?.timezone) {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: weather.timezone,
          hour: '2-digit',
          hour12: false,
        });
        const parts = formatter.formatToParts(now);
        const hourPart = parts.find(part => part.type === 'hour');
        currentHour = hourPart ? parseInt(hourPart.value) : now.getHours();
      } catch (error) {
        currentHour = new Date().getHours();
      }
    } else {
      currentHour = new Date().getHours();
    }
    
    const hourlyData = [];
    if (hourly && hourly.time) {
      // Find the index closest to current hour
      let startIndex = 0;
      for (let i = 0; i < hourly.time.length; i++) {
        const hourTime = new Date(hourly.time[i]);
        let hourInTz = hourTime.getHours();
        if (weather?.timezone) {
          try {
            const formatter = new Intl.DateTimeFormat('en-US', {
              timeZone: weather.timezone,
              hour: '2-digit',
              hour12: false,
            });
            const parts = formatter.formatToParts(hourTime);
            const hourPart = parts.find(part => part.type === 'hour');
            hourInTz = hourPart ? parseInt(hourPart.value) : hourTime.getHours();
          } catch (error) {
            hourInTz = hourTime.getHours();
          }
        }
        if (hourInTz >= currentHour) {
          startIndex = i;
          break;
        }
      }
      
      // Get next 24 hours from start index
      for (let i = 0; i < 24 && (startIndex + i) < hourly.time.length; i++) {
        const hourIndex = startIndex + i;
          hourlyData.push({
            time: new Date(hourly.time[hourIndex]),
            temperature: hourly.temperature_2m[hourIndex],
            weatherCode: hourly.weathercode[hourIndex],
            humidity: hourly.relativehumidity_2m?.[hourIndex],
            windSpeed: hourly.windspeed_10m?.[hourIndex],
            uvIndex: hourly.uv_index?.[hourIndex],
          });
      }
    }

    // Current weather details
    const currentWeather = {
      temperature: current.temperature,
      WeatherCode: current.weathercode,
      isDay: current.is_day === 1,
      time: new Date(current.time),
      humidity: hourly?.relativehumidity_2m?.[currentHour],
      windSpeed: hourly?.windspeed_10m?.[currentHour],
      uvIndex: hourly?.uv_index?.[currentHour],
      precipitation: weeklyWeather[0]?.precipitation,
      // Add high/low for today (first day in weeklyWeather)
      maxTemperature: weeklyWeather[0]?.maxTemperature,
      minTemperature: weeklyWeather[0]?.minTemperature,
    };

    return {
      currentWeather,
      weeklyWeather,
      hourlyData,
      currentHour: 0, // Index of current hour in hourlyData array (first item)
      isDay: current.is_day === 1,
    };
  }, [weather]);

  const handleSearch = async (cityName) => {
    await fetchWeatherByCity(cityName);
  };

  const handleToggleFavorite = (cityName) => {
    const newFavorites = favorites.includes(cityName)
      ? favorites.filter(f => f !== cityName)
      : [...favorites, cityName];
    setFavorites(newFavorites);
    saveToLocalStorage('favorites', newFavorites);
  };

  const handleReload = () => {
    if (location) {
      // Reload weather for current location
      if (location.latitude && location.longitude) {
        fetchWeatherByCoords(location.latitude, location.longitude);
      } else if (location.name) {
        fetchWeatherByCity(location.name);
      }
    } else if (geoCoords) {
      // Reload with geolocation
      fetchWeatherByCoords(geoCoords.latitude, geoCoords.longitude);
    }
  };

  const weatherCode = processedData?.currentWeather?.WeatherCode;
  const isDay = processedData?.isDay;

  if (loading && !weather) {
    return (
      <Background weatherCode={weatherCode} isDay={isDay}>
        <div className="weather-container">
          <LoadingSkeleton type="card" count={7} />
        </div>
      </Background>
    );
  }

  if (error) {
    return (
      <Background weatherCode={weatherCode} isDay={isDay}>
        <div className="weather-container">
          <div className="error-message">
            <h2>⚠️ Error</h2>
            <p>{error}</p>
            <button onClick={() => geoCoords && fetchWeatherByCoords(geoCoords.latitude, geoCoords.longitude)}>
              Retry
            </button>
          </div>
        </div>
      </Background>
    );
  }

  if (!processedData) {
    return null;
  }

  return (
    <TimeProvider location={location} weatherData={weather}>
    <Background weatherCode={weatherCode} isDay={isDay}>
      <div className="weather-container">
        <header className="app-header">
            <div className="app-logo-container" onClick={handleReload}>
            <img src="/favicon.png" alt="Nova Forecast" className="app-logo" />
            <h1 className="app-title">Nova Forecast</h1>
          </div>
            <ExtensionInstall />
        </header>
        <SearchBar onSearch={handleSearch} />

        {/* Top Section: [CLOCK] [CURRENT WEATHER] [WEATHER DETAILS] */}
        <div className="top-section">
          <div className="top-section-item clock-section">
            <ToggleSwitch
              id="time-format-toggle"
              checked={is12Hour}
              onChange={setIs12Hour}
              leftLabel="24H"
              rightLabel="12H"
            />
            <Clock is12Hour={is12Hour} />
          </div>

          <div className="top-section-item current-weather-section">
            <ToggleSwitch
              id="temp-toggle"
              checked={isCelsius}
              onChange={setIsCelsius}
              leftLabel="°F"
              rightLabel="°C"
            />
            <WeatherSummary
              currentWeather={processedData.currentWeather}
              location={location}
              isCelsius={isCelsius}
            />
          </div>

          <div className="top-section-item weather-details-section">
            <WeatherDetails
              weather={processedData.currentWeather}
              isCelsius={isCelsius}
            />
          </div>
        </div>

        {/* Middle Section: 24-HOUR FORECAST */}
        <div className="middle-section">
          <HourlyForecast
            hourlyData={processedData.hourlyData}
            isCelsius={isCelsius}
            currentHour={processedData.currentHour}
          />
        </div>

        {/* Bottom Section: 7-DAY FORECAST */}
        <div className="bottom-section">
          <h2 className="section-title">7-DAY FORECAST</h2>
          <div className="weather-cards-container">
            {processedData.weeklyWeather.map((day, index) => (
              <WeatherCard
                key={index}
                weather={day}
                isCelsius={isCelsius}
                isSelected={selectedDay === index}
                onClick={() => setSelectedDay(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </Background>
    </TimeProvider>
  );
};



export default WeatherPage;
