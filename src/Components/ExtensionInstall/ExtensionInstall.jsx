import React, { useState, useEffect } from 'react';
import './ExtensionInstall.css';

const ExtensionInstall = () => {
  const [browser, setBrowser] = useState('unknown');
  const [showInstructions, setShowInstructions] = useState(false);
  
  // GitHub repository URL - Update this with your actual GitHub repository URL
 const GITHUB_REPO_URL = 'https://github.com/Shashanklko/NovaForecast';
const GITHUB_EXTENSION_URL = 'https://github.com/Shashanklko/NovaForecast/tree/main/extension';
const GITHUB_DOWNLOAD_URL = 'https://github.com/Shashanklko/NovaForecast/archive/refs/heads/main.zip';

  useEffect(() => {
    // Detect browser
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('chrome') && !userAgent.includes('edg')) {
      setBrowser('chrome');
    } else if (userAgent.includes('edg')) {
      setBrowser('edge');
    } else if (userAgent.includes('firefox')) {
      setBrowser('firefox');
    } else if (userAgent.includes('brave')) {
      setBrowser('brave');
    } else {
      setBrowser('other');
    }
  }, []);

  const handleInstallClick = () => {
    setShowInstructions(true);
  };

  const getBrowserInstructions = () => {
    switch (browser) {
      case 'chrome':
        return {
          name: 'Chrome',
          steps: [
            'Download the extension from GitHub (click the button below)',
            'Extract the ZIP file and locate the "extension" folder',
            'Open Chrome and navigate to: chrome://extensions/',
            'Enable "Developer mode" (toggle in top-right corner)',
            'Click "Load unpacked" button',
            'Select the "extension" folder from the extracted files',
            'The extension icon will appear in your toolbar!'
          ]
        };
      case 'edge':
        return {
          name: 'Microsoft Edge',
          steps: [
            'Download the extension from GitHub (click the button below)',
            'Extract the ZIP file and locate the "extension" folder',
            'Open Edge and navigate to: edge://extensions/',
            'Enable "Developer mode" (toggle in top-right corner)',
            'Click "Load unpacked" button',
            'Select the "extension" folder from the extracted files',
            'The extension icon will appear in your toolbar!'
          ]
        };
      case 'brave':
        return {
          name: 'Brave',
          steps: [
            'Download the extension from GitHub (click the button below)',
            'Extract the ZIP file and locate the "extension" folder',
            'Open Brave and navigate to: brave://extensions/',
            'Enable "Developer mode" (toggle in top-right corner)',
            'Click "Load unpacked" button',
            'Select the "extension" folder from the extracted files',
            'The extension icon will appear in your toolbar!'
          ]
        };
      case 'firefox':
        return {
          name: 'Firefox',
          steps: [
            'Download the extension from GitHub (click the button below)',
            'Extract the ZIP file and locate the "extension" folder',
            'Open Firefox and navigate to: about:debugging',
            'Click "This Firefox" tab',
            'Click "Load Temporary Add-on" button',
            'Navigate to and select: extension/manifest.json from the extracted files',
            'The extension will load (note: temporary add-ons are removed on browser restart)'
          ]
        };
      default:
        return {
          name: 'Your Browser',
          steps: [
            'Download the extension from GitHub (click the button below)',
            'Extract the ZIP file and locate the "extension" folder',
            'Open your browser\'s extension management page',
            'Enable Developer mode',
            'Load the extension folder',
            'Check your browser\'s documentation for specific instructions'
          ]
        };
    }
  };

  const instructions = getBrowserInstructions();

  if (!showInstructions) {
    return (
      <div className="extension-install">
        <button className="install-button" onClick={handleInstallClick}>
          <span className="install-icon">⬇️</span>
          <span>Install Extension</span>
        </button>
      </div>
    );
  }

  return (
    <div className="extension-install-modal">
      <div className="extension-install-content">
        <button className="close-button" onClick={() => setShowInstructions(false)}>
          ✕
        </button>
        <h2>Install Browser Extension</h2>
        <p className="browser-detected">Detected: <strong>{instructions.name}</strong></p>
        
        <div className="instructions">
          <h3>Installation Steps:</h3>
          <ol>
            {instructions.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="download-buttons">
          <a 
            href={GITHUB_DOWNLOAD_URL}
            className="download-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="download-icon">📥</span>
            Download Extension from GitHub
          </a>
          <a 
            href={GITHUB_EXTENSION_URL}
            className="view-github-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="github-icon">🔗</span>
            View Extension on GitHub
          </a>
        </div>

        <div className="alternative-install">
          <h4>Alternative: Manual Installation</h4>
          <p>If you prefer, you can manually install by:</p>
          <ol>
            <li>Downloading or cloning this repository</li>
            <li>Following the steps in the README.md file</li>
            <li>Or check the <code>extension/INSTALL.md</code> file for detailed instructions</li>
          </ol>
        </div>

        <div className="extension-features">
          <h4>Extension Features:</h4>
          <ul>
            <li>🌐 Weather widget on every website</li>
            <li>⏰ Live time display</li>
            <li>🎯 Customizable position</li>
            <li>🖱️ Draggable widget (Shift + drag)</li>
            <li>⚙️ Settings panel</li>
            <li>🔄 Auto-refresh every 30 minutes</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExtensionInstall;

