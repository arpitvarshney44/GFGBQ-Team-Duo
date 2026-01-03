import React from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';

const Loader = ({ message }) => {
  const { state } = useApp();
  const { language } = state;

  return (
    <div className="loader-container">
      <div className="loader-dots">
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
      </div>
      <p className="text-secondary font-medium">
        {message || t('loading', language)}
      </p>
    </div>
  );
};

export default Loader;
