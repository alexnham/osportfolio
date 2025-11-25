import React from 'react';

const ResumeApp: React.FC = () => {
    return (
        <div className="resume-app">
            <h1>Resume</h1>
            <p>
                [Your Name]
            </p>
            <p>
                [Your Address]
            </p>
            <p>
                [Your Phone Number]
            </p>
            <p>
                [Your Email]
            </p>
            <h2>Experience</h2>
            <ul>
                <li>[Job Title] at [Company Name] - [Dates]</li>
                <li>[Job Title] at [Company Name] - [Dates]</li>
            </ul>
            <h2>Education</h2>
            <ul>
                <li>[Degree] in [Field of Study] - [University Name] - [Year]</li>
            </ul>
            <h2>Skills</h2>
            <ul>
                <li>[Skill 1]</li>
                <li>[Skill 2]</li>
                <li>[Skill 3]</li>
            </ul>
        </div>
    );
};

export default ResumeApp;