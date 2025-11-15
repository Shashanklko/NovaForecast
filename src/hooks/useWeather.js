import { useState, useEffect, useCallback } from 'react';
import { getWeatherData, getCoordinatesByCity, getLocationName } from '../api/weatherService';

export const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);

  const fetchWeather = useCallback(async (coords) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeatherData(coords);
      setWeather(data);
      
      // If location name is not provided, fetch it
      if (coords.name) {
        setLocation(coords);
      } else {
        // Reverse geocode to get location name
        const locationInfo = await getLocationName(coords.latitude, coords.longitude);
        setLocation({
          ...coords,
          name: locationInfo.name,
          country: locationInfo.country,
          admin1: locationInfo.admin1,
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWeatherByCity = useCallback(async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const coords = await getCoordinatesByCity(cityName);
      await fetchWeather(coords);
    } catch (err) {
      setError(err.message || 'City not found');
      setLoading(false);
    }
  }, [fetchWeather]);

  const fetchWeatherByCoords = useCallback(async (latitude, longitude) => {
    await fetchWeather({ latitude, longitude });
  }, [fetchWeather]);

  return {
    weather,
    loading,
    error,
    location,
    fetchWeather,
    fetchWeatherByCity,
    fetchWeatherByCoords,
    refetch: () => location && fetchWeather(location),
  };
};

