import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';

const AmountSelector = ({ option, minAmount, onSelect }) => {
  const { state } = useApp();
  const { language } = state;
  
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  const amounts = [10, 50, 100, 500, 1000, 5000];
  const filteredAmounts = amounts.filter(a => a >= minAmount);

  const handleSelect = (amount) => {
    setSelectedAmount(amount);
    setShowCustom(false);
    setCustomAmount('');
  };

  const handleCustom = () => {
    setShowCustom(true);
    setSelectedAmount(null);
  };

  const handleContinue = () => {
    const amount = showCustom ? parseInt(customAmount) : selectedAmount;
    if (amount && amount >= minAmount) {
      onSelect(amount);
    }
  };

  const isValid = showCustom 
    ? customAmount && parseInt(customAmount) >= minAmount
    : selectedAmount !== null;

  return (
    <div className="fade-in">
      {/* Selected Option Summary */}
      <div className="card mb-16" style={{ background: 'var(--bg-secondary)' }}>
        <div className="flex items-center gap-12">
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
      </div>

      <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>
        {language === 'hi' ? 'राशि चुनें' : 'Select Amount'}
      </h3>
      
      <div className="amount-pills mb-16">
        {filteredAmounts.map(amount => (
          <button
            key={amount}
            className={`amount-pill ${selectedAmount === amount ? 'selected' : ''}`}
            onClick={() => handleSelect(amount)}
          >
            ₹{amount}
          </button>
        ))}
      </div>
      
      <button 
        className={`amount-pill ${showCustom ? 'selected' : ''}`}
        onClick={handleCustom}
        style={{ width: '100%', marginBottom: '1rem' }}
      >
        {t('customAmount', language)}
      </button>
      
      {showCustom && (
        <div className="mb-16">
          <div className="flex items-center gap-8">
            <span style={{ fontSize: '1.5rem', fontWeight: '600' }}>₹</span>
            <input
              type="tel"
              className="input"
              placeholder={`Min ₹${minAmount}`}
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value.replace(/\D/g, ''))}
              style={{ fontSize: '1.5rem', fontWeight: '600' }}
            />
          </div>
          {customAmount && parseInt(customAmount) < minAmount && (
            <p className="text-danger mt-8" style={{ fontSize: '0.875rem' }}>
              {language === 'hi' 
                ? `न्यूनतम राशि ₹${minAmount} है` 
                : `Minimum amount is ₹${minAmount}`}
            </p>
          )}
        </div>
      )}
      
      <button 
        className="btn btn-primary"
        onClick={handleContinue}
        disabled={!isValid}
      >
        {t('continue', language)} →
      </button>
    </div>
  );
};

export default AmountSelector;
