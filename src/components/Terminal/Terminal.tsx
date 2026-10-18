import React, { useState, useRef, useEffect } from 'react';
import './Terminal.css';

interface TerminalLine {
  type: 'command' | 'output' | 'error' | 'success';
  content: string;
}

interface TerminalProps {
  onOpenWindow: (windowId: string) => void;
}

const appCommands: Record<string, { id: string; name: string }> = {
  about: { id: 'about', name: 'About' },
  skills: { id: 'resume', name: 'Resume' },
  resume: { id: 'resume', name: 'Resume' },
  projects: { id: 'projects', name: 'Projects' },
  contact: { id: 'contact', name: 'Contact' },
  playground: { id: 'playground', name: 'Playground' },
  labs: { id: 'labs', name: 'Labs' },
};

const Terminal: React.FC<TerminalProps> = ({ onOpenWindow }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'output', content: 'AlexOS Terminal v1.0.0' },
    { type: 'output', content: '-------------------------------' },
    { type: 'success', content: '  Hi, I\'m Alex, nice to meet you!' },
    { type: 'output', content: '-------------------------------' },
    { type: 'output', content: 'Type "help" for available commands.' },
    { type: 'output', content: '' },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new output is added
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
  }, []);

  const processCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    // Add command to history
    setHistory(prev => [...prev, { type: 'command', content: `$ ${cmd}` }]);

    if (!trimmedCmd) {
      return;
    }

    const appCommand = trimmedCmd.replace(/^open\s+/, '');
    const app = Object.prototype.hasOwnProperty.call(appCommands, appCommand) ? appCommands[appCommand] : undefined;
    if (app) {
      setHistory(prev => [...prev, { type: 'success', content: `Opening ${app.name}...` }, { type: 'output', content: '' }]);
      onOpenWindow(app.id);
      return;
    }

    let response: TerminalLine[] = [];

    switch (trimmedCmd) {
      case 'help':
        response = [
          { type: 'output', content: 'Available commands:' },
          { type: 'output', content: '  help          - Show this help message' },
          { type: 'output', content: '  about         - Open About' },
          { type: 'output', content: '  skills        - Open Resume' },
          { type: 'output', content: '  projects      - Open Projects' },
          { type: 'output', content: '  contact       - Open Contact' },
          { type: 'output', content: '  resume        - Open Resume' },
          { type: 'output', content: '  clear         - Clear the terminal' },
          { type: 'output', content: '  sudo hire me  - Easter egg' },
        ];
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'sudo hire me':
      case 'sudo hire alex':
        response = [
          { type: 'success', content: 'Permission granted!' },
          { type: 'success', content: 'Hiring process initiated...' },
          { type: 'success', content: 'Please contact: alexnham11@gmail.com' },
          { type: 'output', content: '' },
        ];
        break;

      case 'ls':
      case 'dir':
        response = [
          { type: 'output', content: 'projects/  resume.pdf  skills.txt  contact.info  about.txt' },
        ];
        break;

      case 'whoami':
        response = [
          { type: 'output', content: 'I am Alex!' },
        ];
        break;

      case 'date':
        response = [
          { type: 'output', content: new Date().toString() },
        ];
        break;

      default:
        response = [
          { type: 'error', content: `Command not found: ${cmd}` },
          { type: 'output', content: 'Type "help" for available commands.' },
        ];
    }

    setHistory(prev => [...prev, ...response, { type: 'output', content: '' }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      processCommand(input);
      setInput('');
    }
    inputRef.current?.blur(); // Unfocus to help zoom reset on mobile
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Add keyboard shortcuts if needed
    if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
    }
  };

  return (
    <div className="terminal" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-output" ref={outputRef}>
        {history.map((line, index) => (
          <div key={index} className={`terminal-line terminal-${line.type}`}>
            {line.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="terminal-input-form">
        <div className="terminal-input-line">
          <span className="terminal-prompt">alex@alexos:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="terminal-input"
            autoComplete="off"
            spellCheck="false"
          />
        </div>
      </form>
    </div>
  );
};

export default Terminal;