import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';
import { sendOtp, verifyOtp } from '../../services/mockApi';
import LanguageToggle from '../common/LanguageToggle';
import TrustBadges from '../common/TrustBadges';
import Loader from '../common/Loader';
import { HiDevicePhoneMobile, HiArrowRight, HiArrowLeft, HiShieldCheck } from 'react-icons/hi2';
import { RiCoinsFill } from 'react-icons/ri';

const LoginScreen = () => {
  const { state, dispatch } = useApp();
  const { language } = state;
  
  const [step, setStep] = useState('mobile');
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
      <div className="full-screen" style={{ justifyContent: 'center', background: 'var(--bg)' }}>
        <Loader message={step === 'mobile' 
          ? (language === 'hi' ? 'OTP भेज रहे हैं...' : 'Sending OTP...') 
          : (language === 'hi' ? 'सत्यापित कर रहे हैं...' : 'Verifying...')} 
        />
      </div>
    );
  }

  return (
    <div className="full-screen container" style={{ paddingTop: '2rem', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative circles */}
      <div className="decoration-circle decoration-circle-1"></div>
      <div className="decoration-circle decoration-circle-2"></div>
      
      <div className="text-center mb-16 fade-in">
        <LanguageToggle />
      </div>
      
      <div className="text-center mb-32 fade-in-up">
        <div className="float" style={{ 
          width: '80px', 
          height: '80px', 
          borderRadius: '24px',
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          boxShadow: '0 10px 40px var(--primary-glow)'
        }}>
          <RiCoinsFill style={{ fontSize: '2.5rem', color: 'white' }} />
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.5rem' }}>
          <span className="text-gradient">{t('appName', language)}</span>
        </h1>
        <p className="text-secondary" style={{ fontSize: '1rem' }}>{t('tagline', language)}</p>
      </div>

      {step === 'mobile' ? (
        <div className="card scale-in" style={{ position: 'relative', zIndex: 1 }}>
          <div className="flex items-center gap-12 mb-16">
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(129, 140, 248, 0.1) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <HiDevicePhoneMobile style={{ fontSize: '1.5rem', color: 'var(--primary)' }} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.125rem', fontWeight: '700' }}>
                {t('enterMobile', language)}
              </h2>
              <p className="text-secondary" style={{ fontSize: '0.875rem' }}>
                {language === 'hi' ? 'हम आपको OTP भेजेंगे' : "We'll send you an OTP"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-8 mb-16">
            <span style={{ 
              padding: '1rem', 
              background: 'var(--bg-secondary)', 
              borderRadius: 'var(--radius-sm)',
              fontWeight: '600',
              minHeight: '56px',
              display: 'flex',
              alignItems: 'center',
              border: '2px solid var(--border)'
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
              style={{ fontSize: '1.125rem', fontWeight: '600' }}
            />
          </div>
          
          {error && (
            <p className="text-danger mb-16 fade-in" style={{ fontSize: '0.875rem' }}>
              {error}
            </p>
          )}
          
          <button 
            className="btn btn-primary"
            onClick={handleSendOtp}
            disabled={mobile.length !== 10}
          >
            {t('sendOtp', language)}
            <HiArrowRight />
          </button>
        </div>
      ) : (
        <div className="card scale-in" style={{ position: 'relative', zIndex: 1 }}>
          <div className="flex items-center gap-12 mb-16">
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(52, 211, 153, 0.1) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <HiShieldCheck style={{ fontSize: '1.5rem', color: 'var(--success)' }} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.125rem', fontWeight: '700' }}>
                {t('enterOtp', language)}
              </h2>
              <p className="text-secondary" style={{ fontSize: '0.875rem' }}>
                {t('otpSent', language)} +91 {mobile}
              </p>
            </div>
          </div>
          
          <input
            type="tel"
            className="input mb-16"
            placeholder="● ● ● ● ● ●"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            maxLength={6}
            style={{ 
              textAlign: 'center', 
              letterSpacing: '0.75rem', 
              fontSize: '1.5rem',
              fontWeight: '700'
            }}
          />
          
          {error && (
            <p className="text-danger mb-16 fade-in" style={{ fontSize: '0.875rem' }}>
              {error}
            </p>
          )}
          
          <button 
            className="btn btn-success mb-12"
            onClick={handleVerifyOtp}
            disabled={otp.length !== 6}
          >
            {t('verifyOtp', language)}
            <HiArrowRight />
          </button>
          
          <button 
            className="btn btn-ghost"
            onClick={() => { setStep('mobile'); setOtp(''); setError(''); }}
          >
            <HiArrowLeft />
            {t('back', language)}
          </button>
          
          <p className="text-center text-light mt-16" style={{ fontSize: '0.75rem' }}>
            {language === 'hi' ? 'डेमो: कोई भी 6 अंक दर्ज करें' : 'Demo: Enter any 6 digits'}
          </p>
        </div>
      )}

      <TrustBadges />
    </div>
  );
};

export default LoginScreen;
