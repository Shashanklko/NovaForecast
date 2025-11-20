# 🌤️ Nova Forecast - Modern Weather App & Browser Extension

A beautiful, modern React weather application with a browser extension that displays weather and time on every website you visit. Built with React 19, Vite, and the free Open-Meteo API.

![Weather Forecast App](https://img.shields.io/badge/React-19.1.0-blue) ![Vite](https://img.shields.io/badge/Vite-6.3.5-purple) ![License](https://img.shields.io/badge/License-MIT-green)

---

## 📋 Table of Contents

- [Features](#-features)

- [Getting Started](#-getting-started)
  - [Web Application](#web-application)
  - [Browser Extension](#browser-extension)
- [Installation Guide](#-installation-guide)
  - [Chrome Installation](#chrome-installation)
  - [Microsoft Edge Installation](#microsoft-edge-installation)
  - [Firefox Installation](#firefox-installation)
  - [Brave Installation](#brave-installation)
- [Project Structure](#-project-structure)
- [Usage](#-usage)
- [Tech Stack](#-tech-stack)
- [API Information](#-api-information)
- [Development](#-development)
- [Features Roadmap](#-features-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🌐 Web Application

- 🎨 **Modern UI Design**
  - Glassmorphism effects with backdrop blur
  - Smooth animations and transitions
  - Dynamic gradient backgrounds based on weather conditions
  - Fully responsive design for all devices

- 📍 **Location Features**
  - Auto-detect location using browser geolocation
  - City search with autocomplete suggestions
  - Location-based timezone support
  - Clickable header to reload weather data

- ⏰ **Time Features**
  - Location-based time display (shows time for searched location)
  - 12-hour and 24-hour format toggle
  - Time of day indicators (Morning, Noon, Afternoon, Evening, Night, Midnight)
  - Automatic timezone detection

- 🌡️ **Weather Information**
  - Current weather conditions with icons
  - 7-day weather forecast with interactive cards
  - 24-hour hourly forecast with scrollable timeline
  - Weather details (humidity, wind speed, UV index, precipitation)
  - High/low temperature display
  - Temperature toggle (Celsius/Fahrenheit)

- 💾 **User Preferences**
  - Save favorite locations
  - Persistent settings (temperature unit, time format)
  - Local storage for privacy

### 🔌 Browser Extension

- 🌐 **Universal Widget**
  - Weather widget appears on every website
  - Live time display that updates every second
  - Non-intrusive design

- 🎯 **Customization**
  - Customizable position (4 corner positions)
  - Draggable widget (hold Shift + drag to reposition)
  - Temperature unit toggle (Celsius/Fahrenheit)
  - Show/hide weather and time widgets independently

- ⚙️ **Settings & Features**
  - Easy-to-use settings panel
  - Auto-refresh weather every 30 minutes
  - Persistent settings across browser sessions
  - Transparent widget design

---

## 🚀 Getting Started

### Web Application

#### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

#### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Weather-Forecast.git
   cd Weather-Forecast
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

### Browser Extension

The extension can be installed directly from the website or manually. See detailed installation instructions below for each browser.

---

## 📦 Installation Guide

### Chrome Installation

#### Method 1: Install from Website (Recommended)

1. Visit the weather app website
2. Click the **"Install Extension"** button in the header
3. Click **"Download Extension from GitHub"** button
4. Extract the downloaded ZIP file
5. Follow the steps below starting from step 2

#### Method 2: Manual Installation

1. **Download the Extension**
   - Download the repository as ZIP from GitHub
   - Extract the ZIP file
   - Navigate to the `extension` folder

2. **Open Chrome Extensions Page**
   - Open Chrome browser
   - Navigate to `chrome://extensions/`
   - Or go to: Menu (⋮) → Extensions → Manage Extensions

3. **Enable Developer Mode**
   - Toggle the **"Developer mode"** switch in the top-right corner

4. **Load the Extension**
   - Click the **"Load unpacked"** button
   - Select the `extension` folder from the extracted files
   - Click **"Select Folder"**

5. **Verify Installation**
   - The extension should appear in your extensions list
   - The extension icon will appear in your Chrome toolbar
   - Click the icon to configure settings

6. **Configure the Extension**
   - Click the extension icon in the toolbar
   - Toggle weather/time display on/off
   - Choose widget position
   - Select temperature unit (Celsius/Fahrenheit)
   - The widget will now appear on all websites!

---

### Microsoft Edge Installation

#### Method 1: Install from Website (Recommended)

1. Visit the weather app website
2. Click the **"Install Extension"** button in the header
3. Click **"Download Extension from GitHub"** button
4. Extract the downloaded ZIP file
5. Follow the steps below starting from step 2

#### Method 2: Manual Installation

1. **Download the Extension**
   - Download the repository as ZIP from GitHub
   - Extract the ZIP file
   - Navigate to the `extension` folder

2. **Open Edge Extensions Page**
   - Open Microsoft Edge browser
   - Navigate to `edge://extensions/`
   - Or go to: Menu (⋯) → Extensions

3. **Enable Developer Mode**
   - Toggle the **"Developer mode"** switch in the bottom-left corner

4. **Load the Extension**
   - Click the **"Load unpacked"** button
   - Select the `extension` folder from the extracted files
   - Click **"Select Folder"**

5. **Verify Installation**
   - The extension should appear in your extensions list
   - The extension icon will appear in your Edge toolbar
   - Click the icon to configure settings

6. **Configure the Extension**
   - Click the extension icon in the toolbar
   - Toggle weather/time display on/off
   - Choose widget position
   - Select temperature unit
   - The widget will now appear on all websites!

---

### Firefox Installation

#### Method 1: Install from Website (Recommended)

1. Visit the weather app website
2. Click the **"Install Extension"** button in the header
3. Click **"Download Extension from GitHub"** button
4. Extract the downloaded ZIP file
5. Follow the steps below starting from step 2

#### Method 2: Manual Installation

1. **Download the Extension**
   - Download the repository as ZIP from GitHub
   - Extract the ZIP file
   - Navigate to the `extension` folder

2. **Open Firefox Debugging Page**
   - Open Firefox browser
   - Navigate to `about:debugging`
   - Or type `about:debugging` in the address bar

3. **Select This Firefox**
   - Click on the **"This Firefox"** tab on the left sidebar

4. **Load Temporary Add-on**
   - Click the **"Load Temporary Add-on"** button
   - Navigate to the extracted `extension` folder
   - Select the `manifest.json` file
   - Click **"Open"**

5. **Verify Installation**
   - The extension should appear in the list
   - The extension icon will appear in your Firefox toolbar
   - **Note:** Temporary add-ons are removed when Firefox restarts

6. **Configure the Extension**
   - Click the extension icon in the toolbar
   - Toggle weather/time display on/off
   - Choose widget position
   - Select temperature unit
   - The widget will now appear on all websites!

**Important:** Firefox temporary add-ons are removed on browser restart. For permanent installation, you would need to publish the extension to Firefox Add-ons (AMO).

---

### Brave Installation

#### Method 1: Install from Website (Recommended)

1. Visit the weather app website
2. Click the **"Install Extension"** button in the header
3. Click **"Download Extension from GitHub"** button
4. Extract the downloaded ZIP file
5. Follow the steps below starting from step 2

#### Method 2: Manual Installation

1. **Download the Extension**
   - Download the repository as ZIP from GitHub
   - Extract the ZIP file
   - Navigate to the `extension` folder

2. **Open Brave Extensions Page**
   - Open Brave browser
   - Navigate to `brave://extensions/`
   - Or go to: Menu → Extensions

3. **Enable Developer Mode**
   - Toggle the **"Developer mode"** switch in the top-right corner

4. **Load the Extension**
   - Click the **"Load unpacked"** button
   - Select the `extension` folder from the extracted files
   - Click **"Select Folder"**

5. **Verify Installation**
   - The extension should appear in your extensions list
   - The extension icon will appear in your Brave toolbar
   - Click the icon to configure settings

6. **Configure the Extension**
   - Click the extension icon in the toolbar
   - Toggle weather/time display on/off
   - Choose widget position
   - Select temperature unit
   - The widget will now appear on all websites!

---

## 📁 Project Structure

```
Weather-Forecast/
├── src/                          # Source code for web application
│   ├── api/
│   │   └── weatherService.js     # Weather API service (Open-Meteo)
│   ├── components/               # React components
│   │   ├── Background/           # Dynamic background component
│   │   ├── Clock/                # Clock component with timezone support
│   │   ├── ExtensionInstall/     # Extension installation modal
│   │   ├── HourlyForecast/       # 24-hour forecast component
│   │   ├── LoadingSkeleton/      # Loading state component
│   │   ├── SearchBar/            # City search with autocomplete
│   │   ├── ToggleSwitch/         # Toggle switch component
│   │   ├── WeatherCard/          # Weather card for daily forecast
│   │   ├── WeatherDetails/       # Weather details panel
│   │   └── WeatherSummary/       # Current weather summary
│   ├── contexts/
│   │   └── TimeContext.jsx       # Time context for location-based time
│   ├── hooks/
│   │   ├── useGeolocation.js     # Geolocation hook
│   │   ├── useLocationTime.js    # Location-based time hook
│   │   └── useWeather.js         # Weather data hook
│   ├── pages/
│   │   ├── WeatherPage.jsx       # Main weather page
│   │   └── WeatherPage.css       # Page styles
│   ├── styles/
│   │   ├── variables.css         # CSS variables (colors, spacing, etc.)
│   │   └── animations.css        # Animation keyframes
│   ├── utils/
│   │   ├── timeUtils.js          # Time utility functions
│   │   └── weatherUtils.js       # Weather utility functions
│   ├── App.jsx                    # Root component
│   └── main.jsx                   # Entry point
│
├── extension/                     # Browser extension
│   ├── manifest.json              # Extension manifest (Manifest V3)
│   ├── background.js              # Background service worker
│   ├── content.js                 # Content script (injected on pages)
│   ├── content.css                # Content script styles
│   ├── popup.html                 # Extension popup HTML
│   ├── popup.js                   # Extension popup logic
│   ├── popup.css                  # Extension popup styles
│   ├── create-icons.html          # Icon generator tool
│   ├── icons/                     # Extension icons
│   │   ├── icon16.png
│   │   ├── icon48.png
│   │   └── icon128.png
│   ├── INSTALL.md                 # Detailed installation guide
│   └── README.md                  # Extension documentation
│
├── public/                         # Static assets
│   ├── favicon.png
│   └── vite.svg
│
├── package.json                   # Project dependencies
├── vite.config.js                 # Vite configuration
├── index.html                     # HTML entry point
└── README.md                      # This file
```

---

## 🎯 Usage

### Web Application

1. **Initial Setup**
   - Allow location access when prompted for automatic weather detection
   - Or use the search bar to find weather for any city

2. **Viewing Weather**
   - Current weather is displayed in the center section
   - Scroll through the 24-hour forecast to see upcoming conditions
   - Click on daily weather cards to see details

3. **Customization**
   - Toggle temperature units (Celsius/Fahrenheit) using the switch
   - Toggle time format (12-hour/24-hour) using the time format switch
   - Click the header ("Nova Forecast") to reload weather data

4. **Time Features**
   - Time automatically adjusts to the searched location's timezone
   - Time of day indicators show Morning, Noon, Afternoon, Evening, Night, or Midnight
   - Date updates based on the location's timezone

### Browser Extension

1. **Accessing Settings**
   - Click the extension icon in your browser toolbar
   - The popup will open with all settings

2. **Configuring Widgets**
   - Toggle "Show Widget on Pages" to enable/disable weather widget
   - Toggle "Show Time on Pages" to enable/disable time display
   - Select temperature unit (Celsius/Fahrenheit)
   - Choose widget position (Top-Right, Top-Left, Bottom-Right, Bottom-Left)

3. **Repositioning Widget**
   - Hold the **Shift** key
   - Click and drag the widget to any position on the page
   - Position is saved automatically

4. **Widget Features**
   - Weather updates automatically every 30 minutes
   - Time updates every second
   - Settings persist across browser sessions

---

## 🔧 Tech Stack

### Web Application

- **React 19.1.0** - Modern UI framework
- **Vite 6.3.5** - Fast build tool and dev server
- **Axios 1.10.0** - HTTP client for API requests
- **CSS3** - Custom styling with CSS variables and animations
- **Open-Meteo API** - Free weather API (no key required)

### Browser Extension

- **Manifest V3** - Latest Chrome extension standard
- **Chrome Extension API** - Storage, tabs, messaging
- **Content Scripts** - Inject widgets on web pages
- **Service Worker** - Background tasks and auto-refresh
- **Vanilla JavaScript** - No framework dependencies

---

## 📡 API Information

The application uses the **Open-Meteo API**, a free and open-source weather API that requires no API key.

### Endpoints Used

- **Weather Forecast API**: `https://api.open-meteo.com/v1/forecast`
  - Provides current weather, hourly, and daily forecasts
  - Supports automatic timezone detection

- **Geocoding API**: `https://geocoding-api.open-meteo.com/v1/search`
  - Provides city search and location coordinates
  - Returns location suggestions with autocomplete

### Features

- ✅ **No API Key Required** - Completely free to use
- ✅ **No Rate Limits** - Generous usage limits
- ✅ **High Accuracy** - Uses multiple weather models
- ✅ **Global Coverage** - Weather data for worldwide locations
- ✅ **Timezone Support** - Automatic timezone detection

For more information, visit: [Open-Meteo Documentation](https://open-meteo.com/en/docs)

---

## 🛠️ Development

### Prerequisites

- Node.js 16+ and npm
- Modern web browser
- Code editor (VS Code recommended)

### Development Workflow

1. **Clone and Install**
   ```bash
   git clone https://github.com/yourusername/Weather-Forecast.git
   cd Weather-Forecast
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

5. **Lint Code**
   ```bash
   npm run lint
   ```

### Component Development

Each component follows this structure:
```
ComponentName/
├── ComponentName.jsx    # Component logic
└── ComponentName.css    # Component styles
```

### Adding New Features

1. Create component in `src/components/`
2. Add corresponding CSS file
3. Import and use in `WeatherPage.jsx`
4. Update styles using CSS variables from `variables.css`
5. Test across different browsers and devices

### Code Style

- Use functional components with hooks
- Follow React best practices
- Use CSS variables for theming
- Keep components modular and reusable
- Add comments for complex logic

---

## 🎉 Features Roadmap

### Planned Features

- [ ] Weather alerts and notifications
- [ ] Interactive temperature charts
- [ ] Multiple location support
- [ ] Weather history and trends
- [ ] Custom themes and color schemes
- [ ] Widget customization (colors, size, opacity)
- [ ] Weather maps integration
- [ ] Air quality index
- [ ] Sunrise/sunset times
- [ ] Weather widgets for home screen
- [ ] PWA support for mobile
- [ ] Dark/light mode toggle
- [ ] Weather comparison between locations
- [ ] Export weather data

### Known Issues

- Firefox extension requires reload after browser restart (temporary add-on limitation)
- Some older browsers may not support all CSS features

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Add comments for complex logic
- Update documentation as needed
- Test your changes thoroughly
- Ensure responsive design works on all devices

---

## 📝 Notes

- **Privacy**: All location data is stored locally and never shared
- **API**: Uses free Open-Meteo API - no account or API key needed
- **Performance**: Optimized for fast loading and smooth animations
- **Compatibility**: Works on all modern browsers (Chrome, Edge, Firefox, Brave, Safari)
- **Responsive**: Fully responsive design for desktop, tablet, and mobile
- **Accessibility**: Follows web accessibility best practices

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

**MIT License** - feel free to use, modify, and distribute!

---

## 🙏 Acknowledgments

- [Open-Meteo](https://open-meteo.com/) for providing free weather API
- React team for the amazing framework
- Vite team for the fast build tool
- All contributors and users of this project

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/Weather-Forecast/issues) page
2. Review the installation guides above
3. Check browser console for errors (F12)
4. Ensure you have the latest version of your browser

---

**Made with ❤️ using React and modern web technologies**

---

*Last updated: 2025*
