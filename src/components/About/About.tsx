import React, { useState } from 'react';
import './About.css';

const About: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'career' | 'outside'>('career');

    return (
        <div className="about-app">
            <h1>👤 About Me</h1>
            <p>Hi! I'm Alex, a passionate developer.</p>
            <img src="path_to_your_image.jpg" alt="About Me" />
            
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
                        <h2>Development</h2>
                        <ul>
                            <li>Artificial Intelligence</li>
                            <li>Web Development</li>
                            <li>Open Source Contribution</li>
                            <li>Game Development</li>
                            <li>Blockchain</li>

                        </ul>
                    </div>
                )}

                {activeTab === 'outside' && (
                    <div className="outside-section">
                        <h2>Outside of Development</h2>
                        <ul>
                            <li>Fitness</li>
                            <li>Snowboarding</li>
                            <li>Traveling</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default About;