import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';
import { processPayment, createInvestment } from '../../services/mockApi';
import Loader from '../common/Loader';

const PaymentScreen = ({ option, amount, onSuccess }) => {
  const { state, dispatch } = useApp();
  const { language } = state;
  
  const [upiId, setUpiId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      <div className="card mb-16" style={{ background: 'var(--bg-secondary)' }}>
        <div className="flex items-center gap-12 mb-8">
          <span className="icon-md">{option.icon}</span>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>
              {option.name[language]}
            </h3>
            <p className="text-secondary" style={{ fontSize: '0.875rem' }}>
              {t('expectedReturns', language)}: {option.expectedReturns}
            </p>
          </div>
        </div>
        
        <div style={{ 
          fontSize: '2rem', 
          fontWeight: '700', 
          textAlign: 'center',
          padding: '1rem 0'
        }}>
          ₹{amount.toLocaleString('en-IN')}
        </div>
      </div>
      
      {/* Money Breakdown */}
      <div className="card mb-16">
        <h4 style={{ fontSize: '0.875rem', marginBottom: '0.75rem' }}>
          {t('moneyBreakdown', language)}
        </h4>
        <div className="flex justify-between mb-8" style={{ fontSize: '0.875rem' }}>
          <span className="text-secondary">
            {language === 'hi' ? 'निवेश राशि' : 'Investment Amount'}
          </span>
          <span>₹{amount.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between mb-8" style={{ fontSize: '0.875rem' }}>
          <span className="text-secondary">
            {language === 'hi' ? 'प्लेटफॉर्म शुल्क' : 'Platform Fee'}
          </span>
          <span className="text-success">₹0 (Free)</span>
        </div>
        <div className="flex justify-between" style={{ 
          fontSize: '1rem', 
          fontWeight: '600',
          borderTop: '1px solid var(--border)',
          paddingTop: '0.5rem'
        }}>
          <span>{language === 'hi' ? 'कुल' : 'Total'}</span>
          <span>₹{amount.toLocaleString('en-IN')}</span>
        </div>
      </div>
      
      {/* UPI Input */}
      <div className="mb-16">
        <label style={{ fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>
          {t('enterUpiId', language)}
        </label>
        <input
          type="text"
          className="input"
          placeholder="yourname@upi"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value.toLowerCase())}
        />
        <p className="text-secondary mt-8" style={{ fontSize: '0.75rem' }}>
          {language === 'hi' 
            ? 'डेमो के लिए कोई भी UPI ID दर्ज करें (जैसे: test@upi)' 
            : 'Enter any UPI ID for demo (e.g., test@upi)'}
        </p>
      </div>
      
      {error && <p className="text-danger mb-16">{error}</p>}
      
      <button 
        className="btn btn-success"
        onClick={handlePayment}
        disabled={!upiId.includes('@')}
      >
        {t('confirmPayment', language)} ₹{amount}
      </button>
    </div>
  );
};

export default PaymentScreen;
