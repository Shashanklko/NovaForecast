// Weather code mapping with day/night variations
const weatherCodeMap = new Map([
  [0, { description: "Clear sky", iconDay: "☀️", iconNight: "🌙", emoji: "☀️" }],
  [1, { description: "Mainly clear", iconDay: "🌤️", iconNight: "🌙", emoji: "🌤️" }],
  [2, { description: "Partly cloudy", iconDay: "⛅", iconNight: "☁️", emoji: "⛅" }],
  [3, { description: "Overcast", iconDay: "☁️", iconNight: "☁️", emoji: "☁️" }],
  [45, { description: "Fog", iconDay: "🌫️", iconNight: "🌫️", emoji: "🌫️" }],
  [48, { description: "Depositing rime fog", iconDay: "🌫️", iconNight: "🌫️", emoji: "🌫️" }],
  [51, { description: "Drizzle: Light", iconDay: "🌦️", iconNight: "🌧️", emoji: "🌦️" }],
  [53, { description: "Drizzle: Moderate", iconDay: "🌦️", iconNight: "🌧️", emoji: "🌦️" }],
  [55, { description: "Drizzle: Dense", iconDay: "🌦️", iconNight: "🌧️", emoji: "🌦️" }],
  [56, { description: "Freezing Drizzle: Light", iconDay: "🌨️", iconNight: "🌨️", emoji: "🌨️" }],
  [57, { description: "Freezing Drizzle: Dense", iconDay: "🌨️", iconNight: "🌨️", emoji: "🌨️" }],
  [61, { description: "Rain: Slight", iconDay: "🌧️", iconNight: "🌧️", emoji: "🌧️" }],
  [63, { description: "Rain: Moderate", iconDay: "🌧️", iconNight: "🌧️", emoji: "🌧️" }],
  [65, { description: "Rain: Heavy", iconDay: "⛈️", iconNight: "⛈️", emoji: "⛈️" }],
  [66, { description: "Freezing Rain: Light", iconDay: "🌨️", iconNight: "🌨️", emoji: "🌨️" }],
  [67, { description: "Freezing Rain: Heavy", iconDay: "🌨️", iconNight: "🌨️", emoji: "🌨️" }],
  [71, { description: "Snow: Slight", iconDay: "❄️", iconNight: "❄️", emoji: "❄️" }],
  [73, { description: "Snow: Moderate", iconDay: "❄️", iconNight: "❄️", emoji: "❄️" }],
  [75, { description: "Snow: Heavy", iconDay: "🌨️", iconNight: "🌨️", emoji: "🌨️" }],
  [77, { description: "Snow grains", iconDay: "❄️", iconNight: "❄️", emoji: "❄️" }],
  [80, { description: "Rain showers: Slight", iconDay: "🌦️", iconNight: "🌧️", emoji: "🌦️" }],
  [81, { description: "Rain showers: Moderate", iconDay: "🌧️", iconNight: "🌧️", emoji: "🌧️" }],
  [82, { description: "Rain showers: Violent", iconDay: "⛈️", iconNight: "⛈️", emoji: "⛈️" }],
  [85, { description: "Snow showers: Slight", iconDay: "❄️", iconNight: "❄️", emoji: "❄️" }],
  [86, { description: "Snow showers: Heavy", iconDay: "🌨️", iconNight: "🌨️", emoji: "🌨️" }],
  [95, { description: "Thunderstorm", iconDay: "⛈️", iconNight: "⛈️", emoji: "⛈️" }],
  [96, { description: "Thunderstorm with hail", iconDay: "⛈️", iconNight: "⛈️", emoji: "⛈️" }],
  [99, { description: "Thunderstorm with heavy hail", iconDay: "⛈️", iconNight: "⛈️", emoji: "⛈️" }],
]);

// export const getWeatherInfo = (code, isDay = true) => {
//   const info = weatherCodeMap.get(code);
//   if (!info) {
//     return { description: "Unknown", icon: "🌤️", emoji: "🌤️" };
//   }
  
//   return {
//     description: info.description,
//     icon: isDay ? info.iconDay : info.iconNight,
//     emoji: info.emoji,
//   };
// };

