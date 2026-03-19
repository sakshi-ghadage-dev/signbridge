import React from 'react';
import './HeroSection.css';

function HeroSection({ language }) {
  return (
    <section className="hero-section" id="home">
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            <span>✨</span>
            {language === 'mr'
              ? 'मराठी समर्थनासह समावेशक AI'
              : 'INCLUSIVE AI WITH MARATHI SUPPORT'}
          </div>

          <h1 className="hero-title">
            {language === 'mr' ? (
              <>
                भारतीय सांकेतिक भाषा <br />
                <span className="text-gradient">मराठी संवादासह</span>
              </>
            ) : (
              <>
                Breaking Barriers <br />
                <span className="text-gradient">with Sign Language</span>
              </>
            )}
          </h1>

          <p className="hero-subtitle">
            {language === 'mr'
              ? 'SignBridge हे browser-based AI वेब ॲप आहे जे जेश्चर ओळखते, त्वरित मजकूर देते आणि इंग्रजी-मराठी संवाद अधिक सुलभ बनवते.'
              : 'A browser-based AI web app that detects Indian Sign Language gestures and instantly converts them into accessible English and Marathi communication.'}
          </p>

          <div className="hero-audience">
            <span className="audience-badge">
              {language === 'mr' ? 'ISL वापरकर्ते आणि कुटुंबे' : 'ISL users and families'}
            </span>
            <span className="audience-badge">
              {language === 'mr' ? 'शाळा, रुग्णालये, NGOs' : 'Schools, hospitals, NGOs'}
            </span>
            <span className="audience-badge">
              {language === 'mr' ? 'मराठी + इंग्रजी संवाद' : 'Marathi + English communication'}
            </span>
          </div>

          <div className="hero-actions">
            <a href="#demo" className="btn btn-primary">
              {language === 'mr' ? 'आता सुरू करा →' : 'Start Communicating →'}
            </a>
            <a href="#features" className="btn btn-secondary">
              {language === 'mr' ? 'वैशिष्ट्ये पहा' : 'View Features'}
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="stats-grid">
            <div className="stat-card dark">
              <div className="stat-header">
                {language === 'mr' ? 'सिस्टम वैशिष्ट्ये' : 'SYSTEM HIGHLIGHTS'}
              </div>

              <div className="flow-item">
                💻 {language === 'mr' ? 'ब्राउझरवर चालते' : 'Runs in Browser'}
              </div>
              <div className="flow-item">
                ⚡ {language === 'mr' ? 'रिअल-टाइम आउटपुट' : 'Real-time Output'}
              </div>
              <div className="flow-item">
                🖐️ {language === 'mr' ? 'ISL जेश्चर ओळख' : 'ISL Gesture Detection'}
              </div>

              <div className="flow-note">
                {language === 'mr'
                  ? 'कोणत्याही इंस्टॉलेशनशिवाय थेट वापर.'
                  : 'No installation required — works instantly in browser.'}
              </div>
            </div>

            <div className="stat-card light">
              <div className="stat-header">
                {language === 'mr' ? 'वापर प्रवाह' : 'CONVERSATION FLOW'}
              </div>
              <div className="flow-item">
                👋 {language === 'mr' ? 'जेश्चर ओळखले' : 'Gesture detected'} → “Hello”
              </div>
              <div className="flow-item">
                🔁 {language === 'mr' ? 'मराठीत आउटपुट' : 'Marathi output'} → “नमस्कार”
              </div>
              <div className="flow-item">
                🔊 {language === 'mr' ? 'तत्काळ आवाज' : 'Instant speech'} →{' '}
                {language === 'mr' ? 'उपलब्ध' : 'Available'}
              </div>
              <div className="flow-note">
                {language === 'mr'
                  ? 'हॅकाथॉन डेमो, प्रवेशयोग्यता आणि प्रत्यक्ष परिणामासाठी डिझाइन केलेले.'
                  : 'Designed for hackathon demo flow, accessibility, and real-world impact.'}
              </div>
            </div>

            <div className="metrics-row">
              <div className="metric-card">
                <div className="metric-label">
                  {language === 'mr' ? 'भाषा' : 'LANGUAGES'}
                </div>
                <div className="metric-value">2</div>
                <div className="metric-desc">English + Marathi</div>
              </div>

              <div className="metric-card">
                <div className="metric-label">
                  {language === 'mr' ? 'मुख्य मोड' : 'CORE MODES'}
                </div>
                <div className="metric-value">2</div>
                <div className="metric-desc">Sign ↔ Text</div>
              </div>
            </div>

            <div className="metrics-row">
              <div className="metric-card">
                <div className="metric-label">
                  {language === 'mr' ? 'ब्राउझर-आधारित' : 'BROWSER-FIRST'}
                </div>
                <div className="metric-value">100%</div>
                <div className="metric-desc">
                  {language === 'mr' ? 'लाइटवेट वेब अनुभव' : 'Lightweight web experience'}
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-label">
                  {language === 'mr' ? 'डेमो दर्जा' : 'HACKATHON FIT'}
                </div>
                <div className="metric-value">Ready</div>
                <div className="metric-desc">
                  {language === 'mr' ? 'डेमो + संशोधन + प्रभाव' : 'Demo + research + impact'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;