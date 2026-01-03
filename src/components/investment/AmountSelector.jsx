import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';
import { HiArrowRight, HiPencil, HiCurrencyRupee } from 'react-icons/hi2';
import { RiGovernmentFill, RiBankFill, RiCalendarFill, RiLineChartFill } from 'react-icons/ri';

const iconMap = {
  'govt-bonds': { icon: RiGovernmentFill, color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
  'fixed-deposit': { icon: RiBankFill, color: '#6366f1', bg: 'rgba(99, 102, 241, 0.1)' },
  'recurring-deposit': { icon: RiCalendarFill, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
  'mutual-fund-low': { icon: RiLineChartFill, color: '#ec4899', bg: 'rgba(236, 72, 153, 0.1)' }
};

const AmountSelector = ({ option, minAmount, onSelect }) => {
  const { state } = useApp();
  const { language } = state;
  
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  const amounts = [10, 50, 100, 500, 1000, 5000];
  const filteredAmounts = amounts.filter(a => a >= minAmount);

  const iconConfig = iconMap[option.id] || iconMap['govt-bonds'];
  const Icon = iconConfig.icon;

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
      <div className="card mb-24" style={{ background: 'var(--bg-secondary)', border: 'none' }}>
        <div className="flex items-center gap-12">
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: iconConfig.bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Icon style={{ fontSize: '1.5rem', color: iconConfig.color }} />
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>
              {option.name[language]}
            </h3>
            <p className="text-secondary" style={{ fontSize: '0.875rem' }}>
              {t('expectedReturns', language)}: <span className="text-success font-semibold">{option.expectedReturns}</span>
            </p>
          </div>
        </div>
      </div>

      <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem' }}>
        {language === 'hi' ? 'राशि चुनें' : 'Select Amount'}
      </h3>
      
      <div className="amount-pills mb-16">
        {filteredAmounts.map((amount, index) => (
          <button
            key={amount}
            className={`amount-pill ${selectedAmount === amount ? 'selected' : ''}`}
            onClick={() => handleSelect(amount)}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            ₹{amount.toLocaleString('en-IN')}
          </button>
        ))}
      </div>
      
      <button 
        className={`amount-pill ${showCustom ? 'selected' : ''}`}
        onClick={handleCustom}
        style={{ width: '100%', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
      >
        <HiPencil />
        {t('customAmount', language)}
      </button>
      
      {showCustom && (
        <div className="mb-24 fade-in">
          <div className="flex items-center gap-8">
            <div style={{
              padding: '1rem',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-sm)',
              border: '2px solid var(--border)'
            }}>
              <HiCurrencyRupee style={{ fontSize: '1.5rem', color: 'var(--primary)' }} />
            </div>
            <input
              type="tel"
              className="input"
              placeholder={`Min ₹${minAmount}`}
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value.replace(/\D/g, ''))}
              style={{ fontSize: '1.5rem', fontWeight: '700' }}
              autoFocus
            />
          </div>
          {customAmount && parseInt(customAmount) < minAmount && (
            <p className="text-danger mt-8 fade-in" style={{ fontSize: '0.875rem' }}>
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
        {t('continue', language)}
        <HiArrowRight />
      </button>
    </div>
  );
};

export default AmountSelector;