export const getWeatherInfo = (code, isDay = true) => {
  // Handle null, undefined, or invalid codes
  if (code === null || code === undefined || code === '') {
    console.warn("⚠️ Invalid weather code:", code);
    return { description: "Unknown", icon: "🌤️", emoji: "🌤️" };
  }

  const numCode = Number(code);
  
  // Check if conversion was successful
  if (isNaN(numCode)) {
    console.warn("⚠️ Weather code is not a number:", code);
    return { description: "Unknown", icon: "🌤️", emoji: "🌤️" };
  }

  const info = weatherCodeMap.get(numCode);
  
  if (!info) {
    // Smart fallback based on code ranges (WMO weather code standard)
    console.warn("⚠️ Unknown weather code:", numCode);
    let fallback = { description: "Unknown", icon: "🌤️", emoji: "🌤️" };
    
    if (numCode >= 0 && numCode <= 3) {
      // Clear to overcast
      fallback = { description: "Cloudy", icon: isDay ? "☁️" : "☁️", emoji: "☁️" };
    } else if (numCode >= 45 && numCode <= 48) {
      // Fog
      fallback = { description: "Foggy", icon: "🌫️", emoji: "🌫️" };
    } else if (numCode >= 51 && numCode <= 67) {
      // Drizzle and rain
      fallback = { description: "Rainy", icon: isDay ? "🌧️" : "🌧️", emoji: "🌧️" };
    } else if (numCode >= 71 && numCode <= 77) {
      // Snow
      fallback = { description: "Snowy", icon: "❄️", emoji: "❄️" };
    } else if (numCode >= 80 && numCode <= 86) {
      // Showers
      fallback = { description: "Showers", icon: isDay ? "🌦️" : "🌧️", emoji: "🌦️" };
    } else if (numCode >= 95 && numCode <= 99) {
      // Thunderstorm
      fallback = { description: "Thunderstorm", icon: "⛈️", emoji: "⛈️" };
    }
    
    return fallback;
  }
  
  return {
    description: info.description,
    icon: isDay ? info.iconDay : info.iconNight,
    emoji: info.emoji,
  };
};

export const getWeatherCode = (code) => {
  return getWeatherInfo(code).description;
};

export const getWeatherIcon = (code, isDay = true) => {
  return getWeatherInfo(code, isDay).icon;
};

export const getWeatherEmoji = (code) => {
  return getWeatherInfo(code).emoji;
};

// Temperature conversions
export const convertToFahrenheit = (celsius) => {
  if (celsius === null || celsius === undefined) return null;
  return Math.round((celsius * 9) / 5 + 32);
};

export const convertToCelsius = (fahrenheit) => {
  if (fahrenheit === null || fahrenheit === undefined) return null;
  return Math.round(((fahrenheit - 32) * 5) / 9);
};

export const convertToKelvin = (celsius) => {
  if (celsius === null || celsius === undefined) return null;
  return Math.round(celsius + 273.15);
};

// Format time
export const formatTime = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
};

// Format date
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

// Format full date
export const formatFullDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
};

// Get background gradient based on weather and time
export const getBackgroundGradient = (weatherCode, isDay) => {
  const weather = getWeatherInfo(weatherCode);
  const description = weather.description.toLowerCase();

  // Always dark enough for white text
  if (!isDay) {
    return 'linear-gradient(135deg, #141e30, #243b55)';
  }

  if (description.includes('clear')) {
    return 'linear-gradient(135deg, #1e3c72, #2a5298)';
  }

  if (description.includes('cloud') || description.includes('overcast')) {
    return 'linear-gradient(135deg, #3a3d40, #181719)';
  }

  if (description.includes('rain') || description.includes('drizzle')) {
    return 'linear-gradient(135deg, #1f1c2c, #2c5364)';
  }

  if (description.includes('snow')) {
    return 'linear-gradient(135deg, #4b79a1, #283e51)';
  }

  if (description.includes('thunderstorm')) {
    return 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)';
  }

  if (description.includes('fog')) {
    return 'linear-gradient(135deg, #434343, #000000)';
  }

  return 'linear-gradient(135deg, #1e3c72, #2a5298)';
};


// LocalStorage helpers
export const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getFromLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

