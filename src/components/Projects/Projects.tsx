import React, { useState } from 'react';
import './Projects.css';
import { FolderIcon, CloudIcon } from '../Icons/Icons';

interface Project {
  id: string;
  name: string;
  description: string;
  link?: string;
  tags: string[];
}

const projects: Project[] = [
  { id: 'summarizer', name: 'Summarizer', description: 'AI-powered text summarization tool', link: 'https://github.com/alexnham/summarizer', tags: ['AI', 'NLP'] },
  { id: 'solana-coinflip', name: 'Solana Coinflip', description: 'Coinflip game on Solana', link: 'https://github.com/alexnham/Solana-Coinflip', tags: ['Blockchain', 'Rust', 'React'] },
  { id: 'projmanage', name: 'ProjManage', description: 'Project tracking and display', link: 'https://github.com/alexnham/projmanage', tags: ['React, MongoDB, Node.js'] },
  { id: 'elemental-flip', name: 'Elemental Flip', description: 'RPG dungeon crawler', link: 'https://github.com/alexnham/elemental-flip', tags: ['Game'] },
  { id: 'nhamogram', name: 'Nhamogram', description: 'Adrenal incidentaloma analysis', link: 'https://github.com/alexnham/nhamogram', tags: ['HealthTech'] },
  { id: "gms", name: "Good Morning Solana", description: 'Solana wallet morning routine', link: 'https://github.com/alexnham/gms', tags: ['Blockchain', 'Rust', 'Python', 'React'] },
  { id: 'household-analysis', name: "Canadian Household Savings Rate Analysis", description: 'ML model to predict household savings rate', link: 'https://github.com/alexnham/household-analysis', tags: ['Data Analysis', 'ML'] },
  { id: 'gpa-calculator', name: 'GPA Calculator', description: 'GPA calculator for students based off transcript', link: 'https://github.com/alexnham/gpa-calculator-frontend', tags: ['Angular, Python'] },
];

type ViewMode = 'grid' | 'list';

const Projects: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const handleProjectClick = (project: Project) => {
    if (project.link) {
      window.open(project.link, '_blank');
    } else {
      setSelectedProject(selectedProject === project.id ? null : project.id);
    }
  };

  return (
    <div className="finder">
      {/* Toolbar */}
      <div className="finder-toolbar">
        <div className="finder-nav-buttons">
          <button className="finder-nav-btn" aria-label="Back" disabled>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 2L4 6l4 4"/>
            </svg>
          </button>
          <button className="finder-nav-btn" aria-label="Forward" disabled>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 2l4 4-4 4"/>
            </svg>
          </button>
        </div>
        <div className="finder-view-buttons">
          <button
            className={`finder-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            aria-label="Grid view"
            title="Grid view"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <rect x="1" y="1" width="6" height="6" rx="1"/>
              <rect x="9" y="1" width="6" height="6" rx="1"/>
              <rect x="1" y="9" width="6" height="6" rx="1"/>
              <rect x="9" y="9" width="6" height="6" rx="1"/>
            </svg>
          </button>
          <button
            className={`finder-view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            aria-label="List view"
            title="List view"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <rect x="2" y="2" width="12" height="2" rx="0.5"/>
              <rect x="2" y="7" width="12" height="2" rx="0.5"/>
              <rect x="2" y="12" width="12" height="2" rx="0.5"/>
            </svg>
          </button>
        </div>
        <div className="finder-path-bar">
          <span className="finder-path-icon"><FolderIcon size={14} /></span>
          <span className="finder-path-text">Projects</span>
        </div>
      </div>

      <div className="finder-body">
        {/* Sidebar */}
        <aside className="finder-sidebar">
          <div className="finder-sidebar-section">
            <div className="finder-sidebar-title">Favorites</div>
            <div className="finder-sidebar-item active">
              <span className="finder-sidebar-icon"><FolderIcon size={16} /></span>
              <span>Projects</span>
            </div>
          </div>
          <div className="finder-sidebar-section">
            <div className="finder-sidebar-title">iCloud</div>
            <div className="finder-sidebar-item">
              <span className="finder-sidebar-icon"><CloudIcon size={16} /></span>
              <span onClick={() => window.open('https://www.github.com/alexnham', '_blank')}>iCloud Drive</span>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="finder-content">
          <div className="finder-content-header">
            <h2 className="finder-content-title">Projects</h2>
            <span className="finder-content-count">{projects.length} items</span>
          </div>
          {viewMode === 'grid' ? (
            <div className="finder-grid">
              {projects.map((project) => (
                <button
                  key={project.id}
                  className={`finder-folder ${selectedProject === project.id ? 'selected' : ''}`}
                  onClick={() => handleProjectClick(project)}
                  onDoubleClick={() => project.link && window.open(project.link, '_blank')}
                >
                  <div className="finder-folder-icon">
                    <svg width="64" height="52" viewBox="0 0 64 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 8h20l6 6h30c2.2 0 4 1.8 4 4v26c0 2.2-1.8 4-4 4H4c-2.2 0-4-1.8-4-4V12c0-2.2 1.8-4 4-4z" 
                        fill="#F2D16B" stroke="#E5B93D" strokeWidth="1.5" strokeLinejoin="round"/>
                      <path d="M4 14h56" stroke="#E5B93D" strokeWidth="1.5"/>
                    </svg>
                  </div>
                  <span className="finder-folder-name">{project.name}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="finder-list">
              <div className="finder-list-header">
                <span className="finder-list-col name">Name</span>
                <span className="finder-list-col desc">Description</span>
                <span className="finder-list-col tags">Tags</span>
              </div>
              {projects.map((project) => (
                <button
                  key={project.id}
                  className={`finder-list-row ${selectedProject === project.id ? 'selected' : ''}`}
                  onClick={() => handleProjectClick(project)}
                  onDoubleClick={() => project.link && window.open(project.link, '_blank')}
                >
                  <span className="finder-list-col name">
                    <span className="finder-list-folder-icon"><FolderIcon size={18} /></span>
                    {project.name}
                  </span>
                  <span className="finder-list-col desc">{project.description}</span>
                  <span className="finder-list-col tags">{project.tags.join(', ')}</span>
                </button>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Projects;
