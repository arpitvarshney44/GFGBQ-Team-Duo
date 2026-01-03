import React from 'react';
import { useApp } from '../../context/AppContext';

const LanguageToggle = () => {
  const { state, dispatch } = useApp();
  const { language } = state;

  const toggleLanguage = (lang) => {
    dispatch({ type: 'SET_LANGUAGE', payload: lang });
  };

  return (
    <div className="lang-toggle">
      <button
        className={`lang-btn ${language === 'en' ? 'active' : ''}`}
        onClick={() => toggleLanguage('en')}
      >
        EN
      </button>
      <button
        className={`lang-btn ${language === 'hi' ? 'active' : ''}`}
        onClick={() => toggleLanguage('hi')}
      >
        हिं
      </button>
    </div>
  );
};

export default LanguageToggle;
