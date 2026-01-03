import React from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';
import { HiLockClosed, HiBuildingLibrary, HiCheckBadge, HiCurrencyRupee } from 'react-icons/hi2';

const TrustBadges = () => {
  const { state } = useApp();
  const { language } = state;

  const badges = [
    { icon: HiLockClosed, label: t('secureInvestment', language), color: '#6366f1' },
    { icon: HiBuildingLibrary, label: t('rbiRegulated', language), color: '#10b981' },
    { icon: HiCheckBadge, label: t('sebiRegistered', language), color: '#f59e0b' },
    { icon: HiCurrencyRupee, label: t('noHiddenFees', language), color: '#ec4899' }
  ];

  return (
    <div className="trust-badges">
      {badges.map((badge, index) => (
        <div 
          key={index} 
          className="trust-badge fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <badge.icon className="trust-badge-icon" style={{ color: badge.color }} />
          <span>{badge.label}</span>
        </div>
      ))}
    </div>
  );
};

export default TrustBadges;
