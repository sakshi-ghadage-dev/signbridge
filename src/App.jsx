import React, { useState } from 'react';
import './App.css';

import Header from './components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';
import TranslatorSection from './components/TranslatorSection/TranslatorSection';
import SupportedGesturesSection from './components/SupportedGesturesSection/SupportedGesturesSection';
import ProblemSolutionSection from './components/ProblemSolutionSection/ProblemSolutionSection';
import FeaturesSection from './components/FeaturesSection/FeaturesSection';
import UseCasesSection from './components/UseCasesSection/UseCasesSection';
import Footer from './components/Footer/Footer';

function App() {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'mr' : 'en'));
  };

  return (
    <div className="app">
      <Header language={language} toggleLanguage={toggleLanguage} />

      <main>
        <HeroSection language={language} />
        <TranslatorSection language={language} />
        <SupportedGesturesSection language={language} />
        <ProblemSolutionSection language={language} />
        <FeaturesSection language={language} />
        <UseCasesSection language={language} />
      </main>

      <Footer language={language} />
    </div>
  );
}

export default App;