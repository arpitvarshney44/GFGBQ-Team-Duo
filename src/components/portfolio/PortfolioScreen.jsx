import React from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';
import Header from '../common/Header';
import { HiArrowRight, HiTrendingUp, HiPlus, HiChartPie, HiCalendar } from 'react-icons/hi2';
import { RiWallet3Fill, RiGovernmentFill, RiBankFill, RiCalendarFill, RiLineChartFill } from 'react-icons/ri';

const iconMap = {
  'govt-bonds': { icon: RiGovernmentFill, color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
  'fixed-deposit': { icon: RiBankFill, color: '#6366f1', bg: 'rgba(99, 102, 241, 0.1)' },
  'recurring-deposit': { icon: RiCalendarFill, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
  'mutual-fund-low': { icon: RiLineChartFill, color: '#ec4899', bg: 'rgba(236, 72, 153, 0.1)' }
};

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
          <div className="text-center fade-in-up" style={{ paddingTop: '3rem' }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(129, 140, 248, 0.1) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}>
              <RiWallet3Fill style={{ fontSize: '3rem', color: 'var(--primary)' }} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>
              {t('noInvestments', language)}
            </h2>
            <p className="text-secondary mb-32" style={{ maxWidth: '280px', margin: '0 auto 2rem' }}>
              {t('startInvesting', language)}
            </p>
            <button className="btn btn-primary" onClick={onInvest}>
              {t('investNow', language)}
              <HiArrowRight />
            </button>
          </div>
        ) : (
          <div className="fade-in">
            {/* Summary Card */}
            <div className="card card-gradient" style={{ position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute',
                top: '-30px',
                right: '-30px',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)'
              }} />
              
              <div className="flex items-center gap-8 mb-12">
                <HiChartPie style={{ fontSize: '1.25rem' }} />
                <span style={{ fontSize: '0.875rem', fontWeight: '600', opacity: 0.9 }}>
                  {language === 'hi' ? 'पोर्टफोलियो सारांश' : 'Portfolio Summary'}
                </span>
              </div>
              
              <p style={{ fontSize: '0.875rem', opacity: 0.8, marginBottom: '0.25rem' }}>
                {t('currentValue', language)}
              </p>
              <h2 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '1rem' }}>
                ₹{currentValue.toLocaleString('en-IN')}
              </h2>
              
              <div className="flex justify-between" style={{ 
                background: 'rgba(255,255,255,0.15)', 
                borderRadius: 'var(--radius-sm)',
                padding: '0.75rem'
              }}>
                <div>
                  <p style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                    {t('totalInvested', language)}
                  </p>
                  <p style={{ fontSize: '1rem', fontWeight: '700' }}>
                    ₹{totalInvested.toLocaleString('en-IN')}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                    {t('returns', language)}
                  </p>
                  <p style={{ fontSize: '1rem', fontWeight: '700' }} className="flex items-center gap-4 justify-end">
                    <HiTrendingUp />
                    +₹{returns.toLocaleString('en-IN')} ({returnsPercent}%)
                  </p>
                </div>
              </div>
            </div>
            
            {/* Investments List */}
            <div className="flex items-center justify-between mb-12">
              <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>
                {language === 'hi' ? 'आपके निवेश' : 'Your Investments'}
              </h3>
              <span className="text-secondary" style={{ fontSize: '0.875rem' }}>
                {portfolio.length} {language === 'hi' ? 'निवेश' : 'investments'}
              </span>
            </div>
            
            {portfolio.map((investment, index) => {
              const iconConfig = iconMap[investment.optionId] || iconMap['govt-bonds'];
              const Icon = iconConfig.icon;
              const invReturn = Math.round(investment.amount * 0.02);
              
              return (
                <div 
                  key={index} 
                  className="card fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-12">
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: iconConfig.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon style={{ fontSize: '1.5rem', color: iconConfig.color }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{ 
                        fontSize: '0.9375rem', 
                        fontWeight: '600',
                        marginBottom: '0.25rem'
                      }}>
                        {investment.optionName[language]}
                      </h4>
                      <p className="text-secondary flex items-center gap-4" style={{ fontSize: '0.75rem' }}>
                        <HiCalendar />
                        {new Date(investment.createdAt).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '1rem', fontWeight: '700' }}>
                        ₹{investment.amount.toLocaleString('en-IN')}
                      </p>
                      <p className="text-success flex items-center gap-4 justify-end" style={{ fontSize: '0.75rem', fontWeight: '600' }}>
                        <HiTrendingUp />
                        +₹{invReturn}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            
            <button className="btn btn-primary mt-24" onClick={onInvest}>
              <HiPlus />
              {language === 'hi' ? 'और निवेश करें' : 'Invest More'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioScreen;
