import React from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';

const Loader = ({ message }) => {
  const { state } = useApp();
  const { language } = state;

  return (
    <div className="flex flex-col items-center" style={{ padding: '48px 16px' }}>
      <div className="pulse" style={{ fontSize: '48px', marginBottom: '16px' }}>
        💰
      </div>
      <p className="text-secondary">{message || t('loading', language)}</p>
    </div>
  );
};

export default Loader;
