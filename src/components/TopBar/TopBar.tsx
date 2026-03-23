import React, { useState, useEffect } from 'react';
import './TopBar.css';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

interface TopBarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

const formatTime = (date: Date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const formatDay = (date: Date) => {
  return date.toLocaleDateString([], { weekday: 'short' });
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
};

const TopBar: React.FC<TopBarProps> = ({ isDark, onToggleTheme }) => {
  const [now, setNow] = useState(new Date());
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="top-bar">
      <div className="top-bar-left">
        {!logoError && (
          <img 
            src="/logo.png" 
            alt="" 
            className="top-bar-logo"
            onError={() => setLogoError(true)}
          />
        )}
        <span className="top-bar-brand">AlexOS</span>
      </div>
      <div className="top-bar-right">
        <span className="top-bar-item">{formatDay(now)}</span>
        <span className="top-bar-sep">·</span>
        <span className="top-bar-item">{formatDate(now)}</span>
        <span className="top-bar-sep">·</span>
        <span className="top-bar-item top-bar-time">{formatTime(now)}</span>
        <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
      </div>
    </header>
  );
};

export default TopBar;
