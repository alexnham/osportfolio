import React, { useState } from 'react';
import './Projects.css';
import { FolderIcon, CloudIcon } from '../Icons/Icons';

interface Project {
  id: string;
  name: string;
  description: string;
  link?: string;
  tags: string[];
  children?: Project[];
}

const projects: Project[] = [
  { id: 'codenames', name: 'Codenames', description: 'Codenames', link: 'https://github.com/alexnham/codenames', tags: ['GitHub'] },
  { id: 'coin-op-simulator', name: 'Coin Op Simulator', description: 'Coin-op simulator', link: 'https://github.com/alexnham/coin-op-simulator', tags: ['GitHub'] },
  { id: 'wrap-sol-devnet', name: 'Wrap SOL Devnet', description: 'Wrap SOL on Solana devnet', link: 'https://wrap-sol-devnet.vercel.app/', tags: ['Solana', 'Devnet'] },
  { id: 'solana-copy-trader', name: 'Solana Copy Trader', description: 'Personal portfolio website showcasing projects and skills', link: 'https://github.com/alexnham/pump-copy-trader', tags: ['Rust'] },
  {
    id: 'critbit', name: 'Critbit', description: 'An AMM and staking program with a play-to-earn blockchain game', tags: ['Blockchain', 'Game'],
    children: [
      { id: 'critbit-repo', name: 'Critbit', description: 'AMM and staking repository', link: 'https://github.com/alexnham/critbit', tags: ['GitHub'] },
      { id: 'critbit-world', name: 'Critbit World', description: 'Game repository', link: 'https://github.com/alexnham/critbit-world', tags: ['GitHub'] },
      { id: 'critbit-site', name: 'Live Site', description: 'Open Critbit', link: 'https://critbit.alexnham.com/', tags: ['Website'] },
    ],
  },
  { id: 'summarizer', name: 'Summarizer', description: 'AI-powered text summarization tool', link: 'https://github.com/alexnham/summarizer', tags: ['AI', 'NLP'] },
  { id: 'solana-coinflip', name: 'Solana Coinflip', description: 'Coinflip game on Solana', link: 'https://github.com/alexnham/Solana-Coinflip', tags: ['Blockchain', 'Rust', 'React'] },
  { id: 'projmanage', name: 'ProjManage', description: 'Project tracking and display', link: 'https://github.com/alexnham/projmanage', tags: ['React, MongoDB, Node.js'] },
  {
    id: 'elemental-flip', name: 'Elemental Flip', description: 'RPG dungeon crawler', tags: ['Game'],
    children: [
      { id: 'elemental-flip-repo', name: 'Repository', description: 'Elemental Flip source code', link: 'https://github.com/alexnham/elemental-flip', tags: ['GitHub'] },
      { id: 'elemental-flip-game', name: 'Play on itch.io', description: 'Open Elemental Flip on itch.io', link: 'https://ashtonfranklin04.itch.io/elemental-flip', tags: ['Website', 'Game'] },
    ],
  },
  {
    id: 'nhamogram', name: 'Nhamogram', description: 'Adrenal incidentaloma analysis', tags: ['HealthTech'],
    children: [
      { id: 'nhamogram-repo', name: 'Repository', description: 'Nhamogram source code', link: 'https://github.com/alexnham/nhamogram', tags: ['GitHub'] },
      { id: 'nhamogram-site', name: 'Live Site', description: 'Open Nhamogram', link: 'https://nhamogram.vercel.app/', tags: ['Website', 'HealthTech'] },
    ],
  },
  { id: "gms", name: "Good Morning Solana", description: 'Solana wallet morning routine', link: 'https://github.com/alexnham/gms', tags: ['Blockchain', 'Rust', 'Python', 'React'] },
  { id: 'household-analysis', name: "Canadian Household Savings Rate Analysis", description: 'ML model to predict household savings rate', link: 'https://github.com/alexnham/household-analysis', tags: ['Data Analysis', 'ML'] },
  {
    id: 'gpa-calculator', name: 'GPA Calculator', description: 'GPA calculator for students based off transcript', tags: ['Angular', 'Python'],
    children: [
      { id: 'gpa-api', name: 'API', description: 'Backend repository', link: 'https://github.com/alexnham/gpa-calculator-api', tags: ['GitHub', 'Python'] },
      { id: 'gpa-frontend', name: 'Frontend', description: 'Frontend repository', link: 'https://github.com/alexnham/gpa-calculator-frontend', tags: ['GitHub', 'Angular'] },
      { id: 'gpa-site', name: 'Live Site', description: 'Open GPA Calculator', link: 'https://gpa.alexnham.com', tags: ['Website'] },
    ],
  },
];

