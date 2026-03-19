import React from 'react';
import './ProblemSolutionSection.css';

function ProblemSolutionSection({ language }) {
  return (
    <section className="problem-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            {language === 'mr' ? 'समस्या आणि उपाय' : 'Problem & Solution'}
          </h2>
          <p className="section-subtitle">
            {language === 'mr'
              ? 'हा प्रकल्प का महत्त्वाचा आहे'
              : 'Why this project matters'}
          </p>
        </div>

        <div className="problem-grid">
          <div className="problem-card">
            <h3>{language === 'mr' ? 'समस्या' : 'The Problem'}</h3>
            <p>
              {language === 'mr'
                ? 'भारतातील अनेक लोकांना भारतीय सांकेतिक भाषा समजत नाही, त्यामुळे दैनंदिन संवादात अडथळे निर्माण होतात.'
                : 'Many people in India do not understand Indian Sign Language, which creates communication barriers in daily life.'}
            </p>
          </div>

          <div className="problem-card highlight">
            <h3>{language === 'mr' ? 'उपाय' : 'Our Solution'}</h3>
            <p>
              {language === 'mr'
                ? 'SignBridge हे browser-based AI साधन आहे जे जेश्चर ओळखून त्याचे त्वरित मजकूर आणि आवाजात रूपांतर करते.'
                : 'SignBridge is a browser-based AI tool that detects gestures and instantly converts them into text and speech.'}
            </p>
          </div>

          <div className="problem-card">
            <h3>{language === 'mr' ? 'का चांगले?' : 'Why Better?'}</h3>
            <p>
              {language === 'mr'
                ? 'हे lightweight आहे, backend शिवाय चालते, आणि विशेषतः ISL वापरासाठी डिझाइन केलेले आहे.'
                : 'It is lightweight, works without a backend, and is designed specifically for ISL use cases.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProblemSolutionSection;