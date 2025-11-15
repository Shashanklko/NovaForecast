# Browser Extension Installation Guide

## Quick Start

1. **Generate Icons** (Optional but recommended)
   - Open `create-icons.html` in your browser
   - Click "Generate Icons"
   - Click "Download All Icons"
   - Save the downloaded PNG files to `extension/icons/` folder

2. **Load Extension**

### Chrome / Edge / Brave
1. Open your browser
2. Navigate to:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
   - Brave: `brave://extensions/`
3. Enable **Developer mode** (toggle in top-right corner)
4. Click **"Load unpacked"** button
5. Select the `extension` folder from this project
6. The extension should now appear in your extensions list!

### Firefox
1. Open Firefox
2. Navigate to `about:debugging`
3. Click **"This Firefox"** tab
4. Click **"Load Temporary Add-on"** button
5. Navigate to and select `extension/manifest.json`
6. The extension will load (note: temporary add-ons are removed on browser restart)

## Using the Extension

1. **Click the extension icon** in your browser toolbar
2. **Configure settings**:
   - Toggle weather widget on/off
   - Toggle time display on/off
   - Choose Celsius or Fahrenheit
   - Select widget position (top-right, top-left, bottom-right, bottom-left)
3. **The widget appears** on all websites you visit
4. **Reposition the widget**: Hold **Shift** key and drag the widget anywhere on the page

## Troubleshooting

### Icons not showing
- Make sure you've generated and saved the icon files to `extension/icons/`
- The extension will work without icons, but Chrome will show a default icon

### Widget not appearing
- Check that "Show Widget on Pages" is enabled in the popup
- Refresh the webpage
- Check browser console for errors (F12)

### Location not working
- Make sure you've allowed location access
- The extension will use a default location (New York) if geolocation fails

### Settings not saving
- Check that you have storage permissions enabled
- Try reloading the extension

## Permissions Explained

- **Storage**: Saves your preferences (location, settings)
- **Geolocation**: Gets your location for weather (optional)
- **Active Tab**: Allows the extension to inject the widget on web pages
- **Host Permissions**: Needed to fetch weather data from Open-Meteo API

All permissions are used locally - no data is sent to external servers except the weather API.

## Updating the Extension

1. Make your changes to the extension files
2. Go to `chrome://extensions/` (or your browser's extension page)
3. Click the **refresh icon** on the extension card
4. The extension will reload with your changes

## Uninstalling

1. Go to your browser's extension page
2. Find "Weather & Time Widget"
3. Click **Remove** or **Uninstall**

---

**Note**: The extension uses the free Open-Meteo API which doesn't require an API key. Weather data is fetched directly from their servers.

