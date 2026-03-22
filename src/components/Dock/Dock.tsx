import React from 'react';
import './Dock.css';
import { BriefcaseIcon, FileIcon, PhoneIcon, UserIcon, TerminalIcon } from '../Icons/Icons';

interface DockItem {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface DockProps {
  openWindows: string[];
  onOpenWindow: (windowId: string) => void;
}

const Dock: React.FC<DockProps> = ({ openWindows, onOpenWindow }) => {
  const items: DockItem[] = [
    { id: 'projects', name: 'Projects', icon: <BriefcaseIcon size={24} /> },
    { id: 'resume', name: 'Resume', icon: <FileIcon size={24} /> },
    { id: 'contact', name: 'Contact', icon: <PhoneIcon size={24} /> },
    { id: 'about', name: 'About', icon: <UserIcon size={24} /> },
  ];

  React.useEffect(() => {
    onOpenWindow('terminal');
  }, []);

  const handleDockItemClick = (itemId: string) => {
    onOpenWindow(itemId);
  };

  return (
    <div className="dock">
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          <div
            className={`dock-item ${openWindows.includes(item.id) ? 'active' : ''}`}
            onClick={() => handleDockItemClick(item.id)}
          >
            <div className="dock-item-inner">
              <div className="dock-item-icon">{item.icon}</div>
            </div>
            <div className="dock-tooltip">{item.name}</div>
          </div>
          {index === 5 && <div className="dock-separator" />}
        </React.Fragment>
      ))}
      <div
        className={`dock-item ${openWindows.includes('terminal') ? 'active' : ''}`}
        onClick={() => handleDockItemClick('terminal')}
      >
        <div className="dock-item-inner">
          <div className="dock-item-icon"><TerminalIcon size={24} /></div>
        </div>
        <div className="dock-tooltip">Terminal</div>
      </div>
    </div>
  );
};

export default Dock;