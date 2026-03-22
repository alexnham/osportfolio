import React from 'react';
import './Desktop.css';
import Window from '../Window/Window';
import PinnedPhotos from '../PinnedPhotos/PinnedPhotos';
import Terminal from '../Terminal/Terminal';
import Resume from '../Resume/Resume';
import Contact from '../Contact/Contact';
import About from '../About/About';
import Projects from '../Projects/Projects';

interface AppIcon {
    id: string;
    name: string;
}

interface DesktopProps {
    openWindows: string[];
    onOpenWindow: (windowId: string) => void;
    onCloseWindow: (windowId: string) => void;
}

const Desktop: React.FC<DesktopProps> = ({ openWindows, onOpenWindow, onCloseWindow }) => {
    const icons: AppIcon[] = [
        { id: 'projects', name: 'Projects' },
        { id: 'resume', name: 'Resume' },
        { id: 'playground', name: 'Playground' },
        { id: 'labs', name: 'Labs' },
        { id: 'contact', name: 'Contact' },
        { id: 'about', name: 'About' },
        { id: 'terminal', name: 'Terminal' },
    ];

    const getWindowContent = (iconId: string, iconName: string) => {
        switch (iconId) {
            case 'projects':
                return <Projects />;
            case 'resume':
                return <Resume />;
            case 'playground':
                return (
                    <div style={{ padding: '20px' }}>
                        <h2>Playground</h2>
                        <div style={{ marginTop: '20px' }}>
                            <p>Interactive demos and experiments...</p>
                        </div>
                    </div>
                );
            case 'labs':
                return (
                    <div style={{ padding: '20px' }}>
                        <h2>Labs</h2>
                        <div style={{ marginTop: '20px' }}>
                            <p>Experimental projects...</p>
                        </div>
                    </div>
                );
            case 'contact':
                return <Contact />;
            case 'about':
                return <About />;
            case 'terminal':
                return <Terminal />;
            default:
                return (
                    <div style={{ padding: '20px' }}>
                        <h2>{iconName}</h2>
                        <p>Content for {iconName} goes here...</p>
                    </div>
                );
        }
    };

    return (
        <div className="desktop">
            <PinnedPhotos />
            {openWindows.map((windowId, index) => {
                const icon = icons.find(i => i.id === windowId);
                if (!icon) return null;

                return (
                    <Window
                        key={windowId}
                        title={icon.name}
                        zIndex={100 + index}
                        onClose={() => onCloseWindow(windowId)}
                        noPadding={windowId === 'terminal' || windowId === 'resume' || windowId === 'contact' || windowId === 'projects' || windowId === 'about'}
                        size={windowId === 'resume' || windowId === 'projects' ? 'large' : 'default'}
                    >
                        {getWindowContent(windowId, icon.name)}
                    </Window>
                );
            })}
        </div>
    );
};

export default Desktop;