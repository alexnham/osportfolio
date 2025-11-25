import React, { useState } from "react";
import './Resume.css';

interface Experience {
    title: string;
    company: string;
    period: string;
    description: string[];
    technologies: string[];
}

interface Education {
    degree: string;
    school: string;
    period: string;
    details: string;
}

interface Skill {
    category: string;
    items: string[];
}

type TabType = 'experience' | 'education' | 'skills';

const Resume: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('experience');

    const experiences = [
        {
            title: "Software Engineer Intern",
            company: "Celestica",
            period: "May 2025 - Sept 2026", // Adjusted to reflect the timeline context
            description: [
                "Developed a multithreaded monitoring service overseeing 10+ distributed applications, improving system reliability and reducing downtime through proactive alerting and diagnostics ",
                "Led the migration of legacy Oracle SQL databases to Microsoft SQL Server, redesigning schemas and optimizing complex queries to improve performance, ensure data integrity, and enhance compatibility with .NET applications ",
                "Monitored and maintained distributed applications and infrastructure, diagnosing and resolving system issues to ensure continuous service availability ",
                "Designed, enhanced, and maintained full-stack .NET applications (on-premise and cloud-based) to ensure high scalability, security, and performance ",
                "Refactored and optimized Excel macros, automating manual workflows and increasing team productivity by 40% ",
                "Deployed and managed Azure resources, implementing CI/CD pipelines with Azure DevOps to streamline cloud deployments and improve delivery efficiency ",
                "Developed Python and PowerShell scripts to automate workflow processes, achieving over 50% faster execution and reducing manual errors "
            ],
            technologies: ["Oracle SQL", "Microsoft SQL Server", ".NET", "Azure", "CI/CD", "Azure DevOps", "Python", "PowerShell", "C#"]
        },
        {
            title: "Software Engineer Intern",
            company: "AQX AI",
            period: "April 2024 - Sept 2024",
            description: [
                "Developed and optimized a Node.js server for real-time communication with an AI agent, reducing latency by 90% ",
                "Integrated speech-to-text and text-to-speech solutions, enhancing system efficiency and user interaction ",
                "Designed a React front-end interface for initiating outbound calls with the AI Agent API ",
                "Containerized server and databases with Docker, streamlining deployment on Azure cloud services "
            ],
            technologies: ["Node.js", "React.js", "Docker", "Azure", "JavaScript", "TypeScript", "RESTful APIs"]
        },
        {
            title: "Website Coordinator",
            company: "Talbot Promotions",
            period: "August 2023 - April 2024",
            description: [
                "Developed and maintained custom client merchandise stores, ensuring responsive and user-friendly designs to enhance user experience and drive online sales ",
                "Designed custom automation scripts in Python with API calls, improving workflow processes by over 70% ",
                "Managed and organized large datasets with Microsoft Excel, enabling faster uploads and timely project completion ",
                "Utilized JSON to manage and edit custom features, enhancing project flexibility and alignment with specifications "
            ],
            technologies: ["Python", "API Calls", "Microsoft Excel", "JSON", "JavaScript", "CSS"]
        }
    ];

    const education = [
        {
            degree: "B.Sc. in Computer Science, Minor in Software Engineering",
            school: "The University Of Western Ontario",
            period: "Expected Graduation May 2025",
            details: "GPA 3.85"
        }
    ];

    const skills = [
        {
            category: "Languages",
            items: ["Java ", "Python ", "C ", "C++ ", "C# ", "JavaScript ", "TypeScript ", "SQL ", "Bash ", "Rust "]
        },
        {
            category: "Frameworks & Libraries",
            items: ["React.js ", "Node.js ", "Express.js ", "Flask ", "Django ", ".NET ", "React Native ", "Flutter ", "Tailwind CSS "]
        },
        {
            category: "Databases",
            items: ["MySQL ", "MongoDB ", "PostgreSQL ", "Microsoft SQL Server "]
        },
        {
            category: "Cloud & DevOps",
            items: ["Azure ", "Docker ", "GitHub Actions ", "CI/CD Pipelines ", "RESTful APIs ", "Postman ", "Nginx "]
        },
        {
            category: "Tools & Platforms",
            items: ["Git ", "Visual Studio Code ", "Postman ", "Figma ", "Jira ", "Unix/Linux ", "Microsoft Office Suite "]
        },
        {
            category: "Additional Skills",
            items: ["Agile Methodologies ", "System Administration ", "Troubleshooting ", "Automation Scripting ", "Team Collaboration ", "Problem Solving ", "Strategic Thinking "]
        }
    ];

    return (
        <div className="resume-container">
            <div className="resume-header">
                <div className="resume-intro">
                    <h1 className="resume-name">Alex Nham</h1>
                </div>
                <div className="resume-actions">
                    <a
                        href="/Alex.pdf"
                        target="_blank"
                        className="resume-button"
                    >
                        <span>⬇️</span>
                        View Resume
                    </a>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="resume-tabs">
                <button
                    className={`tab-button ${activeTab === 'experience' ? 'active' : ''}`}
                    onClick={() => setActiveTab('experience')}
                >
                    <span className="tab-icon">💼</span>
                    Experience
                </button>
                <button
                    className={`tab-button ${activeTab === 'education' ? 'active' : ''}`}
                    onClick={() => setActiveTab('education')}
                >
                    <span className="tab-icon">🎓</span>
                    Education
                </button>
                <button
                    className={`tab-button ${activeTab === 'skills' ? 'active' : ''}`}
                    onClick={() => setActiveTab('skills')}
                >
                    <span className="tab-icon">🛠️</span>
                    Skills
                </button>
            </div>

            <div className="resume-content">
                {/* Experience Section */}
                {activeTab === 'experience' && (
                    <section className="resume-section active">
                        <div className="timeline">
                            {experiences.map((exp, index) => (
                                <div key={index} className="timeline-item">
                                    <div className="timeline-marker"></div>
                                    <div className="timeline-content">
                                        <div className="experience-header">
                                            <div>
                                                <h3 className="experience-title">{exp.title}</h3>
                                                <p className="experience-company">{exp.company}</p>
                                            </div>
                                            <span className="experience-period">{exp.period}</span>
                                        </div>
                                        <ul className="experience-description">
                                            {exp.description.map((desc, i) => (
                                                <li key={i}>{desc}</li>
                                            ))}
                                        </ul>
                                        <div className="tech-tags">
                                            {exp.technologies.map((tech, i) => (
                                                <span key={i} className="tech-tag">{tech}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education Section */}
                {activeTab === 'education' && (
                    <section className="resume-section active">
                        {education.map((edu, index) => (
                            <div key={index} className="education-item">
                                <div className="education-header">
                                    <div>
                                        <h3 className="education-degree">{edu.degree}</h3>
                                        <p className="education-school">{edu.school}</p>
                                    </div>
                                    <span className="education-period">{edu.period}</span>
                                </div>
                                <p className="education-details">{edu.details}</p>
                            </div>
                        ))}
                    </section>
                )}

                {/* Skills Section */}
                {activeTab === 'skills' && (
                    <section className="resume-section active">
                        <div className="skills-grid">
                            {skills.map((skillGroup, index) => (
                                <div key={index} className="skill-category">
                                    <h3 className="skill-category-title">{skillGroup.category}</h3>
                                    <div className="skill-items">
                                        {skillGroup.items.map((skill, i) => (
                                            <span key={i} className="skill-tag">{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}

export default Resume;