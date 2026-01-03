import React from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';

const TrustBadges = () => {
  const { state } = useApp();
  const { language } = state;

  const badges = [
    { icon: '🔒', label: t('secureInvestment', language) },
    { icon: '🏛️', label: t('rbiRegulated', language) },
    { icon: '✓', label: t('sebiRegistered', language) },
    { icon: '💯', label: t('noHiddenFees', language) }
  ];

  return (
    <div className="trust-badges">
      {badges.map((badge, index) => (
        <div key={index} className="trust-badge">
          <span>{badge.icon}</span>
          <span>{badge.label}</span>
        </div>
      ))}
    </div>
  );
};

export default TrustBadges;
