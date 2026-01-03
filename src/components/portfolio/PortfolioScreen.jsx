import React from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';
import Header from '../common/Header';

const PortfolioScreen = ({ onInvest, onBack }) => {
  const { state } = useApp();
  const { language, portfolio } = state;

  const totalInvested = portfolio.reduce((sum, inv) => sum + inv.amount, 0);
  const currentValue = Math.round(totalInvested * 1.02);
  const returns = currentValue - totalInvested;
  const returnsPercent = totalInvested > 0 ? ((returns / totalInvested) * 100).toFixed(2) : 0;

  return (
    <div>
      <Header 
        title={t('myPortfolio', language)} 
        showBack={!!onBack}
        onBack={onBack}
      />
      
      <div className="container page-content">
        {portfolio.length === 0 ? (
          <div className="text-center fade-in" style={{ paddingTop: '3rem' }}>
            <span className="icon-lg">📊</span>
            <h2 style={{ fontSize: '1.25rem', marginTop: '1rem', marginBottom: '0.5rem' }}>
              {t('noInvestments', language)}
            </h2>
            <p className="text-secondary mb-24">
              {t('startInvesting', language)}
            </p>
            <button className="btn btn-primary" onClick={onInvest}>
              {t('investNow', language)} →
            </button>
          </div>
        ) : (
          <div className="fade-in">
            {/* Summary Card */}
            <div className="card" style={{ 
              background: 'linear-gradient(135deg, #1a73e8, #1557b0)', 
              color: 'white' 
            }}>
              <p style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.25rem' }}>
                {t('currentValue', language)}
              </p>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem' }}>
                ₹{currentValue.toLocaleString('en-IN')}
              </h2>
              
              <div className="flex justify-between">
                <div>
                  <p style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                    {t('totalInvested', language)}
                  </p>
                  <p style={{ fontSize: '1rem', fontWeight: '600' }}>
                    ₹{totalInvested.toLocaleString('en-IN')}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                    {t('returns', language)}
                  </p>
                  <p style={{ fontSize: '1rem', fontWeight: '600' }}>
                    +₹{returns.toLocaleString('en-IN')} ({returnsPercent}%)
                  </p>
                </div>
              </div>
            </div>
            
            {/* Investments List */}
            <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>
              {language === 'hi' ? 'आपके निवेश' : 'Your Investments'}
            </h3>
            
            {portfolio.map((investment, index) => (
              <div key={index} className="card">
                <div className="flex justify-between items-center">
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <h4 style={{ 
                      fontSize: '0.9375rem', 
                      fontWeight: '600',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {investment.optionName[language]}
                    </h4>
                    <p className="text-secondary" style={{ fontSize: '0.75rem' }}>
                      {new Date(investment.createdAt).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right', marginLeft: '1rem' }}>
                    <p style={{ fontSize: '1rem', fontWeight: '600' }}>
                      ₹{investment.amount.toLocaleString('en-IN')}
                    </p>
                    <p className="text-success" style={{ fontSize: '0.75rem' }}>
                      +{(investment.amount * 0.02).toFixed(0)} (2%)
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            <button className="btn btn-primary mt-24" onClick={onInvest}>
              + {language === 'hi' ? 'और निवेश करें' : 'Invest More'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioScreen;
