// Content script to inject weather widget on web pages
let widgetContainer = null;
let weatherWidget = null;
let timeWidget = null;
let settings = {
  widgetEnabled: true,
  timeEnabled: true,
  isCelsius: false,
  position: 'top-right',
  transparency: 0.75,
};

// Load settings from storage
chrome.storage.sync.get(['widgetEnabled', 'timeEnabled', 'isCelsius', 'widgetPosition', 'transparency', 'weatherPosition', 'timePosition'], (result) => {
  settings.widgetEnabled = result.widgetEnabled !== false;
  settings.timeEnabled = result.timeEnabled !== false;
  settings.isCelsius = result.isCelsius === true;
  settings.position = result.widgetPosition || 'top-right';
  settings.transparency = result.transparency !== undefined ? result.transparency : 0.75;
  
  if (settings.widgetEnabled || settings.timeEnabled) {
    initWidget();
  }
});

// Listen for settings updates
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateSettings') {
    settings = { ...settings, ...message.settings };
    updateWidget();
    sendResponse({ success: true });
  }
  return true; // Keep channel open for async response
});

// Initialize widget
function initWidget() {
  // Create widget container (just for positioning reference, widgets are separate)
  if (!widgetContainer) {
    widgetContainer = document.createElement('div');
    widgetContainer.id = 'weather-time-widget';
    widgetContainer.className = `widget-position-${settings.position}`;
    document.body.appendChild(widgetContainer);
  }

  // Create weather widget (separate, independently draggable)
  if (settings.widgetEnabled && !weatherWidget) {
    createWeatherWidget();
  }

  // Create time widget (separate, independently draggable)
  if (settings.timeEnabled && !timeWidget) {
    createTimeWidget();
  }
}

