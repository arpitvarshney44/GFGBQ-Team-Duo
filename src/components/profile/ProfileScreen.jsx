import React from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';
import Header from '../common/Header';
import LanguageToggle from '../common/LanguageToggle';
import TrustBadges from '../common/TrustBadges';

const ProfileScreen = ({ onBack }) => {
  const { state, dispatch } = useApp();
  const { language, user, portfolio, learningProgress } = state;

  const totalInvested = portfolio.reduce((sum, inv) => sum + inv.amount, 0);
  const lessonsCompleted = Object.values(learningProgress).filter(Boolean).length;

  const handleLogout = () => {
    if (confirm(language === 'hi' ? 'क्या आप लॉगआउट करना चाहते हैं?' : 'Are you sure you want to logout?')) {
      dispatch({ type: 'LOGOUT' });
    }
  };

  return (
    <div>
      <Header 
        title={t('profile', language)} 
        showBack={!!onBack}
        onBack={onBack}
      />
      
      <div className="container page-content fade-in">
        {/* User Info */}
        <div className="card text-center">
          <div style={{ 
            width: '4rem', 
            height: '4rem', 
            borderRadius: '50%', 
            background: 'var(--primary)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            margin: '0 auto 0.75rem'
          }}>
            👤
          </div>
          <h2 style={{ fontSize: '1.125rem', fontWeight: '600' }}>
            +91 {user?.mobile}
          </h2>
          <p className="text-secondary" style={{ fontSize: '0.875rem' }}>
            {language === 'hi' ? 'सदस्य' : 'Member'}
          </p>
        </div>
        
        {/* Stats */}
        <div className="grid-2">
          <div className="card text-center" style={{ marginBottom: 0 }}>
            <p className="text-secondary" style={{ fontSize: '0.75rem' }}>
              {t('totalInvested', language)}
            </p>
            <p style={{ fontSize: '1.25rem', fontWeight: '700' }}>
              ₹{totalInvested.toLocaleString('en-IN')}
            </p>
          </div>
          <div className="card text-center" style={{ marginBottom: 0 }}>
            <p className="text-secondary" style={{ fontSize: '0.75rem' }}>
              {language === 'hi' ? 'पाठ पूर्ण' : 'Lessons Done'}
            </p>
            <p style={{ fontSize: '1.25rem', fontWeight: '700' }}>
              {lessonsCompleted}/4
            </p>
          </div>
        </div>
        
        {/* Language Setting */}
        <div className="card mt-16">
          <div className="flex justify-between items-center">
            <span style={{ fontSize: '0.9375rem' }}>
              {language === 'hi' ? 'भाषा' : 'Language'}
            </span>
            <LanguageToggle />
          </div>
        </div>
        
        {/* Trust Badges */}
        <TrustBadges />
        
        {/* Logout */}
        <button 
          className="btn btn-secondary mt-16"
          onClick={handleLogout}
          style={{ color: 'var(--danger)' }}
        >
          {language === 'hi' ? 'लॉगआउट' : 'Logout'}
        </button>
        
        {/* App Info */}
        <div className="text-center mt-24">
          <p className="text-secondary" style={{ fontSize: '0.75rem' }}>
            Nivesh Sathi v1.0.0
          </p>
          <p className="text-secondary" style={{ fontSize: '0.75rem' }}>
            {language === 'hi' 
              ? 'हर भारतीय के लिए निवेश को आसान बनाना' 
              : 'Making investing easy for every Indian'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
