import React from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';
import Header from '../common/Header';

const SuccessScreen = ({ investment, onDone }) => {
  const { state } = useApp();
  const { language } = state;

  return (
    <div className="full-screen">
      <Header 
        title={t('paymentSuccess', language)} 
        showLang={false}
      />
      
      <div className="container fade-in text-center" style={{ paddingTop: '2rem' }}>
        <div className="success-icon mb-24">
          ✓
        </div>
        
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
          {t('paymentSuccess', language)}
        </h1>
        <p className="text-secondary mb-24">
          {t('investmentConfirmed', language)}
        </p>
        
        <div className="card mb-24" style={{ textAlign: 'left' }}>
          <div className="flex justify-between mb-8">
            <span className="text-secondary" style={{ fontSize: '0.875rem' }}>
              {language === 'hi' ? 'निवेश' : 'Investment'}
            </span>
            <span style={{ fontSize: '0.875rem' }}>{investment.optionName[language]}</span>
          </div>
          <div className="flex justify-between mb-8">
            <span className="text-secondary" style={{ fontSize: '0.875rem' }}>
              {language === 'hi' ? 'राशि' : 'Amount'}
            </span>
            <span style={{ fontWeight: '600' }}>₹{investment.amount.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between mb-8">
            <span className="text-secondary" style={{ fontSize: '0.875rem' }}>
              {language === 'hi' ? 'ट्रांजैक्शन ID' : 'Transaction ID'}
            </span>
            <span style={{ fontSize: '0.75rem' }}>{investment.transactionId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary" style={{ fontSize: '0.875rem' }}>
              {language === 'hi' ? 'तारीख' : 'Date'}
            </span>
            <span style={{ fontSize: '0.875rem' }}>
              {new Date(investment.createdAt).toLocaleDateString('en-IN')}
            </span>
          </div>
        </div>
        
        <div className="card mb-24" style={{ background: '#e6f4ea' }}>
          <p style={{ fontSize: '0.875rem' }}>
            🎉 {language === 'hi' 
              ? 'बधाई हो! आपने अपनी निवेश यात्रा शुरू कर दी है।' 
              : 'Congratulations! You have started your investment journey.'}
          </p>
        </div>
        
        <button className="btn btn-primary" onClick={onDone}>
          {language === 'hi' ? 'पोर्टफोलियो देखें' : 'View Portfolio'} →
        </button>
      </div>
    </div>
  );
};

export default SuccessScreen;
