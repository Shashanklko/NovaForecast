import axios from 'axios';

const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";
const GEOCODING_API_URL = "https://geocoding-api.open-meteo.com/v1/search";

const convertDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Get weather data with hourly forecast
export const getWeatherData = async ({ latitude, longitude }) => {
  const currentDate = new Date();
  const startDate = new Date(currentDate);
  startDate.setDate(currentDate.getDate() + 1);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 7);

  try {
    const { data: weatherInfo } = await axios.get(WEATHER_API_URL, {
      params: {
        latitude,
        longitude,
        timezone: "auto",
        current_weather: true,
        hourly: "temperature_2m,weathercode,relativehumidity_2m,windspeed_10m,uv_index",
        daily: "temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode,sunrise,sunset,uv_index_max,windspeed_10m_max",
        start_date: convertDate(startDate),
        end_date: convertDate(endDate),
      },
    });

    return weatherInfo;
  } catch (error) {
    console.error("Weather API Error:", error);
    throw error;
  }
};

// Get current weather only (for extension)
export const getCurrentWeather = async ({ latitude, longitude }) => {
  try {
    const { data: weatherInfo } = await axios.get(WEATHER_API_URL, {
      params: {
        latitude,
        longitude,
        timezone: "auto",
        current_weather: true,
        hourly: "temperature_2m,weathercode",
      },
    });

    return weatherInfo;
  } catch (error) {
    console.error("Current Weather API Error:", error);
    throw error;
  }
};

// Search cities
export const searchCities = async (query) => {
  try {
    const { data } = await axios.get(GEOCODING_API_URL, {
      params: {
        name: query,
        count: 10,
        language: "en",
        format: "json",
      },
    });

    return data.results || [];
  } catch (error) {
    console.error("City Search Error:", error);
    return [];
  }
};

// Get coordinates by city name
export const getCoordinatesByCity = async (city) => {
  try {
    const cities = await searchCities(city);
    if (cities.length > 0) {
      return {
        latitude: cities[0].latitude,
        longitude: cities[0].longitude,
        name: cities[0].name,
        country: cities[0].country,
      };
    }
    throw new Error("City not found");
  } catch (error) {
    throw error;
  }
};

// Reverse geocode - get location name from coordinates
export const getLocationName = async (latitude, longitude) => {
  try {
    // Use BigDataCloud API for reverse geocoding (free, no API key required)
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );
    
    if (!response.ok) {
      throw new Error('Reverse geocoding failed');
    }
    
    const data = await response.json();
    
    // Extract location information
    const name = data.locality || data.city || data.principalSubdivision || null;
    const country = data.countryName || '';
    const admin1 = data.principalSubdivision || '';
    
    if (name) {
      return {
        name,
        country,
        admin1,
      };
    }
    
    // If no locality found, use coordinates as fallback
    return {
      name: `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`,
      country: country || '',
      admin1: admin1 || '',
    };
  } catch (error) {
    console.error("Location name fetch error:", error);
    // Return coordinates as fallback
    return {
      name: `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`,
      country: '',
      admin1: '',
    };
  }
};

