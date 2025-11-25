import React from 'react';
import './Dock.css';

interface DockItem {
  id: string;
  name: string;
  emoji: string;
}

interface DockProps {
  openWindows: string[];
  onOpenWindow: (windowId: string) => void;
}

const Dock: React.FC<DockProps> = ({ openWindows, onOpenWindow }) => {
  const items: DockItem[] = [
    { id: 'projects', name: 'Projects', emoji: '💼' },
    { id: 'resume', name: 'Resume', emoji: '📄' },
    { id: 'playground', name: 'Playground', emoji: '🎮' },
    { id: 'labs', name: 'Labs', emoji: '🧪' },
    { id: 'contact', name: 'Contact', emoji: '📞' },
    { id: 'about', name: 'About', emoji: '👤' },
  ];

  React.useEffect(() => {
    onOpenWindow('terminal'); 
  }, []);

  const handleDockItemClick = (itemId: string) => {
    // Always call onOpenWindow - it will handle opening or bringing to front
    onOpenWindow(itemId);
  };

  return (
    <div className="dock">
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          <div 
            className={`dock-item ${openWindows.indexOf(item.id) ? 'active' : ''}`}
            onClick={() => handleDockItemClick(item.id)}
          >
            <div className="dock-item-inner">
              <div className="dock-item-icon">{item.emoji}</div>
            </div>
            <div className="dock-tooltip">{item.name}</div>
          </div>
          {index === 5 && <div className="dock-separator" />}
        </React.Fragment>
      ))}
      <div 
        className={`dock-item ${openWindows.indexOf('terminal') ? 'active' : ''}`}
        onClick={() => handleDockItemClick('terminal')}
      >
        <div className="dock-item-inner">
          <div className="dock-item-icon">⌨️</div>
        </div>
        <div className="dock-tooltip">Terminal</div>
      </div>
    </div>
  );
};

export default Dock;