const ProjectIcon: React.FC<{ project: Project; size?: number }> = ({ project, size = 64 }) => {
  const isRepository = project.link && new URL(project.link).hostname === 'github.com';

  return (
    <svg width={size} height={size * 52 / 64} viewBox="0 0 64 52" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {project.children || !project.link ? (
        <>
          <path d="M4 8h20l6 6h30c2.2 0 4 1.8 4 4v26c0 2.2-1.8 4-4 4H4c-2.2 0-4-1.8-4-4V12c0-2.2 1.8-4 4-4z" fill="#F2D16B" stroke="#E5B93D" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M4 14h56" stroke="#E5B93D" strokeWidth="1.5" />
        </>
      ) : isRepository ? (
        <>
          <path d="M16 2h23l11 11v34a3 3 0 0 1-3 3H16a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3z" fill="#FAFBFD" stroke="#AAB6C5" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M39 2v11h11" fill="#DCE4ED" stroke="#AAB6C5" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M22 24h19M22 31h19M22 38h14" stroke="#93A4B8" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="32" cy="26" r="23" fill="#73BCEB" stroke="#3289BB" strokeWidth="1.5" />
          <path d="M15 11l9-5 7 5-3 7-8 2-3 8-7-3M39 7l3 9 10 4 3 9-9 3-3 13-7 3-4-10-6-6 3-8 9-2" fill="#7EC991" stroke="#4AA46A" strokeWidth="1.5" strokeLinejoin="round" />
          <ellipse cx="32" cy="26" rx="12" ry="23" stroke="#3289BB" strokeOpacity="0.45" />
          <path d="M10 26h44" stroke="#3289BB" strokeOpacity="0.45" />
        </>
      )}
    </svg>
  );
};

type ViewMode = 'grid' | 'list';

const Projects: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [navigation, setNavigation] = useState<{ history: (string | null)[]; index: number }>({ history: [null], index: 0 });
  const currentFolderId = navigation.history[navigation.index];
  const currentFolder = projects.find((project) => project.id === currentFolderId);
  const visibleProjects = [...(currentFolder?.children ?? projects)].sort(
    (a, b) => Number(Boolean(b.children)) - Number(Boolean(a.children))
  );

  const navigateTo = (folderId: string | null) => {
    if (folderId === currentFolderId) return;
    setNavigation(({ history, index }) => ({ history: [...history.slice(0, index + 1), folderId], index: index + 1 }));
  };

  const handleProjectClick = (project: Project) => {
    if (project.children) {
      navigateTo(project.id);
    } else if (project.link) {
      window.open(project.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="finder">
      {/* Toolbar */}
      <div className="finder-toolbar">
        <div className="finder-nav-buttons">
          <button className="finder-nav-btn" aria-label="Back" disabled={navigation.index === 0}
            onClick={() => setNavigation((nav) => ({ ...nav, index: Math.max(0, nav.index - 1) }))}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 2L4 6l4 4"/>
            </svg>
          </button>
          <button className="finder-nav-btn" aria-label="Forward" disabled={navigation.index === navigation.history.length - 1}
            onClick={() => setNavigation((nav) => ({ ...nav, index: Math.min(nav.history.length - 1, nav.index + 1) }))}>
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
          <button className="finder-path-root" onClick={() => navigateTo(null)}>Projects</button>
          {currentFolder && <span className="finder-path-text" aria-current="page">/ {currentFolder.name}</span>}
        </div>
      </div>

      <div className="finder-body">
        {/* Sidebar */}
        <aside className="finder-sidebar">
          <div className="finder-sidebar-section">
            <div className="finder-sidebar-title">Favorites</div>
            <button className={`finder-sidebar-item ${!currentFolder ? 'active' : ''}`} onClick={() => navigateTo(null)}>
              <span className="finder-sidebar-icon"><FolderIcon size={16} /></span>
              <span>Projects</span>
            </button>
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
            <h2 className="finder-content-title">{currentFolder?.name ?? 'Projects'}</h2>
            <span className="finder-content-count">{visibleProjects.length} items</span>
          </div>
          {viewMode === 'grid' ? (
            <div className="finder-grid">
              {visibleProjects.map((project) => (
                <button
                  key={project.id}
                  className="finder-folder"
                  title={project.children ? `Open ${project.name} folder` : `${project.description} (opens in a new tab)`}
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="finder-folder-icon">
                    <ProjectIcon project={project} />
                  </div>
                  <span className="finder-folder-name">{project.name}{project.link && <span aria-hidden="true"> ↗</span>}</span>
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
              {visibleProjects.map((project) => (
                <button
                  key={project.id}
                  className="finder-list-row"
                  title={project.children ? `Open ${project.name} folder` : `${project.description} (opens in a new tab)`}
                  onClick={() => handleProjectClick(project)}
                >
                  <span className="finder-list-col name">
                    <span className="finder-list-folder-icon"><ProjectIcon project={project} size={20} /></span>
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
