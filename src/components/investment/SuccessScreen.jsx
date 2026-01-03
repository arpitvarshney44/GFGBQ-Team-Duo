import React from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';
import { getMoneyStory } from '../../utils/moneyStory';
import Header from '../common/Header';
import { HiCheckCircle, HiArrowRight, HiSparkles, HiCalendar, HiHashtag, HiCurrencyRupee } from 'react-icons/hi2';
import Confetti from './Confetti';

const SuccessScreen = ({ investment, onDone }) => {
  const { state } = useApp();
  const { language } = state;

  return (
    <div className="full-screen" style={{ background: 'var(--bg)' }}>
      <Confetti />
      
      <Header 
        title={t('paymentSuccess', language)} 
        showLang={false}
      />
      
      <div className="container fade-in-up text-center" style={{ paddingTop: '2rem' }}>
        <div className="success-icon mb-24 bounce">
          <HiCheckCircle style={{ fontSize: '3rem' }} />
        </div>
        
        <h1 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.5rem' }}>
          <span className="text-gradient">{t('paymentSuccess', language)}</span>
        </h1>
        <p className="text-secondary mb-32">
          {t('investmentConfirmed', language)}
        </p>
        
        <div className="card mb-24" style={{ textAlign: 'left' }}>
          <div className="flex items-center gap-8 mb-16">
            <HiCurrencyRupee style={{ fontSize: '1.25rem', color: 'var(--primary)' }} />
            <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>
              {language === 'hi' ? 'निवेश विवरण' : 'Investment Details'}
            </span>
          </div>
          
          <div className="flex justify-between mb-12" style={{ fontSize: '0.875rem' }}>
            <span className="text-secondary">
              {language === 'hi' ? 'निवेश' : 'Investment'}
            </span>
            <span className="font-semibold">{investment.optionName[language]}</span>
          </div>
          <div className="flex justify-between mb-12" style={{ fontSize: '0.875rem' }}>
            <span className="text-secondary">
              {language === 'hi' ? 'राशि' : 'Amount'}
            </span>
            <span style={{ fontWeight: '700', color: 'var(--primary)', fontSize: '1rem' }}>
              ₹{investment.amount.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="flex justify-between mb-12" style={{ fontSize: '0.875rem' }}>
            <span className="text-secondary flex items-center gap-4">
              <HiHashtag style={{ fontSize: '0.875rem' }} />
              {language === 'hi' ? 'ट्रांजैक्शन ID' : 'Transaction ID'}
            </span>
            <span style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>{investment.transactionId}</span>
          </div>
          <div className="flex justify-between" style={{ fontSize: '0.875rem' }}>
            <span className="text-secondary flex items-center gap-4">
              <HiCalendar style={{ fontSize: '0.875rem' }} />
              {language === 'hi' ? 'तारीख' : 'Date'}
            </span>
            <span>{new Date(investment.createdAt).toLocaleDateString('en-IN')}</span>
          </div>
        </div>
        
        <div className="card card-success mb-16" style={{ border: 'none' }}>
          <div className="flex items-center justify-center gap-8">
            <HiSparkles style={{ fontSize: '1.25rem' }} />
            <p style={{ fontSize: '0.9375rem', fontWeight: '600' }}>
              {language === 'hi' 
                ? 'बधाई हो! आपकी निवेश यात्रा शुरू हो गई!' 
                : 'Congratulations! Your investment journey has begun!'}
            </p>
          </div>
        </div>
        
        {/* Money Story */}
        <div className="card mb-32" style={{ background: '#fef3c7', border: 'none', textAlign: 'center' }}>
          <p style={{ fontSize: '0.9375rem', fontWeight: '600', color: '#92400e' }}>
            {getMoneyStory(investment.amount, language)}
          </p>
        </div>
        
        <button className="btn btn-primary" onClick={onDone}>
          {language === 'hi' ? 'पोर्टफोलियो देखें' : 'View Portfolio'}
          <HiArrowRight />
        </button>
      </div>
    </div>
  );
};

export default SuccessScreen;
