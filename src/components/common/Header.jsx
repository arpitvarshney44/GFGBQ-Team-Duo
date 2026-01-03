import React from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';
import { HiArrowLeft } from 'react-icons/hi2';
import LanguageToggle from './LanguageToggle';

const Header = ({ title, showBack, onBack, showLang = true }) => {
  const { state } = useApp();
  const { language } = state;

  return (
    <header className="header">
      <div className="header-left">
        {showBack && (
          <button 
            onClick={onBack} 
            className="back-btn"
            aria-label={t('back', language)}
          >
            <HiArrowLeft />
          </button>
        )}
        {!showBack && (
          <img 
            src="/icons/logo.jpg" 
            alt="Nivesh Sathi" 
            style={{ 
              height: '32px', 
              width: '32px', 
              borderRadius: '8px',
              objectFit: 'cover'
            }} 
          />
        )}
        <h1 className="header-title">{title || t('appName', language)}</h1>
      </div>
      {showLang && <LanguageToggle />}
    </header>
  );
};

export default Header;
