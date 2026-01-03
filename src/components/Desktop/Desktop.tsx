import React from 'react';
import './Desktop.css';
import Window from '../Window/Window';
import Terminal from '../Terminal/Terminal';
import Resume from '../Resume/Resume';
import Contact from '../Contact/Contact';
import About from '../About/About';

interface AppIcon {
    id: string;
    name: string;
    emoji: string;
}

interface DesktopProps {
    openWindows: string[];
    onOpenWindow: (windowId: string) => void;
    onCloseWindow: (windowId: string) => void;
}

const Desktop: React.FC<DesktopProps> = ({ openWindows, onOpenWindow, onCloseWindow }) => {
    const icons: AppIcon[] = [
        { id: 'projects', name: 'Projects', emoji: '💼' },
        { id: 'resume', name: 'Resume', emoji: '📄' },
        { id: 'playground', name: 'Playground', emoji: '🎮' },
        { id: 'labs', name: 'Labs', emoji: '🧪' },
        { id: 'contact', name: 'Contact', emoji: '📞' },
        { id: 'about', name: 'About', emoji: '👤' },
        { id: 'terminal', name: 'Terminal', emoji: '⌨️' },
    ];

    const getWindowContent = (iconId: string, iconName: string) => {
        switch (iconId) {
            case 'projects':
                return (
                    <div style={{ padding: '20px' }}>
                        <h2>💼 My Projects</h2>
                        <div style={{ marginTop: '20px' }}>
                            <h3>Featured Work</h3>
                            <p>Coming soon...</p>
                        </div>
                    </div>
                );
            case 'resume':
                return <Resume />;
            case 'playground':
                return (
                    <div style={{ padding: '20px' }}>
                        <h2>🎮 Playground</h2>
                        <div style={{ marginTop: '20px' }}>
                            <p>Interactive demos and experiments...</p>
                        </div>
                    </div>
                );
            case 'labs':
                return (
                    <div style={{ padding: '20px' }}>
                        <h2>🧪 Labs</h2>
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
            {openWindows.map((windowId, index) => {
                const icon = icons.find(i => i.id === windowId);
                if (!icon) return null;

                return (
                    <Window
                        key={windowId}
                        title={icon.name}
                        onClose={() => onCloseWindow(windowId)}
                        noPadding={windowId === 'terminal' || windowId === 'resume' || windowId === 'contact'}
                        size={windowId === 'resume' ? 'large' : 'default'}
                    >
                        {getWindowContent(windowId, icon.name)}
                    </Window>
                );
            })}
        </div>
    );
};

export default Desktop;