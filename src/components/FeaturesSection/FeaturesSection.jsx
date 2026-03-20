import React from 'react';
import './FeaturesSection.css';
import { useScrollAnimation, useStaggerAnimation } from '../../utils/useScrollAnimation';

function FeaturesSection({ language }) {
  const features = [
    {
      icon: '⚡',
      title: language === 'mr' ? 'रिअल-टाइम' : 'Real-time',
      subtitle: language === 'mr' ? 'Sign to text / speech' : 'Sign to text / speech',
      description:
        language === 'mr'
          ? 'हातवारे ओळखून शिक्षक, रुग्णालय आणि सेवा काउंटरसाठी त्वरित आउटपुट.'
          : 'Recognize gestures instantly and show clear outputs for schools, hospitals, and service counters.',
    },
    {
      icon: '🔁',
      title: language === 'mr' ? 'दोन-मार्गी' : 'Two-way',
      subtitle: language === 'mr' ? 'Text to sign guidance' : 'Text to sign guidance',
      description:
        language === 'mr'
          ? 'हियरिंग वापरकर्त्यांना साइन मार्गदर्शक व सोप्या संवादाद्वारे प्रतिसाद देण्यास मदत.'
          : 'Helps hearing users reply clearly with sign guidance and simple phrase-based interaction.',
    },
    {
      icon: '🌍',
      title: language === 'mr' ? 'द्विभाषिक' : 'Bilingual',
      subtitle: language === 'mr' ? 'मराठी + इंग्रजी' : 'Marathi + English support',
      description:
        language === 'mr'
          ? 'घर, शाळा आणि स्थानिक संस्थांमधील दैनंदिन संवादासाठी.'
          : 'Built for daily communication in homes, schools, and local institutions.',
    },
    {
      icon: '🖐️',
      title: language === 'mr' ? 'ISL आधारित' : 'ISL Based',
      subtitle: language === 'mr' ? 'भारतीय सांकेतिक भाषा' : 'Indian Sign Language',
      description:
        language === 'mr'
          ? 'स्थानिक वापरासाठी ISL जेश्चरवर आधारित डिझाइन.'
          : 'Designed specifically for Indian Sign Language, not generic ASL models.',
    },
  ];

  const headerRef = useScrollAnimation('animate-in', 0.2);
  const gridRef = useStaggerAnimation(0.1);

  return (
    <section className="features-section" id="features">
      <div className="container">
        <div className="section-header reveal" ref={headerRef}>
          <h2 className="section-title">
            {language === 'mr' ? 'मुख्य वैशिष्ट्ये' : 'Core Features'}
          </h2>

          <p className="section-subtitle">
            {language === 'mr'
              ? 'संपूर्ण संवाद प्रवास एका ॲपमध्ये'
              : 'A clear product flow for every kind of user'}
          </p>

          <p className="section-description">
            {language === 'mr'
              ? 'इनपुट, AI समज, अनुवाद आणि प्रतिसाद या सर्व टप्प्यांसह एक सुस्पष्ट वेब अनुभव.'
              : 'Show the full communication journey in one polished web app — input, AI understanding, translation, and response.'}
          </p>
        </div>

        <div className="features-grid" ref={gridRef}>
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{feature.icon}</div>

              <div className="feature-content">
                <div className="feature-title">{feature.title}</div>
                <div className="feature-subtitle">{feature.subtitle}</div>
                <p className="feature-description">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;

