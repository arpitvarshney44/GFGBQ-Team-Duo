import React from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';
import { HiShieldCheck, HiScale, HiBolt } from 'react-icons/hi2';

const RiskBadge = ({ level }) => {
  const { state } = useApp();
  const { language } = state;

  const config = {
    low: { icon: HiShieldCheck, class: 'risk-low' },
    medium: { icon: HiScale, class: 'risk-medium' },
    high: { icon: HiBolt, class: 'risk-high' }
  };

  const { icon: Icon, class: className } = config[level] || config.low;

  return (
    <span className={`risk-badge ${className}`}>
      <Icon style={{ fontSize: '0.875rem' }} />
      {t(level, language)}
    </span>
  );
};

export default RiskBadge;
