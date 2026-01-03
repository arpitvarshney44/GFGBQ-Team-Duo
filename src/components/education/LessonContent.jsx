import React from 'react';
import { useApp } from '../../context/AppContext';
import Header from '../common/Header';

const LessonContent = ({ lesson, onComplete, onBack }) => {
  const { state } = useApp();
  const { language } = state;

  const content = lesson.content[language];

  return (
    <div className="full-screen">
      <Header 
        title={content.title}
        showBack
        onBack={onBack}
      />
      
      <div className="container page-content-no-nav fade-in">
        <div className="text-center mb-24">
          <span className="icon-lg">{lesson.icon}</span>
        </div>
        
        {content.points.map((point, index) => (
          <div key={index} className="card">
            <div className="flex gap-12">
              <span style={{ 
                width: '1.75rem', 
                height: '1.75rem', 
                minWidth: '1.75rem',
                borderRadius: '50%', 
                background: 'var(--primary)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                {index + 1}
              </span>
              <p style={{ fontSize: '0.9375rem', lineHeight: '1.6' }}>{point}</p>
            </div>
          </div>
        ))}
        
        <button 
          className="btn btn-success mt-24"
          onClick={onComplete}
        >
          ✓ {language === 'hi' ? 'समझ गया!' : 'Got it!'}
        </button>
      </div>
    </div>
  );
};

export default LessonContent;
