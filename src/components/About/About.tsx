import React from 'react';
import './About.css';

const About: React.FC = () => {
    return (
        <div className="about-app">
            <h1>👤 About Me</h1>
            <p>Hi! I'm Alex, a passionate developer.</p>
            <img src="path_to_your_image.jpg" alt="About Me" />
            <h2>Development</h2>
            <ul>
                <li>Web Development</li>
                <li>Open Source Contribution</li>
                <li>Gaming</li>
            </ul>
            <h2>Outside of Development</h2>
            <ul>
                <li>Fitness</li>
                <li>Snowboarding</li>
                <li>Traveling</li>
            </ul>
        </div>
    );
};

export default About;