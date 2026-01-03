import React from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';
import { HiArrowRight, HiCheckCircle } from 'react-icons/hi2';

const LessonCard = ({ lesson, isCompleted, onSelect, index = 0 }) => {
  const { state } = useApp();
  const { language } = state;

  return (
    <div 
      className="card card-interactive fade-in" 
      onClick={onSelect}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-center gap-12">
        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: '14px',
          background: lesson.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          flexShrink: 0,
          position: 'relative'
        }}>
          {lesson.icon}
          {isCompleted && (
            <div style={{
              position: 'absolute',
              bottom: '-4px',
              right: '-4px',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: 'var(--success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid white'
            }}>
              <HiCheckCircle style={{ fontSize: '0.875rem', color: 'white' }} />
            </div>
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ 
            fontSize: '1rem', 
            fontWeight: '700',
            marginBottom: '0.25rem'
          }}>
            {t(lesson.id, language)}
          </h3>
          {isCompleted ? (
            <span className="text-success" style={{ fontSize: '0.75rem', fontWeight: '600' }}>
              ✓ {t('completed', language)}
            </span>
          ) : (
            <span className="text-secondary" style={{ fontSize: '0.75rem' }}>
              {language === 'hi' ? 'टैप करके सीखें' : 'Tap to learn'}
            </span>
          )}
        </div>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: isCompleted ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {isCompleted ? (
            <HiCheckCircle style={{ fontSize: '1.25rem', color: 'var(--success)' }} />
          ) : (
            <HiArrowRight style={{ fontSize: '1rem', color: 'var(--text-secondary)' }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
