import React from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';

const LessonCard = ({ lesson, isCompleted, onSelect }) => {
  const { state } = useApp();
  const { language } = state;

  return (
    <div 
      className="card fade-in" 
      onClick={onSelect}
      style={{ cursor: 'pointer' }}
    >
      <div className="flex items-center gap-12">
        <span className="icon-md">{lesson.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ 
            fontSize: '1rem', 
            fontWeight: '600',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {t(lesson.id, language)}
          </h3>
          {isCompleted && (
            <span className="text-success" style={{ fontSize: '0.75rem' }}>
              ✓ {t('completed', language)}
            </span>
          )}
        </div>
        <span style={{ 
          fontSize: '1.25rem', 
          color: isCompleted ? 'var(--success)' : 'var(--text-secondary)' 
        }}>
          {isCompleted ? '✓' : '→'}
        </span>
      </div>
    </div>
  );
};

export default LessonCard;
