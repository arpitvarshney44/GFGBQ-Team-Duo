import React from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';
import { HiSignal } from 'react-icons/hi2';

const OfflineBanner = () => {
  const { state } = useApp();
  const { isOnline, language } = state;

  if (isOnline) return null;

  return (
    <div className="offline-banner">
      <HiSignal style={{ fontSize: '1.25rem' }} />
      <span>{t('offlineMode', language)}</span>
    </div>
  );
};

export default OfflineBanner;
