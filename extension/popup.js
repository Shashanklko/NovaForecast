// Popup script for extension
document.addEventListener('DOMContentLoaded', async () => {
  const weatherDisplay = document.getElementById('weatherDisplay');
  const timeDisplay = document.getElementById('timeDisplay');
  const toggleWidget = document.getElementById('toggleWidget');
  const toggleTime = document.getElementById('toggleTime');
  const toggleCelsius = document.getElementById('toggleCelsius');
  const widgetPosition = document.getElementById('widgetPosition');
  const transparencySlider = document.getElementById('transparencySlider');
  const transparencyValue = document.getElementById('transparencyValue');
  const refreshWeather = document.getElementById('refreshWeather');

  // Load saved settings
  const loadSettings = async () => {
    const result = await chrome.storage.sync.get([
      'widgetEnabled',
      'timeEnabled',
      'isCelsius',
      'widgetPosition',
      'transparency',
    ]);

    toggleWidget.checked = result.widgetEnabled !== false;
    toggleTime.checked = result.timeEnabled !== false;
    toggleCelsius.checked = result.isCelsius === true;
    widgetPosition.value = result.widgetPosition || 'top-right';
    const transparency = result.transparency !== undefined ? result.transparency : 0.75;
    transparencySlider.value = transparency;
    transparencyValue.textContent = Math.round(transparency * 100) + '%';
  };

  // Save settings
  const saveSettings = async () => {
    const transparency = parseFloat(transparencySlider.value);
    await chrome.storage.sync.set({
      widgetEnabled: toggleWidget.checked,
      timeEnabled: toggleTime.checked,
      isCelsius: toggleCelsius.checked,
      widgetPosition: widgetPosition.value,
      transparency: transparency,
    });

    // Notify content script of changes
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab.id) {
      chrome.tabs.sendMessage(tab.id, {
        action: 'updateSettings',
        settings: {
          widgetEnabled: toggleWidget.checked,
          timeEnabled: toggleTime.checked,
          isCelsius: toggleCelsius.checked,
          position: widgetPosition.value,
          transparency: transparency,
        },
      });
    }
  };

  // Update time display
  const updateTime = () => {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
    const date = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    timeDisplay.innerHTML = `
      <div class="time">${time}</div>
      <div class="date">${date}</div>
    `;
  };

  // Fetch and display weather
  const fetchWeather = async () => {
    try {
      weatherDisplay.innerHTML = '<div class="loading">Loading weather...</div>';

      // Get location from storage or geolocation
      let coords = await chrome.storage.sync.get('lastLocation');
      
      if (!coords.lastLocation) {
        // Try to get current location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              };
              await chrome.storage.sync.set({ lastLocation: location });
              await loadWeatherData(location);
            },
            async () => {
              // Default to a location if geolocation fails
              const defaultLocation = { latitude: 40.7128, longitude: -74.0060 }; // NYC
              await loadWeatherData(defaultLocation);
            }
          );
        } else {
          const defaultLocation = { latitude: 40.7128, longitude: -74.0060 };
          await loadWeatherData(defaultLocation);
        }
      } else {
        await loadWeatherData(coords.lastLocation);
      }
    } catch (error) {
      console.error('Weather fetch error:', error);
      weatherDisplay.innerHTML = '<div class="loading">Error loading weather</div>';
    }
  };

  const loadWeatherData = async (coords) => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current_weather=true&timezone=auto`
      );
      const data = await response.json();

      if (data.current_weather) {
        const temp = toggleCelsius.checked
          ? `${Math.round(data.current_weather.temperature)}°C`
          : `${Math.round((data.current_weather.temperature * 9) / 5 + 32)}°F`;

        const weatherCode = data.current_weather.weathercode;
        const weatherIcons = {
          0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
          45: '🌫️', 48: '🌫️',
          51: '🌦️', 53: '🌦️', 55: '🌦️',
          61: '🌧️', 63: '🌧️', 65: '⛈️',
          71: '❄️', 73: '❄️', 75: '🌨️',
          80: '🌦️', 81: '🌧️', 82: '⛈️',
          95: '⛈️', 96: '⛈️', 99: '⛈️',
        };

        const icon = weatherIcons[weatherCode] || '🌤️';

        weatherDisplay.innerHTML = `
          <div style="font-size: 48px; margin-bottom: 10px;">${icon}</div>
          <div class="weather-temp">${temp}</div>
          <div class="weather-condition">Weather Code: ${weatherCode}</div>
        `;
      }
    } catch (error) {
      console.error('Weather load error:', error);
      weatherDisplay.innerHTML = '<div class="loading">Error loading weather</div>';
    }
  };

  // Update transparency display
  transparencySlider.addEventListener('input', (e) => {
    const value = Math.round(parseFloat(e.target.value) * 100);
    transparencyValue.textContent = value + '%';
    saveSettings();
  });

  // Event listeners
  toggleWidget.addEventListener('change', saveSettings);
  toggleTime.addEventListener('change', saveSettings);
  toggleCelsius.addEventListener('change', saveSettings);
  widgetPosition.addEventListener('change', saveSettings);
  refreshWeather.addEventListener('click', fetchWeather);

  // Initialize
  await loadSettings();
  updateTime();
  setInterval(updateTime, 1000);
  await fetchWeather();
});

