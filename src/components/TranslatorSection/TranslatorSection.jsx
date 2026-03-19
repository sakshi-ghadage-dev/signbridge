import React, { useState } from 'react';
import './TranslatorSection.css';
import WebcamFeed from '../WebcamFeed/WebcamFeed';
import TextTranslator from '../TextTranslator/TextTranslator';

function TranslatorSection({ language }) {
  const [activeMode, setActiveMode] = useState('sign');

  return (
    <section className="translator-section" id="demo">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            {language === 'mr' ? (
              <>
                थेट <span className="text-gradient">अनुवाद डेमो</span> वापरून पहा
              </>
            ) : (
              <>
                Try the <span className="text-gradient">Live Translator</span>
              </>
            )}
          </h2>
          <p className="section-subtitle">
            {language === 'mr'
              ? 'AI-आधारित भारतीय सांकेतिक भाषा आणि द्विभाषिक मजकूर अनुभव'
              : 'Experience AI-powered Indian Sign Language and bilingual text interaction'}
          </p>
        </div>

        <div className="mode-selector">
          <button
            className={`mode-btn ${activeMode === 'sign' ? 'active' : ''}`}
            onClick={() => setActiveMode('sign')}
          >
            <span>📷</span>
            {language === 'mr' ? 'Sign to Text' : 'Sign to Text'}
          </button>

          <button
            className={`mode-btn ${activeMode === 'text' ? 'active' : ''}`}
            onClick={() => setActiveMode('text')}
          >
            <span>⌨️</span>
            {language === 'mr' ? 'Text to Sign' : 'Text to Sign'}
          </button>
        </div>

        <div className="translator-content">
          {activeMode === 'sign' && <WebcamFeed language={language} />}
          {activeMode === 'text' && <TextTranslator language={language} />}
        </div>
      </div>
    </section>
  );
}

export default TranslatorSection;