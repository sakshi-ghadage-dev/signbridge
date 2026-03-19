import React, { useState } from 'react';
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

  const handleTranslate = () => {
    if (!inputText.trim()) return;

    const translated =
      inputLanguage === 'en'
        ? translateToMarathi(inputText)
        : translateToEnglish(inputText);

    setTranslatedText(translated);
    setSignDescription(getSignDescription(inputText));
  };

  const handleClear = () => {
    setInputText('');
    setTranslatedText('');
    setSignDescription('');
  };

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
            <button className="btn btn-primary" onClick={handleTranslate} disabled={!inputText.trim()}>
              🔄 {language === 'mr' ? 'अनुवाद' : 'Translate'}
            </button>
            <button className="btn btn-secondary" onClick={handleClear}>
              {language === 'mr' ? 'साफ करा' : 'Clear'}
            </button>
          </div>
        </div>

        <div className="output-section">
          <div className="translation-output">
            <div className="output-header-row">
              <h4>{language === 'mr' ? 'अनुवाद' : 'Translation'}</h4>
              {translatedText && (
                <button
                  className="mini-action-btn"
                  onClick={() =>
                    speakText(translatedText, inputLanguage === 'en' ? 'mr-IN' : 'en-US')
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

          <div className="sign-output">
            <h4>👋 {language === 'mr' ? 'साइन गाइड' : 'Sign Language Guide'}</h4>
            {signDescription ? (
              <div className="sign-description">{signDescription}</div>
            ) : (
              <div className="empty-output">
                {language === 'mr'
                  ? 'साइन मार्गदर्शन येथे दिसेल...'
                  : 'Sign guidance will appear here...'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextTranslator;