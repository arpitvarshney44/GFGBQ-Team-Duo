import React from 'react';
import { useApp } from '../../context/AppContext';
import Header from '../common/Header';
import { HiCheckCircle } from 'react-icons/hi2';

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
      
      <div className="container page-content-no-nav">
        <div className="text-center mb-32 fade-in">
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            background: lesson.bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            margin: '0 auto',
            boxShadow: `0 10px 40px ${lesson.bg}`
          }}>
            {lesson.icon}
          </div>
        </div>
        
        {content.points.map((point, index) => (
          <div 
            key={index} 
            className="card fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex gap-12">
              <div style={{ 
                width: '32px', 
                height: '32px', 
                minWidth: '32px',
                borderRadius: '50%', 
                background: `linear-gradient(135deg, ${lesson.color} 0%, ${lesson.color}dd 100%)`,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.875rem',
                fontWeight: '700',
                boxShadow: `0 4px 14px ${lesson.bg}`
              }}>
                {index + 1}
              </div>
              <p style={{ fontSize: '0.9375rem', lineHeight: '1.7', color: 'var(--text)' }}>
                {point}
              </p>
            </div>
          </div>
        ))}
        
        <button 
          className="btn btn-success mt-32"
          onClick={onComplete}
        >
          <HiCheckCircle style={{ fontSize: '1.25rem' }} />
          {language === 'hi' ? 'समझ गया!' : 'Got it!'}
        </button>
      </div>
    </div>
  );
};

export default LessonContent;
