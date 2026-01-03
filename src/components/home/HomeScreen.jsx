import React from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';
import Header from '../common/Header';
import TrustBadges from '../common/TrustBadges';

const HomeScreen = ({ onInvest, onLearn }) => {
  const { state } = useApp();
  const { language, portfolio, learningProgress } = state;

  const totalInvested = portfolio.reduce((sum, inv) => sum + inv.amount, 0);
  const lessonsCompleted = Object.values(learningProgress).filter(Boolean).length;
  const hasCompletedBasics = lessonsCompleted >= 2;

  return (
    <div>
      <Header />
      
      <div className="container page-content">
        {/* Welcome Banner */}
        <div className="card fade-in" style={{ 
          background: 'linear-gradient(135deg, #1a73e8, #1557b0)', 
          color: 'white'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
            {language === 'hi' ? 'नमस्ते! 🙏' : 'Hello! 🙏'}
          </h2>
          <p style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '1rem' }}>
            {t('tagline', language)}
          </p>
          
          <button 
            className="btn"
            onClick={onInvest}
            style={{ 
              background: 'white', 
              color: 'var(--primary)',
              fontWeight: '700'
            }}
          >
            {t('investNow', language)} →
          </button>
        </div>
        
        {/* Quick Stats */}
        {totalInvested > 0 && (
          <div className="card fade-in">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-secondary" style={{ fontSize: '0.75rem' }}>
                  {t('totalInvested', language)}
                </p>
                <p style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                  ₹{totalInvested.toLocaleString('en-IN')}
                </p>
              </div>
              <span className="icon-lg">💰</span>
            </div>
          </div>
        )}
        
        {/* Learn Before Invest */}
        {!hasCompletedBasics && (
          <div className="card fade-in" style={{ background: '#fef7e0' }}>
            <div className="flex items-center gap-12 mb-8">
              <span className="icon-md">📚</span>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>
                  {language === 'hi' ? 'पहले सीखें, फिर निवेश करें' : 'Learn before you invest'}
                </h3>
                <p className="text-secondary" style={{ fontSize: '0.875rem' }}>
                  {lessonsCompleted}/4 {language === 'hi' ? 'पाठ पूर्ण' : 'lessons completed'}
                </p>
              </div>
            </div>
            <button className="btn btn-secondary" onClick={onLearn}>
              {t('learnToInvest', language)} →
            </button>
          </div>
        )}
        
        {/* Quick Actions */}
        <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', marginTop: '0.5rem' }}>
          {language === 'hi' ? 'जल्दी शुरू करें' : 'Quick Start'}
        </h3>
        
        <div className="grid-2">
          <div 
            className="card text-center" 
            style={{ cursor: 'pointer', marginBottom: 0 }}
            onClick={onInvest}
          >
            <span className="icon-md">🏛️</span>
            <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
              {t('govtBonds', language)}
            </p>
            <p className="text-success" style={{ fontSize: '0.75rem' }}>
              {t('low', language)} {t('riskLevel', language)}
            </p>
          </div>
          <div 
            className="card text-center" 
            style={{ cursor: 'pointer', marginBottom: 0 }}
            onClick={onInvest}
          >
            <span className="icon-md">🏦</span>
            <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
              {t('fixedDeposits', language)}
            </p>
            <p className="text-success" style={{ fontSize: '0.75rem' }}>
              {t('low', language)} {t('riskLevel', language)}
            </p>
          </div>
        </div>
        
        {/* Why Invest Card */}
        <div className="card fade-in mt-16">
          <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem' }}>
            {language === 'hi' ? '₹10 से शुरू क्यों करें?' : 'Why start with ₹10?'}
          </h3>
          <ul style={{ fontSize: '0.875rem', paddingLeft: '1.25rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>
              {language === 'hi' 
                ? '✓ कोई बड़ी राशि की जरूरत नहीं' 
                : '✓ No big amount needed'}
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              {language === 'hi' 
                ? '✓ सीखते हुए निवेश करें' 
                : '✓ Learn while investing'}
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              {language === 'hi' 
                ? '✓ धीरे-धीरे आत्मविश्वास बढ़ाएं' 
                : '✓ Build confidence gradually'}
            </li>
            <li>
              {language === 'hi' 
                ? '✓ छोटी बचत, बड़े सपने' 
                : '✓ Small savings, big dreams'}
            </li>
          </ul>
        </div>
        
        {/* Trust Badges */}
        <TrustBadges />
      </div>
    </div>
  );
};

export default HomeScreen;
