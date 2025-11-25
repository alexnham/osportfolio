import React from 'react';
import './Contact.css';

const Contact: React.FC = () => {
    return (
        <div className="contact-container">
            <div className="contact-header">
                <h1 className="contact-title">📞 Get In Touch</h1>
            </div>

            <div className="contact-cards">
                {/* Email */}
                <a 
                    href="mailto:alexnham11@gmail.com"
                    className="contact-card"
                >
                    <div className="contact-icon">📧</div>
                    <div className="contact-info">
                        <div className="contact-label">Email</div>
                        <div className="contact-value">alexnham11@gmail.com</div>
                    </div>
                </a>

                {/* LinkedIn */}
                <a 
                    href="https://linkedin.com/in/alex-nham"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-card"
                >
                    <div className="contact-icon">💼</div>
                    <div className="contact-info">
                        <div className="contact-label">LinkedIn</div>
                        <div className="contact-value">linkedin.com/in/alex-nham</div>
                    </div>
                </a>

                {/* GitHub */}
                <a 
                    href="https://github.com/alexnham"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-card"
                >
                    <div className="contact-icon">🐙</div>
                    <div className="contact-info">
                        <div className="contact-label">GitHub</div>
                        <div className="contact-value">github.com/alexnham</div>
                    </div>
                </a>

            </div>
        </div>
    );
};

export default Contact;