// Create weather widget
async function createWeatherWidget() {
  if (weatherWidget) return;
  
  // Ensure widgetContainer exists for reference
  if (!widgetContainer) {
    widgetContainer = document.createElement('div');
    widgetContainer.id = 'weather-time-widget';
    document.body.appendChild(widgetContainer);
  }

  weatherWidget = document.createElement('div');
  weatherWidget.id = 'weather-widget';
  weatherWidget.className = 'widget-item';
  
  // Load saved position
  const savedPos = await chrome.storage.sync.get('weatherPosition');
  if (savedPos.weatherPosition) {
    weatherWidget.style.left = savedPos.weatherPosition.left + 'px';
    weatherWidget.style.top = savedPos.weatherPosition.top + 'px';
    weatherWidget.style.right = 'auto';
    weatherWidget.style.bottom = 'auto';
  } else {
    // Default position
    weatherWidget.style.top = '20px';
    weatherWidget.style.right = '20px';
  }
  
  updateWidgetTransparency(weatherWidget);

  try {
    // Get location from storage
    const result = await chrome.storage.sync.get('lastLocation');
    let coords = result.lastLocation;

    if (!coords) {
      // Default location
      coords = { latitude: 40.7128, longitude: -74.0060 };
    }

    // Fetch weather
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current_weather=true&timezone=auto`
    );
    const data = await response.json();

    if (data.current_weather) {
      const temp = settings.isCelsius
        ? `${Math.round(data.current_weather.temperature)}°C`
        : `${Math.round((data.current_weather.temperature * 9) / 5 + 32)}°F`;

      const weatherCode = data.current_weather.weathercode;
      const weatherIcons = {
        0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
        45: '🌫️', 48: '🌫️',
        51: '🌦️', 53: '🌦️', 55: '🌦️',
        56: '🌨️', 57: '🌨️',
        61: '🌧️', 63: '🌧️', 65: '⛈️',
        66: '🌨️', 67: '🌨️',
        71: '❄️', 73: '❄️', 75: '🌨️',
        77: '❄️',
        80: '🌦️', 81: '🌧️', 82: '⛈️',
        85: '❄️', 86: '🌨️',
        95: '⛈️', 96: '⛈️', 99: '⛈️',
      };

      // Smart fallback for unknown codes
      let icon = weatherIcons[weatherCode];
      if (!icon) {
        if (weatherCode >= 0 && weatherCode <= 3) icon = '☁️';
        else if (weatherCode >= 45 && weatherCode <= 48) icon = '🌫️';
        else if (weatherCode >= 51 && weatherCode <= 67) icon = '🌧️';
        else if (weatherCode >= 71 && weatherCode <= 77) icon = '❄️';
        else if (weatherCode >= 80 && weatherCode <= 86) icon = '🌦️';
        else if (weatherCode >= 95 && weatherCode <= 99) icon = '⛈️';
        else icon = '🌤️';
      }

      weatherWidget.innerHTML = `
        <div class="weather-icon">${icon}</div>
        <div class="weather-temp">${temp}</div>
      `;
    }
  } catch (error) {
    console.error('Weather fetch error:', error);
    weatherWidget.innerHTML = '<div class="weather-error">🌤️</div>';
  }

  document.body.appendChild(weatherWidget);
  makeDraggable(weatherWidget, 'weatherPosition');
}

// Create time widget
async function createTimeWidget() {
  if (timeWidget) return;
  
  // Ensure widgetContainer exists for reference
  if (!widgetContainer) {
    widgetContainer = document.createElement('div');
    widgetContainer.id = 'weather-time-widget';
    document.body.appendChild(widgetContainer);
  }

  timeWidget = document.createElement('div');
  timeWidget.id = 'time-widget';
  timeWidget.className = 'widget-item';
  
  // Load saved position
  const savedPos = await chrome.storage.sync.get('timePosition');
  if (savedPos.timePosition) {
    timeWidget.style.left = savedPos.timePosition.left + 'px';
    timeWidget.style.top = savedPos.timePosition.top + 'px';
    timeWidget.style.right = 'auto';
    timeWidget.style.bottom = 'auto';
  } else {
    // Default position (below weather widget)
    timeWidget.style.top = '90px';
    timeWidget.style.right = '20px';
  }
  
  updateWidgetTransparency(timeWidget);

  const updateTime = () => {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
    timeWidget.innerHTML = `<div class="time-display">${time}</div>`;
  };

  updateTime();
  setInterval(updateTime, 1000);

  document.body.appendChild(timeWidget);
  makeDraggable(timeWidget, 'timePosition');
}

// Update widget transparency
function updateWidgetTransparency(widget) {
  if (!widget) return;
  const alpha = settings.transparency || 0.75;
  widget.style.background = `rgba(20, 30, 25, ${alpha})`;
}

// Update widget based on settings
function updateWidget() {
  // Update weather widget
  if (settings.widgetEnabled && !weatherWidget) {
    createWeatherWidget();
  } else if (!settings.widgetEnabled && weatherWidget) {
    weatherWidget.remove();
    weatherWidget = null;
  } else if (weatherWidget) {
    updateWidgetTransparency(weatherWidget);
  }

  // Update time widget
  if (settings.timeEnabled && !timeWidget) {
    createTimeWidget();
  } else if (!settings.timeEnabled && timeWidget) {
    timeWidget.remove();
    timeWidget = null;
  } else if (timeWidget) {
    updateWidgetTransparency(timeWidget);
  }

  // Remove container if both disabled
  if (!settings.widgetEnabled && !settings.timeEnabled && widgetContainer) {
    widgetContainer.remove();
    widgetContainer = null;
  }
}

// Make widget draggable (separately for each widget)
function makeDraggable(element, positionKey) {
  let isDragging = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;

  element.addEventListener('mousedown', (e) => {
    isDragging = true;
    element.classList.add('dragging');
    initialX = e.clientX - element.offsetLeft;
    initialY = e.clientY - element.offsetTop;
    element.style.cursor = 'grabbing';
    e.stopPropagation();
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      e.preventDefault();
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
      
      // Keep widget within viewport bounds
      const maxX = window.innerWidth - element.offsetWidth;
      const maxY = window.innerHeight - element.offsetHeight;
      currentX = Math.max(0, Math.min(currentX, maxX));
      currentY = Math.max(0, Math.min(currentY, maxY));
      
      element.style.left = currentX + 'px';
      element.style.top = currentY + 'px';
      element.style.right = 'auto';
      element.style.bottom = 'auto';
    }
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      element.classList.remove('dragging');
      element.style.cursor = 'grab';
      
      // Save position
      if (positionKey) {
        chrome.storage.sync.set({
          [positionKey]: {
            left: parseInt(element.style.left),
            top: parseInt(element.style.top)
          }
        });
      }
    }
  });
}

