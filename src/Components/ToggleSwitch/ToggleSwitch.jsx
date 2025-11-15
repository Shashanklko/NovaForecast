import React from 'react';
import './ToggleSwitch.css';

const ToggleSwitch = ({ 
  label, 
  checked, 
  onChange, 
  leftLabel, 
  rightLabel,
  id 
}) => {
  return (
    <div className="toggle-switch-container">
      {label && <label className="toggle-label-text">{label}</label>}
      <div className="toggle-switch-wrapper">
        {leftLabel && (
          <span className={`toggle-label ${!checked ? 'active' : ''}`}>
            {leftLabel}
          </span>
        )}
        <label className="toggle-switch" htmlFor={id}>
          <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
          />
          <span className="toggle-slider"></span>
        </label>
        {rightLabel && (
          <span className={`toggle-label ${checked ? 'active' : ''}`}>
            {rightLabel}
          </span>
        )}
      </div>
    </div>
  );
};

export default ToggleSwitch;

