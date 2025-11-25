import React, { useEffect } from 'react';
import './bootanimation.css';

interface BootAnimationProps {
  onComplete: () => void;
}

const BootAnimation: React.FC<BootAnimationProps> = ({ onComplete }) => {
  useEffect(() => {

    const timer = setTimeout(() => {
      onComplete();
      localStorage.setItem('hasBooted', 'true');
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="boot-screen">
      <div className="boot-content">
        <div className="boot-logo">
          <div className="boot-icon"></div>
          <h1 className="boot-title">AlexOS</h1>
        </div>
        <p className="boot-message">Starting system...</p>
        <div className="boot-progress">
          <div className="boot-progress-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default BootAnimation;