import React, { useState, useRef, useEffect } from 'react';
import './Terminal.css';

interface TerminalLine {
  type: 'command' | 'output' | 'error' | 'success';
  content: string;
}

const Terminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'output', content: 'AlexOS Terminal v1.0.0' },
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

    let response: TerminalLine[] = [];

    switch (trimmedCmd) {
      case 'help':
        response = [
          { type: 'output', content: 'Available commands:' },
          { type: 'output', content: '  help          - Show this help message' },
          { type: 'output', content: '  about         - Learn about me' },
          { type: 'output', content: '  skills        - List my skills' },
          { type: 'output', content: '  projects      - Show my projects' },
          { type: 'output', content: '  contact       - Get contact information' },
          { type: 'output', content: '  clear         - Clear the terminal' },
          { type: 'output', content: '  sudo hire me  - Easter egg 🥚' },
        ];
        break;

      case 'about':
        response = [
          { type: 'output', content: 'Alex - Full Stack Developer' },
          { type: 'output', content: 'Passionate about building elegant solutions.' },
          { type: 'output', content: 'Location: Toronto 🍁' },
        ];
        break;

      case 'skills':
        response = [
          { type: 'output', content: 'Technical Skills:' },
          { type: 'success', content: '✓ React, TypeScript, Node.js' },
          { type: 'success', content: '✓ Python, Java, C++' },
          { type: 'success', content: '✓ AWS, Azure, Docker' },
          { type: 'success', content: '✓ SQL, MongoDB, Redis' },
        ];
        break;

      case 'projects':
        response = [
          { type: 'output', content: 'Featured Projects:' },
          { type: 'output', content: '1. idk' },
          { type: 'output', content: '2. idk' },
          { type: 'output', content: '3. idk' },
        ];
        break;

      case 'contact':
        response = [
          { type: 'output', content: 'Contact Information:' },
          { type: 'output', content: '📧 Email: alexnham11@gmail.com' },
          { type: 'output', content: '💼 LinkedIn: linkedin.com/in/alex-nham' },
          { type: 'output', content: '🐙 GitHub: github.com/alexnham' },
        ];
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'sudo hire me':
      case 'sudo hire alex':
        response = [
          { type: 'success', content: '🎉 Permission granted!' },
          { type: 'success', content: '✨ Hiring process initiated...' },
          { type: 'success', content: '📧 Please contact: alexnham11@gmail.com' },
          { type: 'output', content: '' },
        ];
        break;

      case 'ls':
      case 'dir':
        response = [
          { type: 'output', content: 'projects/  resume.pdf  skills.txt  contact.info' },
        ];
        break;

      case 'whoami':
        response = [
          { type: 'output', content: 'alex' },
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