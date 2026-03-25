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
    { type: 'output', content: '-------------------------------' },
    { type: 'output', content: 'Hi, I\'m Alex, nice to meet you!' },
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
          { type: 'output', content: '  sudo hire me  - Easter egg' },
        ];
        break;

      case 'about':
        response = [
          { type: 'output', content: "Hi, I'm Alex — a Computer Science student at Western University" },
          { type: 'output', content: "with a passion for building things that matter." },
          { type: 'output', content: '' },
          { type: 'output', content: 'Focus areas: Full-Stack, HealthTech, IoT, AI & ML, Blockchain,' },
          { type: 'output', content: 'Automation & DevOps, Game Development' },
          { type: 'output', content: '' },
          { type: 'output', content: 'Beyond the screen: Fitness, Snowboarding, Traveling' },
        ];
        break;

      case 'skills':
        response = [
          { type: 'output', content: 'Languages:' },
          { type: 'success', content: '  Java, Python, C, C++, C#, JavaScript, TypeScript, Bash, Rust' },
          { type: 'output', content: '' },
          { type: 'output', content: 'Frameworks & Libraries:' },
          { type: 'success', content: '  React, Node.js, Express, Flask, Django, .NET, React Native, Flutter, Tailwind' },
          { type: 'output', content: '' },
          { type: 'output', content: 'Databases:' },
          { type: 'success', content: '  MySQL, MongoDB, PostgreSQL, Microsoft SQL Server' },
          { type: 'output', content: '' },
          { type: 'output', content: 'Cloud & DevOps:' },
          { type: 'success', content: '  Azure, Docker, GitHub Actions, CI/CD, REST APIs, Postman, Nginx' },
          { type: 'output', content: '' },
          { type: 'output', content: 'Tools & Additional:' },
          { type: 'success', content: '  Git, VS Code, Figma, Jira, Agile, Automation, Team Collaboration' },
        ];
        break;

      case 'projects':
        response = [
          { type: 'output', content: 'Featured Projects:' },
          { type: 'output', content: '1. Summarizer - AI-powered text summarization tool [AI, NLP]' },
          { type: 'output', content: '2. ProjManage - Project tracking and display [Full Stack]' },
          { type: 'output', content: '3. Elemental Flip - RPG dungeon crawler [Game]' },
        ];
        break;

      case 'contact':
        response = [
          { type: 'output', content: 'Contact Information:' },
          { type: 'output', content: 'Email: alexnham11@gmail.com' },
          { type: 'output', content: 'LinkedIn: linkedin.com/in/alex-nham' },
          { type: 'output', content: 'GitHub: github.com/alexnham' },
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