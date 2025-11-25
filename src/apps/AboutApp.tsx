import React from 'react';

const AboutApp: React.FC = () => {
    return (
        <div className="about-app">
            <h1>About AlexOS</h1>
            <p>AlexOS is a faux desktop operating system designed for demonstration purposes.</p>
            <p>Features include:</p>
            <ul>
                <li>Draggable window interface</li>
                <li>Terminal for command input</li>
                <li>Light and dark themes</li>
                <li>Easter-egg commands</li>
            </ul>
            <p>Created by Alex as a portfolio project.</p>
        </div>
    );
};

export default AboutApp;