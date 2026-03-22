import React, { useState } from 'react';
import './About.css';

const About: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'career' | 'outside'>('career');
    const [photoError, setPhotoError] = useState(false);

    return (
        <div className="about-app">
            <div className="about-header">
                {!photoError && (
                    <div className="about-photo-wrap">
                        <img 
                            src="/photos/1.jpg" 
                            alt="Alex" 
                            className="about-photo"
                            onError={() => setPhotoError(true)}
                        />
                    </div>
                )}
                <div className="about-intro">
                    <h1 className="about-title">About Me</h1>
                    <p className="about-lead">
                        Hi, I'm Alex — a Computer Science student at Western University with a passion for building things that matter. 
                        I love turning ideas into reality through code, whether it's AI-powered tools, IoT solutions, full-stack applications, 
                        or blockchain projects.
                    </p>
                    <p className="about-sub">
                        When I'm not coding, you'll find me on the slopes, in the gym, or exploring new places.
                    </p>
                </div>
            </div>

            <div className="about-tabs">
                <button 
                    className={`tab-button ${activeTab === 'career' ? 'active' : ''}`}
                    onClick={() => setActiveTab('career')}
                >
                    Career
                </button>
                <button 
                    className={`tab-button ${activeTab === 'outside' ? 'active' : ''}`}
                    onClick={() => setActiveTab('outside')}
                >
                    Outside Life
                </button>
            </div>

            <div className="tab-content">
                {activeTab === 'career' && (
                    <div className="career-section">
                        <h2>What I'm Into</h2>
                        <p className="about-text">
                            I'm drawn to projects that push boundaries and solve real problems. My experience spans full-stack development, 
                            cloud infrastructure, and building real world solutions.
                        </p>
                        <h3>Focus Areas</h3>
                        <ul className="about-list">
                            <li><strong>HealthTech</strong> — Building tools with real world impact</li>
                            <li><strong>IoT</strong> — Building smart solutions for everyday problems</li>
                            <li><strong>AI & ML</strong> — Building intelligent tools</li>
                            <li><strong>Full-Stack Development</strong> — Crafting responsive, scalable applications</li>
                            <li><strong>Blockchain</strong> — Solana development, smart contracts, and Web3 integrations</li>
                            <li><strong>Automation & DevOps</strong> — CI/CD pipelines, scripting, and making systems run smoother</li>
                            <li><strong>Game Development</strong> — RPGs, mechanics, and bringing joy to peoples lives</li>
                        </ul>
                    </div>
                )}

                {activeTab === 'outside' && (
                    <div className="outside-section">
                        <h2>Beyond the Screen</h2>

                        <ul className="about-list">
                            <li><strong>Fitness</strong> — Trying to get stronger, faster, and healthier than yesterday.</li>
                            <li><strong>Snowboarding</strong> — Nothing beats fresh powder and the rush of carving down a mountain</li>
                            <li><strong>Traveling</strong> — Exploring new cities, cultures, and FOOOOOOD</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default About;