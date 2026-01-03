import React from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';
import Header from '../common/Header';
import TrustBadges from '../common/TrustBadges';
import { HiArrowRight, HiSparkles, HiAcademicCap, HiChartBar, HiCurrencyRupee } from 'react-icons/hi2';
import { RiBankFill, RiGovernmentFill, RiLineChartFill, RiWallet3Fill } from 'react-icons/ri';

const HomeScreen = ({ onInvest, onLearn }) => {
  const { state } = useApp();
  const { language, portfolio, learningProgress } = state;

  const totalInvested = portfolio.reduce((sum, inv) => sum + inv.amount, 0);
  const currentValue = Math.round(totalInvested * 1.02);
  const lessonsCompleted = Object.values(learningProgress).filter(Boolean).length;
  const hasCompletedBasics = lessonsCompleted >= 2;

  return (
    <div>
      <Header />
      
      <div className="container page-content">
        {/* Hero Card */}
        <div 
          className="card card-gradient fade-in-up" 
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-30px',
            left: '-30px',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)'
          }} />
          
          <div className="flex items-center gap-8 mb-8">
            <HiSparkles style={{ fontSize: '1.25rem' }} />
            <span style={{ fontSize: '0.875rem', fontWeight: '600', opacity: 0.9 }}>
              {language === 'hi' ? 'आज ही शुरू करें' : 'Start Today'}
            </span>
          </div>
          
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>
            {language === 'hi' ? 'नमस्ते! 🙏' : 'Hello! 🙏'}
          </h2>
          <p style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '1.25rem' }}>
            {t('tagline', language)}
          </p>
          
          <button 
            className="btn"
            onClick={onInvest}
            style={{ 
              background: 'white', 
              color: 'var(--primary)',
              fontWeight: '700',
              boxShadow: '0 4px 14px rgba(0,0,0,0.1)'
            }}
          >
            {t('investNow', language)}
            <HiArrowRight />
          </button>
        </div>
        
        {/* Portfolio Summary */}
        {totalInvested > 0 && (
          <div className="card fade-in stagger-1">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-secondary" style={{ fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                  {t('currentValue', language)}
                </p>
                <p style={{ fontSize: '1.75rem', fontWeight: '800' }}>
                  ₹{currentValue.toLocaleString('en-IN')}
                </p>
                <p className="text-success" style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                  +₹{(currentValue - totalInvested).toLocaleString('en-IN')} (2%)
                </p>
              </div>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(129, 140, 248, 0.1) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <RiWallet3Fill style={{ fontSize: '1.75rem', color: 'var(--primary)' }} />
              </div>
            </div>
          </div>
        )}
        
        {/* Learn Before Invest */}
        {!hasCompletedBasics && (
          <div 
            className="card card-interactive fade-in stagger-2" 
            onClick={onLearn}
            style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', border: 'none' }}
          >
            <div className="flex items-center gap-12">
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(245, 158, 11, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <HiAcademicCap style={{ fontSize: '1.5rem', color: '#b45309' }} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#78350f' }}>
                  {language === 'hi' ? 'पहले सीखें' : 'Learn First'}
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#92400e' }}>
                  {lessonsCompleted}/4 {language === 'hi' ? 'पाठ पूर्ण' : 'lessons done'}
                </p>
              </div>
              <HiArrowRight style={{ fontSize: '1.25rem', color: '#92400e' }} />
            </div>
            
            <div className="progress-bar mt-12" style={{ background: 'rgba(120, 53, 15, 0.1)' }}>
              <div 
                className="progress-fill" 
                style={{ 
                  width: `${(lessonsCompleted / 4) * 100}%`,
                  background: 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)'
                }} 
              />
            </div>
          </div>
        )}
        
        {/* Quick Actions */}
        <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.75rem', marginTop: '0.5rem' }}>
          {language === 'hi' ? 'निवेश विकल्प' : 'Investment Options'}
        </h3>
        
        <div className="grid-2">
          <div 
            className="card card-interactive text-center fade-in stagger-2" 
            onClick={onInvest}
            style={{ marginBottom: 0 }}
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(52, 211, 153, 0.1) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0.75rem'
            }}>
              <RiGovernmentFill style={{ fontSize: '1.5rem', color: 'var(--success)' }} />
            </div>
            <p style={{ fontSize: '0.875rem', fontWeight: '600' }}>
              {t('govtBonds', language)}
            </p>
            <p className="text-success" style={{ fontSize: '0.75rem', fontWeight: '500' }}>
              6.5-7.5% {language === 'hi' ? 'रिटर्न' : 'returns'}
            </p>
          </div>
          
          <div 
            className="card card-interactive text-center fade-in stagger-3" 
            onClick={onInvest}
            style={{ marginBottom: 0 }}
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(129, 140, 248, 0.1) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0.75rem'
            }}>
              <RiBankFill style={{ fontSize: '1.5rem', color: 'var(--primary)' }} />
            </div>
            <p style={{ fontSize: '0.875rem', fontWeight: '600' }}>
              {t('fixedDeposits', language)}
            </p>
            <p className="text-primary" style={{ fontSize: '0.75rem', fontWeight: '500' }}>
              5.5-6.5% {language === 'hi' ? 'रिटर्न' : 'returns'}
            </p>
          </div>
        </div>
        
        {/* Why Start Card */}
        <div className="card fade-in stagger-4 mt-16">
          <div className="flex items-center gap-8 mb-12">
            <HiCurrencyRupee style={{ fontSize: '1.25rem', color: 'var(--primary)' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>
              {language === 'hi' ? '₹10 से क्यों शुरू करें?' : 'Why start with ₹10?'}
            </h3>
          </div>
          
          <div className="flex flex-col gap-12">
            {[
              { icon: '✓', text: language === 'hi' ? 'कोई बड़ी राशि नहीं चाहिए' : 'No big amount needed' },
              { icon: '✓', text: language === 'hi' ? 'सीखते हुए निवेश करें' : 'Learn while investing' },
              { icon: '✓', text: language === 'hi' ? 'धीरे-धीरे आत्मविश्वास बढ़ाएं' : 'Build confidence gradually' },
              { icon: '✓', text: language === 'hi' ? 'छोटी बचत, बड़े सपने' : 'Small savings, big dreams' }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-12">
                <span style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--success) 0%, #059669 100%)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: '700'
                }}>
                  {item.icon}
                </span>
                <span style={{ fontSize: '0.875rem' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        
        <TrustBadges />
      </div>
    </div>
  );
};

export default HomeScreen;
