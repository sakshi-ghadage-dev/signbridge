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

  // 🔥 GIF PLAYER STATES
  const [sequence, setSequence] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const timeoutRef = useRef(null);

  // 🔥 AVAILABLE WORD GIFS
  const wordGifs = [
    'hello',
    'help',
    'thankyou',
    'good',
    'morning',
    'night',
    'yes',
    'no',
    'love',
  ];

  /////////////////////////
  // 🔄 TRANSLATE + GENERATE SEQUENCE
  /////////////////////////
  const handleTranslate = () => {
    if (!inputText.trim()) return;

    const sanitizedInput = inputText.trim();
    const hasDevanagari = /[\u0900-\u097F]/.test(sanitizedInput);
    const sourceLang = inputLanguage === 'mr' || hasDevanagari ? 'mr' : 'en';

    // 🔤 UI Translation & Description
    const translated =
      sourceLang === 'en'
        ? translateToMarathi(sanitizedInput)
        : translateToEnglish(sanitizedInput);

    setTranslatedText(translated);
    setSignDescription(getSignDescription(sourceLang === 'mr' ? translated : sanitizedInput));

    // 🔄 RESET PLAYER
    clearTimeout(timeoutRef.current);
    setCurrentIndex(0);

    let processingText = sanitizedInput;

    // 🔥 MARATHI INPUT HANDLING
    if (sourceLang === 'mr') {
      const eng = translateToEnglish(sanitizedInput);
      console.log('Detected Marathi input, translation candidate:', eng);

      if (eng && /[a-zA-Z]/.test(eng) && eng.toLowerCase() !== sanitizedInput.toLowerCase()) {
        processingText = eng;
      } else {
        // 🔥 FALLBACK MANUAL MAP
        const fallbackMap = {
          नमस्कार: 'hello',
          मदत: 'help',
          धन्यवाद: 'thankyou',
          शुभ: 'good',
          सकाळ: 'morning',
          रात्र: 'night',
          हो: 'yes',
          नाही: 'no',
          प्रेम: 'love',
        };

        const words = sanitizedInput.split(/\s+/).map((w) => w.trim()).filter(Boolean);
        const mappedWords = words.map((w) => fallbackMap[w]).filter(Boolean);

        if (mappedWords.length > 0) {
          processingText = mappedWords.join(' ');
          console.log('Using fallback mapping:', processingText);
        } else if (eng && /[a-zA-Z]/.test(eng)) {
          processingText = eng;
        } else {
          processingText = 'hello';
        }
      }
    }

    console.log('Final Processing Text:', processingText);

    // 🔥 CLEAN TEXT
    const clean = processingText.toLowerCase().replace(/[^a-z0-9 ]/g, '');

    let result = [];

    // Check if entire phrase (without spaces) is a single word GIF
    const noSpace = clean.replace(/\s+/g, '');
    let words;
    if (wordGifs.includes(noSpace)) {
      words = [noSpace];
    } else {
      words = clean.split(' ').map((w) => w.trim()).filter((w) => w.length > 0);
    }

    words.forEach((word, index) => {
      if (!word) return;

      // ✅ WORD GIF EXISTS
      if (wordGifs.includes(word)) {
        result.push({
          value: word,
          src: `/sign/${word}.gif`,
        });
      } else {
        // 🔁 FALLBACK TO LETTERS
        word.split('').forEach((char) => {
          result.push({
            value: char,
            src: `/sign/${char}.gif`,
          });
        });
      }

      // ⏸️ ADD PAUSE BETWEEN WORDS (except last)
      if (index !== words.length - 1) {
        result.push({
          value: 'pause',
          src: null,
        });
      }
    });

    console.log('Generated Sequence:', result);

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
      }, 1500);
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
        {/* INPUT SECTION */}
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

        {/* OUTPUT SECTION */}
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
                {sequence[currentIndex].src ? (
                  <img
                    key={currentIndex}
                    src={sequence[currentIndex].src}
                    alt="sign"
                    style={{ width: '120px', height: '120px' }}
                    onError={() =>
                      console.log('Missing:', sequence[currentIndex].src)
                    }
                  />
                ) : (
                  <div style={{ height: '120px' }}></div> // ⏸️ pause space
                )}
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