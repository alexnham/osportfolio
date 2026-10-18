import React from 'react';
import './Resume.css';

const Resume: React.FC = () => (
    <iframe
        className="resume-pdf"
        src="/Alex.pdf"
        title="Alex Nham Resume"
    />
);

export default Resume;
