import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';
import { sendOtp, verifyOtp } from '../../services/mockApi';
import LanguageToggle from '../common/LanguageToggle';
import TrustBadges from '../common/TrustBadges';
import Loader from '../common/Loader';

const LoginScreen = () => {
  const { state, dispatch } = useApp();
  const { language } = state;
  
  const [step, setStep] = useState('mobile'); // mobile | otp
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = async () => {
    if (mobile.length !== 10) {
      setError(language === 'hi' ? 'कृपया 10 अंकों का मोबाइल नंबर दर्ज करें' : 'Please enter 10-digit mobile number');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      await sendOtp(mobile);
      setStep('otp');
    } catch (e) {
      setError(language === 'hi' ? 'OTP भेजने में त्रुटि' : 'Error sending OTP');
    }
    
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setError(language === 'hi' ? 'कृपया 6 अंकों का OTP दर्ज करें' : 'Please enter 6-digit OTP');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const result = await verifyOtp(mobile, otp);
      if (result.success) {
        dispatch({ type: 'SET_USER', payload: result.user });
      } else {
        setError(language === 'hi' ? 'गलत OTP' : 'Invalid OTP');
      }
    } catch (e) {
      setError(language === 'hi' ? 'सत्यापन में त्रुटि' : 'Verification error');
    }
    
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="full-screen" style={{ justifyContent: 'center' }}>
        <Loader />
      </div>
    );
  }

  return (
    <div className="full-screen container fade-in" style={{ paddingTop: '3rem' }}>
      <div className="text-center mb-16">
        <LanguageToggle />
      </div>
      
      <div className="text-center mb-24">
        <div className="icon-lg mb-16">💰</div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
          {t('appName', language)}
        </h1>
        <p className="text-secondary">{t('tagline', language)}</p>
      </div>

      {step === 'mobile' ? (
        <div className="card">
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>
            {t('enterMobile', language)}
          </h2>
          
          <div className="flex items-center gap-8 mb-16">
            <span style={{ 
              padding: '1rem', 
              background: 'var(--bg-secondary)', 
              borderRadius: 'var(--radius)',
              fontWeight: '600',
              minHeight: '52px',
              display: 'flex',
              alignItems: 'center'
            }}>
              +91
            </span>
            <input
              type="tel"
              className="input"
              placeholder={t('mobileNumber', language)}
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
              maxLength={10}
            />
          </div>
          
          {error && <p className="text-danger mb-16">{error}</p>}
          
          <button 
            className="btn btn-primary"
            onClick={handleSendOtp}
            disabled={mobile.length !== 10}
          >
            {t('sendOtp', language)} →
          </button>
        </div>
      ) : (
        <div className="card">
          <h2 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
            {t('enterOtp', language)}
          </h2>
          <p className="text-secondary mb-16">
            {t('otpSent', language)} +91 {mobile}
          </p>
          
          <input
            type="tel"
            className="input mb-16"
            placeholder="● ● ● ● ● ●"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            maxLength={6}
            style={{ textAlign: 'center', letterSpacing: '0.5rem', fontSize: '1.25rem' }}
          />
          
          {error && <p className="text-danger mb-16">{error}</p>}
          
          <button 
            className="btn btn-primary mb-16"
            onClick={handleVerifyOtp}
            disabled={otp.length !== 6}
          >
            {t('verifyOtp', language)} →
          </button>
          
          <button 
            className="btn btn-secondary"
            onClick={() => { setStep('mobile'); setOtp(''); setError(''); }}
          >
            ← {t('back', language)}
          </button>
          
          <p className="text-center text-secondary mt-16" style={{ fontSize: '0.875rem' }}>
            {language === 'hi' ? 'डेमो के लिए कोई भी 6 अंक दर्ज करें' : 'Enter any 6 digits for demo'}
          </p>
        </div>
      )}

      <TrustBadges />
    </div>
  );
};

export default LoginScreen;
