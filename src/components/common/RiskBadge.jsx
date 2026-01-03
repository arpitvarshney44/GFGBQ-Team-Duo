import React from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';

const RiskBadge = ({ level }) => {
  const { state } = useApp();
  const { language } = state;

  const config = {
    low: { icon: '🛡️', class: 'risk-low' },
    medium: { icon: '⚖️', class: 'risk-medium' },
    high: { icon: '⚡', class: 'risk-high' }
  };

  const { icon, class: className } = config[level] || config.low;

  return (
    <span className={`risk-badge ${className}`}>
      {icon} {t(level, language)}
    </span>
  );
};

export default RiskBadge;
