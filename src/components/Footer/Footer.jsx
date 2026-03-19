import React from 'react';
import './Footer.css';

function Footer({ language }) {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="brand-section">
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
              <div>
                <h3 className="brand-name">SignBridge</h3>
                <p className="brand-tagline">
                  {language === 'mr'
                    ? 'सर्वांसाठी संवादाचा पूल'
                    : 'Bridging Communication for All'}
                </p>
              </div>
            </div>

            <p className="footer-description">
              {language === 'mr'
                ? 'भारतीय सांकेतिक भाषा, AI आणि मराठी समर्थनाद्वारे अधिक प्रवेशयोग्य संवाद घडवणारे द्विभाषिक वेब व्यासपीठ.'
                : 'A bilingual ISL translation platform powered by AI, making communication accessible for deaf and hard-of-hearing individuals.'}
            </p>
          </div>

          <div className="footer-links">
            <div className="link-group">
              <h4>{language === 'mr' ? 'उत्पादन' : 'Product'}</h4>
              <a href="#demo">{language === 'mr' ? 'लाइव्ह डेमो' : 'Live Demo'}</a>
              <a href="#features">{language === 'mr' ? 'वैशिष्ट्ये' : 'Features'}</a>
              <a href="#usecases">{language === 'mr' ? 'वापर क्षेत्रे' : 'Use Cases'}</a>
            </div>

            <div className="link-group">
              <h4>{language === 'mr' ? 'तंत्रज्ञान' : 'Technology'}</h4>
              <a href="#demo">React.js</a>
              <a href="#demo">MediaPipe</a>
              <a href="#demo">Web Speech API</a>
            </div>

            <div className="link-group">
              <h4>{language === 'mr' ? 'टीम' : 'Team'}</h4>
              <span className="team-name">Sakshi Ghadage</span>
              <span className="team-name">Yash Bhate</span>
              <span className="team-name">Aditya Harale</span>
              <span className="team-name">Swapnil Gangate</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="tech-stack">
            <span className="tech-badge">React.js</span>
            <span className="tech-badge">MediaPipe</span>
            <span className="tech-badge">TensorFlow.js Ready</span>
            <span className="tech-badge">ISL</span>
            <span className="tech-badge">Marathi</span>
          </div>

          <p className="copyright">
            © 2026 SignBridge — {language === 'mr' ? 'हॅकाथॉन प्रकल्प' : 'Hackathon Project'}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;