import React, { useState, useRef, useMemo } from 'react';
import './Window.css';
import useDraggable from '../../hooks/useDraggable';

interface WindowProps {
  title: string;
  children?: React.ReactNode;
  onClose?: () => void;
  noPadding?: boolean;
  size?: 'default' | 'large';
  zIndex?: number;
}

const getInitialLayout = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const isSmall = typeof window !== 'undefined' && window.innerWidth <= 480;
  if (isSmall) {
    return { x: 0, y: 0, width: window.innerWidth, height: window.innerHeight - 80 };
  }
  if (isMobile) {
    const w = Math.min(window.innerWidth - 16, 700);
    const h = Math.min(window.innerHeight - 100, 600);
    return { x: (window.innerWidth - w) / 2, y: 8, width: w, height: h };
  }
  const w = 700;
  const h = 500;
  return {
    x: Math.max(0, (window.innerWidth - w) / 2),
    y: Math.max(0, (window.innerHeight - h) / 2),
    width: w,
    height: h,
  };
};

const Window: React.FC<WindowProps> = ({ title, children, onClose, noPadding = false, size = 'default', zIndex = 100 }) => {
  const initialLayout = useMemo(() => {
    if (typeof window === 'undefined') {
      return { x: 100, y: 100, width: 700, height: 500 };
    }
    const base = getInitialLayout();
    if (size === 'large' && window.innerWidth > 768) {
      const w = Math.min(1100, window.innerWidth - 40);
      const h = Math.min(750, window.innerHeight - 40);
      return {
        x: (window.innerWidth - w) / 2,
        y: (window.innerHeight - h) / 2,
        width: w,
        height: h,
      };
    }
    return { x: base.x, y: base.y, width: base.width, height: base.height };
  }, [size]);
  const { ref, isDragging } = useDraggable({ x: initialLayout.x, y: initialLayout.y });
  const [dimensions, setDimensions] = useState({
    width: initialLayout.width,
    height: initialLayout.height
  });
  const [isResizing, setIsResizing] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [savedDimensions, setSavedDimensions] = useState({ width: initialLayout.width, height: initialLayout.height });
  const [savedPosition, setSavedPosition] = useState({ x: initialLayout.x, y: initialLayout.y });

  const handleMouseDown = (e: React.MouseEvent, direction: string) => {
    if (isMaximized) return;
    
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = dimensions.width;
    const startHeight = dimensions.height;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;

      if (direction.includes('e')) newWidth = Math.max(400, startWidth + deltaX);
      if (direction.includes('w')) newWidth = Math.max(400, startWidth - deltaX);
      if (direction.includes('s')) newHeight = Math.max(300, startHeight + deltaY);
      if (direction.includes('n')) newHeight = Math.max(300, startHeight - deltaY);

      setDimensions({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
    setTimeout(() => onClose && onClose() && setIsMinimized(false), 300);
  };

  const handleMaximize = () => {
    if (isMaximized) {
      // Restore
      setIsMaximized(false);
      setDimensions(savedDimensions);
      if (ref.current) {
        ref.current.style.left = `${savedPosition.x}px`;
        ref.current.style.top = `${savedPosition.y}px`;
      }
    } else {
      // Maximize
      setSavedDimensions(dimensions);
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setSavedPosition({ x: rect.left, y: rect.top });
      }
      setIsMaximized(true);
      setDimensions({ 
        width: window.innerWidth - 20, 
        height: window.innerHeight - 20 
      });
      if (ref.current) {
        ref.current.style.left = '10px';
        ref.current.style.top = '10px';
      }
    }
  };

  return (
    <div 
      className={`window window-${size} ${isDragging ? 'dragging' : ''} ${isResizing ? 'resizing' : ''} ${isMaximized ? 'maximized' : ''} ${isMinimized ? 'minimized' : ''}`} 
      ref={ref}
      style={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
        zIndex
      }}
    >
      <div className="window-header">
        <div className="window-controls">
          <button className="window-control close" onClick={onClose} aria-label="Close" />
          <button className="window-control minimize" onClick={handleMinimize} aria-label="Minimize" />
          <button className="window-control maximize" onClick={handleMaximize} aria-label="Maximize" />
        </div>
        <div className="window-title">{title}</div>
      </div>
      <div className={`window-content ${noPadding ? 'no-padding' : ''}`}>
        {children}
      </div>

      {/* Resize Handles - hide when maximized */}
      {!isMaximized && (
        <>
          <div className="resize-handle resize-e" onMouseDown={(e) => handleMouseDown(e, 'e')} />
          <div className="resize-handle resize-s" onMouseDown={(e) => handleMouseDown(e, 's')} />
          <div className="resize-handle resize-w" onMouseDown={(e) => handleMouseDown(e, 'w')} />
          <div className="resize-handle resize-n" onMouseDown={(e) => handleMouseDown(e, 'n')} />
          <div className="resize-handle resize-se" onMouseDown={(e) => handleMouseDown(e, 'se')} />
          <div className="resize-handle resize-sw" onMouseDown={(e) => handleMouseDown(e, 'sw')} />
          <div className="resize-handle resize-ne" onMouseDown={(e) => handleMouseDown(e, 'ne')} />
          <div className="resize-handle resize-nw" onMouseDown={(e) => handleMouseDown(e, 'nw')} />
        </>
      )}
    </div>
  );
};

export default Window;