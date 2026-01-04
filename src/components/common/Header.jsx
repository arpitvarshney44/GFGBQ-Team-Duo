import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';
import { HiArrowLeft } from 'react-icons/hi2';
import { RiCoinsFill } from 'react-icons/ri';
import LanguageToggle from './LanguageToggle';

const Header = ({ title, showBack, onBack, showLang = true }) => {
  const { state } = useApp();
  const { language } = state;
  const [imgError, setImgError] = useState(false);

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
          imgError ? (
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <RiCoinsFill style={{ fontSize: '1.25rem', color: 'white' }} />
            </div>
          ) : (
            <img 
              src="/icons/logo.jpg" 
              alt="Nivesh Sathi" 
              onError={() => setImgError(true)}
              style={{ 
                height: '32px', 
                width: '32px', 
                borderRadius: '8px',
                objectFit: 'cover'
              }} 
            />
          )
        )}
        <h1 className="header-title">{title || t('appName', language)}</h1>
      </div>
      {showLang && <LanguageToggle />}
    </header>
  );
};

export default Header;
