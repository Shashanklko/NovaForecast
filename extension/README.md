# Weather & Time Browser Extension

A browser extension that displays weather and time on every website you visit.

## Installation

### Chrome/Edge
1. Open Chrome/Edge and navigate to `chrome://extensions/` or `edge://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `extension` folder
5. The extension icon should appear in your toolbar

### Firefox
1. Open Firefox and navigate to `about:debugging`
2. Click "This Firefox"
3. Click "Load Temporary Add-on"
4. Select the `manifest.json` file in the extension folder

## Features

- **Weather Display**: Shows current weather with temperature and icon
- **Time Display**: Shows current time that updates every second
- **Customizable Position**: Choose from 4 corner positions
- **Draggable Widget**: Hold Shift and drag to reposition anywhere
- **Temperature Units**: Toggle between Celsius and Fahrenheit
- **Auto-refresh**: Weather updates every 30 minutes

## Usage

1. Click the extension icon to open the popup
2. Configure your settings:
   - Toggle weather widget on/off
   - Toggle time display on/off
   - Choose temperature unit (Celsius/Fahrenheit)
   - Select widget position
3. The widget will appear on all websites you visit
4. Hold Shift and drag to move the widget anywhere on the page

## Permissions

- **Storage**: To save your preferences
- **Geolocation**: To get your location for weather
- **Active Tab**: To inject the widget on web pages
- **Host Permissions**: To fetch weather data from Open-Meteo API

## Notes

- The extension uses the Open-Meteo API (free, no API key required)
- Weather data is cached and updated every 30 minutes
- Your location is stored locally and never shared

