import React, { useState, useEffect, useRef } from 'react';
import './TextTranslator.css';
import {
  translateToMarathi,
  translateToEnglish,
  getSignDescription,
  speakText,
} from '../../utils/translationUtils';

function TextTranslator({ language }) {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [signDescription, setSignDescription] = useState('');
  const [inputLanguage, setInputLanguage] = useState('en');

  // 🔥 NEW STATES (GIF PLAYER)
  const [sequence, setSequence] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const timeoutRef = useRef(null);

  /////////////////////////
  // 🔄 TRANSLATE + GENERATE GIF
  /////////////////////////

  const handleTranslate = () => {
    if (!inputText.trim()) return;

    const translated =
      inputLanguage === 'en'
        ? translateToMarathi(inputText)
        : translateToEnglish(inputText);

    setTranslatedText(translated);
    setSignDescription(getSignDescription(inputText));

    // 🔥 RESET PLAYER
    clearTimeout(timeoutRef.current);
    setCurrentIndex(0);

    // 🔥 CLEAN TEXT
    const clean = inputText.toLowerCase().replace(/[^a-z0-9 ]/g, '');

    let result = [];

    clean.split('').forEach((char) => {
      if (char === ' ') return;

      result.push({
        value: char,
        src: `/sign/${char}.gif`, // ⚠️ YOUR FOLDER
      });
    });

    setSequence(result);
    setIsPlaying(true);
  };

  /////////////////////////
  // ▶️ PLAYER ENGINE
  /////////////////////////

  useEffect(() => {
    if (!isPlaying || sequence.length === 0) return;

    function play() {
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => {
          if (prev + 1 >= sequence.length) return 0;
          return prev + 1;
        });
        play();
      }, 1500); // 🔥 PERFECT SPEED
    }

    play();

    return () => clearTimeout(timeoutRef.current);
  }, [isPlaying, sequence]);

  /////////////////////////
  // 🧹 CLEAR
  /////////////////////////

  const handleClear = () => {
    setInputText('');
    setTranslatedText('');
    setSignDescription('');
    setSequence([]);
    setIsPlaying(false);
    clearTimeout(timeoutRef.current);
  };

  /////////////////////////
  // 🎨 UI
  /////////////////////////

  return (
    <div className="text-translator">
      <div className="translator-card">
        <div className="input-section">
          <div className="section-header">
            <h3>{language === 'mr' ? 'इनपुट मजकूर' : 'Input Text'}</h3>

            <div className="language-selector">
              <button
                className={`lang-btn ${inputLanguage === 'en' ? 'active' : ''}`}
                onClick={() => setInputLanguage('en')}
              >
                English
              </button>

              <button
                className={`lang-btn ${inputLanguage === 'mr' ? 'active' : ''}`}
                onClick={() => setInputLanguage('mr')}
              >
                मराठी
              </button>
            </div>
          </div>

          <textarea
            className="text-input"
            placeholder={
              inputLanguage === 'en'
                ? 'Type your text here...'
                : 'आपला मजकूर येथे टाइप करा...'
            }
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={6}
          />

          <div className="input-actions">
            <button
              className="btn btn-primary"
              onClick={handleTranslate}
              disabled={!inputText.trim()}
            >
              🔄 {language === 'mr' ? 'अनुवाद' : 'Translate'}
            </button>

            <button className="btn btn-secondary" onClick={handleClear}>
              {language === 'mr' ? 'साफ करा' : 'Clear'}
            </button>
          </div>
        </div>

        <div className="output-section">
          {/* 🔤 TRANSLATION */}
          <div className="translation-output">
            <div className="output-header-row">
              <h4>{language === 'mr' ? 'अनुवाद' : 'Translation'}</h4>

              {translatedText && (
                <button
                  className="mini-action-btn"
                  onClick={() =>
                    speakText(
                      translatedText,
                      inputLanguage === 'en' ? 'mr-IN' : 'en-US'
                    )
                  }
                >
                  🔊
                </button>
              )}
            </div>

            {translatedText ? (
              <div className="output-text">{translatedText}</div>
            ) : (
              <div className="empty-output">
                {language === 'mr'
                  ? 'अनुवाद येथे दिसेल...'
                  : 'Translation will appear here...'}
              </div>
            )}
          </div>

          {/* 👋 SIGN OUTPUT */}
          <div className="sign-output">
            <h4>👋 {language === 'mr' ? 'साइन अॅनिमेशन' : 'Sign Animation'}</h4>

            {sequence.length > 0 ? (
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <img
                  key={currentIndex}
                  src={sequence[currentIndex].src}
                  alt="sign"
                  style={{ width: '120px', height: '120px' }}
                  onError={(e) => {
                    console.log('Missing:', sequence[currentIndex].src);
                  }}
                />
              </div>
            ) : (
              <div className="empty-output">
                {language === 'mr'
                  ? 'साइन येथे दिसेल...'
                  : 'Sign animation will appear here...'}
              </div>
            )}
          </div>

          {/* 🧠 DESCRIPTION */}
          <div className="sign-output">
            <h4>🧠 {language === 'mr' ? 'साइन गाइड' : 'Sign Guide'}</h4>

            {signDescription ? (
              <div className="sign-description">{signDescription}</div>
            ) : (
              <div className="empty-output">
                {language === 'mr'
                  ? 'मार्गदर्शन येथे दिसेल...'
                  : 'Guidance will appear here...'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextTranslator;