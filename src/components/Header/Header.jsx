import React from 'react';
import './Header.css';


function Header({ language, toggleLanguage }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <a href="#home" className="brand-link">
            <div className="logo">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="10" fill="var(--accent-orange)" />
                <path
                  d="M12 20C12 16.5 14 13 20 13C26 13 28 16.5 28 20"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="15" cy="24" r="2" fill="white" />
                <circle cx="20" cy="26" r="2" fill="white" />
                <circle cx="25" cy="24" r="2" fill="white" />
              </svg>
            </div>
            <div className="brand-text">
              <h1 className="brand-name">SignBridge</h1>
              <span className="brand-tagline">
                {language === 'mr' ? 'AI सांकेतिक संवाद' : 'AI SIGN COMMUNICATION'}
              </span>
            </div>
          </a>
        </div>

        <nav className="header-nav">
          <a href="#home" className="nav-link">
            {language === 'mr' ? 'मुख्य' : 'Home'}
          </a>
          <a href="#demo" className="nav-link">
            {language === 'mr' ? 'डेमो' : 'Live Demo'}
          </a>
          <a href="#gestures" className="nav-link">
            {language === 'mr' ? 'जेश्चर' : 'Gestures'}
          </a>
          <a href="#features" className="nav-link">
            {language === 'mr' ? 'वैशिष्ट्ये' : 'Features'}
          </a>
          <a href="#usecases" className="nav-link">
            {language === 'mr' ? 'वापर' : 'Use Cases'}
          </a>
          <a href="#contact" className="nav-link">
            {language === 'mr' ? 'संपर्क' : 'Contact'}
          </a>
        </nav>

        <div className="header-actions">
          <div className="language-toggle">
            <button
              className={`lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => language !== 'en' && toggleLanguage()}
            >
              EN
            </button>
            <button
              className={`lang-btn ${language === 'mr' ? 'active' : ''}`}
              onClick={() => language !== 'mr' && toggleLanguage()}
            >
              मराठी
            </button>
          </div>

          <a href="#demo" className="btn btn-primary">
            {language === 'mr' ? 'डेमो वापरा →' : 'Try Demo →'}
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;