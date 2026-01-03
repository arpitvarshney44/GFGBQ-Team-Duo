import React from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';

const OfflineBanner = () => {
  const { state } = useApp();
  const { isOnline, language } = state;

  if (isOnline) return null;

  return (
    <div className="offline-banner">
      📡 {t('offlineMode', language)} - {t('offlineMessage', language)}
    </div>
  );
};

export default OfflineBanner;
