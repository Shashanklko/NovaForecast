// Background service worker for extension
chrome.runtime.onInstalled.addListener(() => {
  console.log('Weather & Time Widget extension installed');
  
  // Set default settings
  chrome.storage.sync.set({
    widgetEnabled: true,
    timeEnabled: true,
    isCelsius: false,
    widgetPosition: 'top-right',
  });
});

// Listen for extension icon click
chrome.action.onClicked.addListener((tab) => {
  // This is handled by the popup, but we can add additional logic here if needed
});

// Periodic weather update (every 30 minutes)
setInterval(async () => {
  // Update weather data in storage
  try {
    const result = await chrome.storage.sync.get('lastLocation');
    if (result.lastLocation) {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${result.lastLocation.latitude}&longitude=${result.lastLocation.longitude}&current_weather=true&timezone=auto`
      );
      const data = await response.json();
      await chrome.storage.sync.set({ lastWeatherData: data });
      
      // Notify all tabs to update
      chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
          chrome.tabs.sendMessage(tab.id, { action: 'refreshWeather' }).catch(() => {
            // Ignore errors for tabs that don't have content script
          });
        });
      });
    }
  } catch (error) {
    console.error('Background weather update error:', error);
  }
}, 30 * 60 * 1000); // 30 minutes

