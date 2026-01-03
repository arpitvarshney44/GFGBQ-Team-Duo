import React from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';
import RiskBadge from '../common/RiskBadge';

const InvestmentCard = ({ option, onSelect }) => {
  const { state } = useApp();
  const { language } = state;

  return (
    <div 
      className="card fade-in" 
      onClick={() => onSelect(option)}
      style={{ cursor: 'pointer' }}
    >
      <div className="flex items-center gap-12 mb-8">
        <span className="icon-md">{option.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ 
            fontSize: '1rem', 
            fontWeight: '600',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {option.name[language]}
          </h3>
          <RiskBadge level={option.riskLevel} />
        </div>
        <span style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>→</span>
      </div>
      
      <p className="text-secondary" style={{ fontSize: '0.875rem', marginBottom: '0.75rem' }}>
        {option.description[language]}
      </p>
      
      <div className="flex justify-between" style={{ fontSize: '0.875rem' }}>
        <span>
          <span className="text-secondary">{t('expectedReturns', language)}: </span>
          <strong className="text-success">{option.expectedReturns}</strong>
        </span>
        <span className="text-secondary">
          Min ₹{option.minAmount}
        </span>
      </div>
    </div>
  );
};

export default InvestmentCard;
