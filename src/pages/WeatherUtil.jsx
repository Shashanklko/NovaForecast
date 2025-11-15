import React from 'react';

const wmoweatherCode = new Map([
  [0, "Clear sky"],
  [1, "Mainly clear"],
  [2, "Partly cloudy"],
  [3, "Overcast"],
  [45, "Fog"],
  [48, "Depositing rime fog"],
  [51, "Drizzle: Light intensity"],
  [53, "Drizzle: Moderate intensity"],
  [55, "Drizzle: Dense intensity"],
  [56, "Freezing Drizzle: Light intensity"],
  [57, "Freezing Drizzle: Dense intensity"],
  [61, "Rain: Slight intensity"],
  [63, "Rain: Moderate intensity"],
  [65, "Rain: Heavy intensity"],
  [66, "Freezing Rain: Light intensity"],
  [67, "Freezing Rain: Heavy intensity"],
  [71, "Snow fall: Slight intensity"],
  [73, "Snow fall: Moderate intensity"],
  [75, "Snow fall: Heavy intensity"],
  [77, "Snow grains"],
  [80, "Rain showers: Slight intensity"],
  [81, "Rain showers: Moderate intensity"],
  [82, "Rain showers: Violent intensity"],
  [85, "Snow showers: Slight intensity"],
  [86, "Snow showers: Heavy intensity"],
  [95, "Thunderstorm: Slight or moderate"],
  [96, "Thunderstorm with slight hail"],
  [99, "Thunderstorm with heavy hail"]
]);

const ConvertToFahrenheit = (celsiusTemp) => {
  if (celsiusTemp === null || celsiusTemp === undefined) return null;
  return Math.round((celsiusTemp * 9) / 5 + 32);
};

const ConvertToCelsius = (fahrenheitTemp) => {
  if (fahrenheitTemp === null || fahrenheitTemp === undefined) return null;
  return Math.round(((fahrenheitTemp - 32) * 5) / 9);
};

const ConvertToKelvin = (celsiusTemp) => {
  if (celsiusTemp === null || celsiusTemp === undefined) return null;
  return Math.round(celsiusTemp + 273.15);
};

const ConvertToStateVariable = (tempWeekWeather) => {
  let fetchedWeatherInfo = [];
  for (let i = 0; i < tempWeekWeather.daily.time.length; i++) {
    fetchedWeatherInfo.push({
      date: new Date(tempWeekWeather.daily.time[i]),
      min: tempWeekWeather.daily.temperature_2m_min[i],
      max: tempWeekWeather.daily.temperature_2m_max[i],
      code: tempWeekWeather.daily.weathercode[i],
    });
  }
  return fetchedWeatherInfo;
};

const ConvertToCurrentWeather = (tempWeekWeather) => {
  let currentWeather = tempWeekWeather.current_weather;
  currentWeather.time = new Date(currentWeather.time);
  currentWeather.isDay = currentWeather.is_day === 1;
  delete currentWeather.is_day;
  currentWeather.WeatherCode = currentWeather.weathercode;
  delete currentWeather.weathercode;
  return currentWeather;
};

const getWeatherCode = (code) => wmoweatherCode.get(code);

export {
  ConvertToFahrenheit,
  ConvertToCelsius,
  ConvertToKelvin,
  ConvertToStateVariable,
  ConvertToCurrentWeather,
  getWeatherCode
};

export default ConvertToStateVariable;
