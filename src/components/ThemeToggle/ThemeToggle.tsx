import React from 'react';
import './themetoggle.css';
import { MoonIcon, SunIcon } from '../Icons/Icons';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <button
      className={`theme-toggle ${isDark ? 'dark' : 'light'}`}
      onClick={onToggle}
      aria-label="Toggle theme"
    >
      <div className="theme-toggle-thumb">
        {isDark ? <MoonIcon size={16} /> : <SunIcon size={16} />}
      </div>
    </button>
  );
};

export default ThemeToggle;