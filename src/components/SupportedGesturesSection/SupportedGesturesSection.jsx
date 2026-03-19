import React from 'react';
import './SupportedGesturesSection.css';

function SupportedGesturesSection({ language }) {
  const gestures = [
    { icon: '👋', en: 'Hello', mr: 'नमस्कार' },
    { icon: '🙏', en: 'Thank You', mr: 'धन्यवाद' },
    { icon: '👍', en: 'Yes', mr: 'हो' },
    { icon: '✋', en: 'No', mr: 'नाही' },
    { icon: '🆘', en: 'Help', mr: 'मदत' },
    { icon: '🙂', en: 'Please', mr: 'कृपया' },
    { icon: '💧', en: 'Water', mr: 'पाणी' },
    { icon: '🍛', en: 'Food', mr: 'अन्न' },
    { icon: '🏠', en: 'Home', mr: 'घर' },
    { icon: '🤝', en: 'Friend', mr: 'मित्र' },
    { icon: '📞', en: 'Call', mr: 'फोन करा' },
    { icon: '🚶', en: 'Come', mr: 'या' },
    { icon: '👉', en: 'Go', mr: 'जा' },
    { icon: '🛑', en: 'Stop', mr: 'थांबा' },
    { icon: '❤️', en: 'Love', mr: 'प्रेम' },
    { icon: '😢', en: 'Sorry', mr: 'माफ करा' },
  ];

  return (
    <section className="supported-gestures-section" id="gestures">
      <div className="container">
        <div className="section-header">
          <div className="gesture-badge">
            <span>✨</span>
            {language === 'mr' ? 'दैनंदिन संवादासाठी' : 'For Daily Communication'}
          </div>

          <h2 className="section-title">
            {language === 'mr' ? 'समर्थित जेश्चर' : 'Supported Gestures'}
          </h2>

          <p className="section-subtitle">
            {language === 'mr'
              ? 'अधिक शब्द, अधिक संवाद — AI द्वारे ओळखले जाणारे जेश्चर'
              : 'More gestures, better communication — AI powered recognition'}
          </p>
        </div>

        <div className="gesture-grid">
          {gestures.map((gesture) => (
            <div className="gesture-card" key={gesture.en}>
              <div className="gesture-icon">{gesture.icon}</div>
              <h3>{language === 'mr' ? gesture.mr : gesture.en}</h3>
              <p>{language === 'mr' ? gesture.en : gesture.mr}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SupportedGesturesSection;