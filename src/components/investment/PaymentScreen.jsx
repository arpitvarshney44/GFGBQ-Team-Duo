import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';
import { processPayment, createInvestment } from '../../services/mockApi';
import Loader from '../common/Loader';
import { HiArrowRight, HiCheckCircle, HiCurrencyRupee, HiReceiptPercent } from 'react-icons/hi2';
import { RiGovernmentFill, RiBankFill, RiCalendarFill, RiLineChartFill } from 'react-icons/ri';

const iconMap = {
  'govt-bonds': { icon: RiGovernmentFill, color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
  'fixed-deposit': { icon: RiBankFill, color: '#6366f1', bg: 'rgba(99, 102, 241, 0.1)' },
  'recurring-deposit': { icon: RiCalendarFill, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
  'mutual-fund-low': { icon: RiLineChartFill, color: '#ec4899', bg: 'rgba(236, 72, 153, 0.1)' }
};

const PaymentScreen = ({ option, amount, onSuccess }) => {
  const { state, dispatch } = useApp();
  const { language } = state;
  
  const [upiId, setUpiId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const iconConfig = iconMap[option.id] || iconMap['govt-bonds'];
  const Icon = iconConfig.icon;

  const handlePayment = async () => {
    if (!upiId.includes('@')) {
      setError(language === 'hi' ? 'कृपया वैध UPI ID दर्ज करें' : 'Please enter valid UPI ID');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const paymentResult = await processPayment(amount, upiId);
      
      if (paymentResult.success) {
        const investmentResult = await createInvestment({
          optionId: option.id,
          optionName: option.name,
          amount,
          transactionId: paymentResult.transactionId
        });
        
        if (investmentResult.success) {
          dispatch({ type: 'ADD_INVESTMENT', payload: investmentResult.investment });
          onSuccess(investmentResult.investment);
        }
      }
    } catch (e) {
      setError(language === 'hi' ? 'भुगतान में त्रुटि' : 'Payment error');
    }
    
    setLoading(false);
  };

  if (loading) {
    return <Loader message={language === 'hi' ? 'भुगतान प्रोसेस हो रहा है...' : 'Processing payment...'} />;
  }

  return (
    <div className="fade-in">
      {/* Investment Summary */}
      <div className="card mb-16" style={{ 
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
        color: 'white',
        border: 'none'
      }}>
        <div className="flex items-center gap-12 mb-16">
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Icon style={{ fontSize: '1.5rem' }} />
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', opacity: 0.9 }}>
              {option.name[language]}
            </h3>
            <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>
              {t('expectedReturns', language)}: {option.expectedReturns}
            </p>
          </div>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.875rem', opacity: 0.8, marginBottom: '0.25rem' }}>
            {language === 'hi' ? 'निवेश राशि' : 'Investment Amount'}
          </p>
          <p style={{ fontSize: '2.5rem', fontWeight: '800' }}>
            ₹{amount.toLocaleString('en-IN')}
          </p>
        </div>
      </div>
      
      {/* Money Breakdown */}
      <div className="card mb-16">
        <div className="flex items-center gap-8 mb-12">
          <HiReceiptPercent style={{ fontSize: '1.25rem', color: 'var(--primary)' }} />
          <h4 style={{ fontSize: '0.9375rem', fontWeight: '700' }}>
            {t('moneyBreakdown', language)}
          </h4>
        </div>
        
        <div className="flex justify-between mb-8" style={{ fontSize: '0.875rem' }}>
          <span className="text-secondary">
            {language === 'hi' ? 'निवेश राशि' : 'Investment Amount'}
          </span>
          <span className="font-semibold">₹{amount.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between mb-12" style={{ fontSize: '0.875rem' }}>
          <span className="text-secondary">
            {language === 'hi' ? 'प्लेटफॉर्म शुल्क' : 'Platform Fee'}
          </span>
          <span className="text-success font-semibold flex items-center gap-4">
            <HiCheckCircle />
            ₹0 Free
          </span>
        </div>
        <div className="flex justify-between" style={{ 
          fontSize: '1rem', 
          fontWeight: '700',
          borderTop: '2px dashed var(--border)',
          paddingTop: '0.75rem'
        }}>
          <span>{language === 'hi' ? 'कुल' : 'Total'}</span>
          <span className="text-primary">₹{amount.toLocaleString('en-IN')}</span>
        </div>
      </div>
      
      {/* UPI Apps */}
      <div className="mb-16">
        <p className="text-secondary mb-12" style={{ fontSize: '0.875rem' }}>
          {language === 'hi' ? 'UPI से भुगतान करें' : 'Pay with UPI'}
        </p>
        <div className="flex gap-12 mb-16">
          {[
            { name: 'GPay', color: '#4285F4', bg: '#E8F0FE' },
            { name: 'PhonePe', color: '#5F259F', bg: '#F3E8FF' },
            { name: 'Paytm', color: '#00BAF2', bg: '#E0F7FF' }
          ].map((app, index) => (
            <div 
              key={index}
              style={{
                flex: 1,
                padding: '0.875rem 0.5rem',
                background: app.bg,
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.25rem',
                cursor: 'pointer',
                transition: 'var(--transition)',
                border: `2px solid ${app.color}20`
              }}
            >
              <span style={{ 
                fontSize: '0.875rem', 
                fontWeight: '700', 
                color: app.color 
              }}>
                {app.name}
              </span>
            </div>
          ))}
        </div>
        
        <input
          type="text"
          className="input"
          placeholder="yourname@upi"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value.toLowerCase())}
        />
        <p className="text-light mt-8" style={{ fontSize: '0.75rem' }}>
          {language === 'hi' 
            ? 'डेमो: कोई भी UPI ID दर्ज करें (जैसे: test@upi)' 
            : 'Demo: Enter any UPI ID (e.g., test@upi)'}
        </p>
      </div>
      
      {error && (
        <p className="text-danger mb-16 fade-in" style={{ fontSize: '0.875rem' }}>
          {error}
        </p>
      )}
      
      <button 
        className="btn btn-success"
        onClick={handlePayment}
        disabled={!upiId.includes('@')}
      >
        {t('confirmPayment', language)} ₹{amount.toLocaleString('en-IN')}
        <HiArrowRight />
      </button>
    </div>
  );
};

export default PaymentScreen;
