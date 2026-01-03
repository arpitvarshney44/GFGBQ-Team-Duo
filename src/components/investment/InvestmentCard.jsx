import React from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';
import RiskBadge from '../common/RiskBadge';
import { HiArrowRight, HiArrowTrendingUp } from 'react-icons/hi2';
import { RiGovernmentFill, RiBankFill, RiCalendarFill, RiLineChartFill } from 'react-icons/ri';

const iconMap = {
  'govt-bonds': { icon: RiGovernmentFill, color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
  'fixed-deposit': { icon: RiBankFill, color: '#6366f1', bg: 'rgba(99, 102, 241, 0.1)' },
  'recurring-deposit': { icon: RiCalendarFill, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
  'mutual-fund-low': { icon: RiLineChartFill, color: '#ec4899', bg: 'rgba(236, 72, 153, 0.1)' }
};

const InvestmentCard = ({ option, onSelect, index = 0 }) => {
  const { state } = useApp();
  const { language } = state;

  const iconConfig = iconMap[option.id] || iconMap['govt-bonds'];
  const Icon = iconConfig.icon;

  return (
    <div 
      className="card card-interactive fade-in" 
      onClick={() => onSelect(option)}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-center gap-12 mb-12">
        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: '14px',
          background: iconConfig.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <Icon style={{ fontSize: '1.5rem', color: iconConfig.color }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ 
            fontSize: '1rem', 
            fontWeight: '700',
            marginBottom: '0.25rem'
          }}>
            {option.name[language]}
          </h3>
          <RiskBadge level={option.riskLevel} />
        </div>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: 'var(--bg-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <HiArrowRight style={{ fontSize: '1rem', color: 'var(--text-secondary)' }} />
        </div>
      </div>
      
      <p className="text-secondary" style={{ fontSize: '0.875rem', marginBottom: '1rem', lineHeight: '1.5' }}>
        {option.description[language]}
      </p>
      
      <div className="flex justify-between items-center" style={{ 
        padding: '0.75rem',
        background: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-sm)'
      }}>
        <div className="flex items-center gap-8">
          <HiArrowTrendingUp style={{ color: 'var(--success)' }} />
          <span style={{ fontSize: '0.875rem' }}>
            <span className="text-secondary">{language === 'hi' ? 'रिटर्न' : 'Returns'}: </span>
            <strong className="text-success">{option.expectedReturns}</strong>
          </span>
        </div>
        <span className="text-secondary" style={{ fontSize: '0.875rem' }}>
          Min ₹{option.minAmount}
        </span>
      </div>
    </div>
  );
};

export default InvestmentCard;
