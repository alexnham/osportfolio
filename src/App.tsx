import React, { useState } from 'react';
import BootAnimation from './components/Boot/BootAnimation';
import Desktop from './components/Desktop/Desktop';
import Dock from './components/Dock/Dock';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';

function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [openWindows, setOpenWindows] = useState<string[]>([]);

  const handleBootComplete = () => {
    setTimeout(() => {
      setIsBooting(false);
    }, 1800);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.body.classList.toggle('light-theme');
  };

  const handleOpenWindow = (windowId: string) => {
    if (openWindows.indexOf(windowId) === -1) {
      setOpenWindows([...openWindows, windowId]);
    }
  };

  const handleCloseWindow = (windowId: string) => {
    setOpenWindows(openWindows.filter(id => id !== windowId));
  };
  
  React.useEffect(() => {
    if (localStorage.getItem('hasBooted') === 'true') {
      setIsBooting(false);
    }
  }, []);

  return (
    <>
      {isBooting && <BootAnimation onComplete={handleBootComplete} />}
      {!isBooting && (
        <>
          <Desktop 
            openWindows={openWindows}
            onOpenWindow={handleOpenWindow}
            onCloseWindow={handleCloseWindow}
          />
          <Dock 
            openWindows={openWindows}
            onOpenWindow={handleOpenWindow}
          />
          <ThemeToggle isDark={isDarkTheme} onToggle={toggleTheme} />
        </>
      )}
    </>
  );
}

export default App;