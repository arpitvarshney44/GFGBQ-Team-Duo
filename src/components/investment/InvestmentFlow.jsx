import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';
import { investmentOptions } from '../../services/mockApi';
import Header from '../common/Header';
import InvestmentCard from './InvestmentCard';
import AmountSelector from './AmountSelector';
import PaymentScreen from './PaymentScreen';
import SuccessScreen from './SuccessScreen';
import { HiSparkles } from 'react-icons/hi2';

const InvestmentFlow = ({ onClose, onBack }) => {
  const { state } = useApp();
  const { language } = state;
  
  const [step, setStep] = useState('select');
  const [selectedOption, setSelectedOption] = useState(null);
  const [amount, setAmount] = useState(null);
  const [investment, setInvestment] = useState(null);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setStep('amount');
  };

  const handleSelectAmount = (amt) => {
    setAmount(amt);
    setStep('payment');
  };

  const handlePaymentSuccess = (inv) => {
    setInvestment(inv);
    setStep('success');
  };

  const handleBack = () => {
    if (step === 'select') {
      onBack?.();
    } else if (step === 'amount') {
      setStep('select');
    } else if (step === 'payment') {
      setStep('amount');
    }
  };

  if (step === 'success') {
    return <SuccessScreen investment={investment} onDone={onClose} />;
  }

  const getTitle = () => {
    switch (step) {
      case 'select': return t('investmentOptions', language);
      case 'amount': return t('selectAmount', language);
      case 'payment': return t('payViaUpi', language);
      default: return t('investmentOptions', language);
    }
  };

  // Progress indicator
  const steps = ['select', 'amount', 'payment'];
  const currentStepIndex = steps.indexOf(step);

  return (
    <div className="full-screen">
      <Header 
        title={getTitle()}
        showBack
        onBack={handleBack}
      />
      
      {/* Progress Bar */}
      <div style={{ padding: '0 1rem', marginBottom: '0.5rem' }}>
        <div className="progress-bar" style={{ height: '4px' }}>
          <div 
            className="progress-fill" 
            style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }} 
          />
        </div>
        <div className="flex justify-between mt-8">
          {steps.map((s, i) => (
            <span 
              key={s} 
              style={{ 
                fontSize: '0.7rem', 
                color: i <= currentStepIndex ? 'var(--primary)' : 'var(--text-light)',
                fontWeight: i === currentStepIndex ? '600' : '400'
              }}
            >
              {i + 1}. {s === 'select' ? (language === 'hi' ? 'चुनें' : 'Select') : 
                       s === 'amount' ? (language === 'hi' ? 'राशि' : 'Amount') : 
                       (language === 'hi' ? 'भुगतान' : 'Pay')}
            </span>
          ))}
        </div>
      </div>
      
      <div className="container page-content-no-nav">
        {step === 'select' && (
          <div className="fade-in">
            <div className="flex items-center gap-8 mb-16">
              <HiSparkles style={{ color: 'var(--primary)' }} />
              <p className="text-secondary" style={{ fontSize: '0.9375rem' }}>
                {language === 'hi' 
                  ? 'अपने लिए सही निवेश विकल्प चुनें' 
                  : 'Choose the right investment for you'}
              </p>
            </div>
            
            {investmentOptions.map((option, index) => (
              <InvestmentCard 
                key={option.id}
                option={option}
                onSelect={handleSelectOption}
                index={index}
              />
            ))}
          </div>
        )}
        
        {step === 'amount' && selectedOption && (
          <AmountSelector
            option={selectedOption}
            minAmount={selectedOption.minAmount}
            onSelect={handleSelectAmount}
          />
        )}
        
        {step === 'payment' && selectedOption && amount && (
          <PaymentScreen
            option={selectedOption}
            amount={amount}
            onSuccess={handlePaymentSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default InvestmentFlow;
