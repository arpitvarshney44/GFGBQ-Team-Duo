import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';
import { investmentOptions } from '../../services/mockApi';
import Header from '../common/Header';
import InvestmentCard from './InvestmentCard';
import AmountSelector from './AmountSelector';
import PaymentScreen from './PaymentScreen';
import SuccessScreen from './SuccessScreen';

const InvestmentFlow = ({ onClose, onBack }) => {
  const { state } = useApp();
  const { language } = state;
  
  const [step, setStep] = useState('select'); // select | amount | payment | success
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

  return (
    <div className="full-screen">
      <Header 
        title={getTitle()}
        showBack
        onBack={handleBack}
      />
      
      <div className="container page-content-no-nav">
        {step === 'select' && (
          <div className="fade-in">
            <p className="text-secondary mb-16">
              {language === 'hi' 
                ? 'अपने लिए सही निवेश विकल्प चुनें' 
                : 'Choose the right investment option for you'}
            </p>
            
            {investmentOptions.map(option => (
              <InvestmentCard 
                key={option.id}
                option={option}
                onSelect={handleSelectOption}
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
