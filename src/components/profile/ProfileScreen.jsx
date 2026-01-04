import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';
import Header from '../common/Header';
import LanguageToggle from '../common/LanguageToggle';
import TrustBadges from '../common/TrustBadges';
import { HiUser, HiArrowRightOnRectangle, HiLanguage, HiCurrencyRupee, HiAcademicCap, HiHeart, HiCalendar } from 'react-icons/hi2';

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
        <div className="card text-center" style={{ 
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
          color: 'white',
          border: 'none'
        }}>
          <div style={{ 
            width: '80px', 
            height: '80px', 
            borderRadius: '50%', 
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            fontSize: '2rem',
            fontWeight: '700'
          }}>
            {user?.name ? user.name.charAt(0).toUpperCase() : <HiUser style={{ fontSize: '2.5rem' }} />}
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.25rem' }}>
            {user?.name || (language === 'hi' ? 'निवेशक' : 'Investor')}
          </h2>
          <p style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.25rem' }}>
            +91 {user?.mobile}
          </p>
          {user?.age && (
            <p style={{ fontSize: '0.75rem', opacity: 0.7, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
              <HiCalendar />
              {user.age} {language === 'hi' ? 'वर्ष' : 'years'}
            </p>
          )}
        </div>
        
        {/* Stats */}
        <div className="grid-2">
          <div className="card text-center" style={{ marginBottom: 0 }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(129, 140, 248, 0.1) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0.5rem'
            }}>
              <HiCurrencyRupee style={{ fontSize: '1.25rem', color: 'var(--primary)' }} />
            </div>
            <p className="text-secondary" style={{ fontSize: '0.75rem' }}>
              {t('totalInvested', language)}
            </p>
            <p style={{ fontSize: '1.25rem', fontWeight: '800' }}>
              ₹{totalInvested.toLocaleString('en-IN')}
            </p>
          </div>
          <div className="card text-center" style={{ marginBottom: 0 }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(52, 211, 153, 0.1) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0.5rem'
            }}>
              <HiAcademicCap style={{ fontSize: '1.25rem', color: 'var(--success)' }} />
            </div>
            <p className="text-secondary" style={{ fontSize: '0.75rem' }}>
              {language === 'hi' ? 'पाठ पूर्ण' : 'Lessons Done'}
            </p>
            <p style={{ fontSize: '1.25rem', fontWeight: '800' }}>
              {lessonsCompleted}/4
            </p>
          </div>
        </div>
        
        {/* Language Setting */}
        <div className="card mt-16">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-12">
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'var(--bg-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <HiLanguage style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }} />
              </div>
              <span style={{ fontSize: '0.9375rem', fontWeight: '600' }}>
                {language === 'hi' ? 'भाषा' : 'Language'}
              </span>
            </div>
            <LanguageToggle />
          </div>
        </div>
        
        {/* Trust Badges */}
        <TrustBadges />
        
        {/* Logout */}
        <button 
          className="btn btn-secondary mt-16"
          onClick={handleLogout}
          style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}
        >
          <HiArrowRightOnRectangle />
          {language === 'hi' ? 'लॉगआउट' : 'Logout'}
        </button>
        
        {/* App Info */}
        <div className="text-center mt-32">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>
              Made with
            </span>
            <HiHeart style={{ fontSize: '0.875rem', color: 'var(--danger)' }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>
              in India
            </span>
          </div>
          <p className="text-light" style={{ fontSize: '0.75rem' }}>
            Nivesh Sathi v1.0.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
