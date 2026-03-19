import React from 'react';
import './UseCasesSection.css';

function UseCasesSection({ language }) {
  const useCases = [
    {
      icon: '🏫',
      title: language === 'mr' ? 'शाळा आणि शिक्षण' : 'School desk',
      description:
        language === 'mr'
          ? 'विद्यार्थी सामान्य गरजा साइन करू शकतात आणि शिक्षकांना त्वरित मजकूर दिसतो.'
          : 'Students can sign common needs while teachers see instant text on screen.',
    },
    {
      icon: '🏥',
      title: language === 'mr' ? 'रुग्णालय रिसेप्शन' : 'Hospital reception',
      description:
        language === 'mr'
          ? 'अपॉइंटमेंट, मदत आणि औषध समर्थनासाठी अधिक जलद संवाद.'
          : 'Faster communication for appointments, help requests, and medicine support.',
    },
    {
      icon: '🏛️',
      title: language === 'mr' ? 'सार्वजनिक सेवा' : 'Public services',
      description:
        language === 'mr'
          ? 'वाहतूक, कार्यालये आणि समुदाय सेवांसाठी अधिक समावेशक काउंटर.'
          : 'Inclusive counters for transport, offices, and community centres.',
    },
  ];

  return (
    <section className="usecases-section" id="usecases">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{language === 'mr' ? 'वापर क्षेत्रे' : 'Use Cases'}</h2>
          <p className="section-subtitle">
            {language === 'mr'
              ? 'प्रत्यक्ष जीवनातील संवाद परिस्थिती'
              : 'Practical for real-world communication moments'}
          </p>
          <p className="section-description">
            {language === 'mr'
              ? 'वर्गखोल्या, रुग्णालये, NGOs आणि सार्वजनिक सेवांसाठी उपयुक्त उत्पादन.'
              : 'Pitch a product that fits classrooms, hospitals, NGOs, and public-facing services.'}
          </p>
        </div>

        <div className="usecases-grid">
          {useCases.map((useCase, index) => (
            <div className="usecase-card" key={index}>
              <div className="usecase-icon">{useCase.icon}</div>
              <h3 className="usecase-title">{useCase.title}</h3>
              <p className="usecase-description">{useCase.description}</p>
            </div>
          ))}
        </div>

        <div className="cta-section">
          <div className="cta-card">
            <h3>
              {language === 'mr'
                ? 'संवादातील दरी कमी करण्यासाठी तयार आहात?'
                : 'Ready to bridge communication gaps?'}
            </h3>
            <p>
              {language === 'mr'
                ? 'आमचा लाइव्ह डेमो वापरून प्रवेशयोग्य संवादाचा अनुभव घ्या.'
                : 'Try our live demo and experience the future of accessible communication.'}
            </p>
            <a href="#demo" className="btn btn-primary">
              {language === 'mr' ? 'आता डेमो वापरा →' : 'Try Demo Now →'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UseCasesSection;