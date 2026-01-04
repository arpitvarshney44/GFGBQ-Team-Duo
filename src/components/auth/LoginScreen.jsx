import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';
import LanguageToggle from '../common/LanguageToggle';
import TrustBadges from '../common/TrustBadges';
import Loader from '../common/Loader';
import { HiDevicePhoneMobile, HiArrowRight, HiArrowLeft, HiUser, HiLockClosed, HiCalendar, HiExclamationCircle } from 'react-icons/hi2';

// Mock user storage (in real app, this would be backend)
const getStoredUsers = () => JSON.parse(localStorage.getItem('niveshUsers') || '{}');
const saveUser = (mobile, userData) => {
  const users = getStoredUsers();
  users[mobile] = userData;
  localStorage.setItem('niveshUsers', JSON.stringify(users));
};
const findUser = (mobile) => getStoredUsers()[mobile] || null;

const LoginScreen = () => {
  const { state, dispatch } = useApp();
  const { language } = state;
  
  const [mode, setMode] = useState('choice'); // choice | signin | signup
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  
  // Form fields
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');

  const resetForm = () => {
    setName('');
    setMobile('');
    setAge('');
    setPassword('');
    setError('');
  };

  const handleSignUp = async () => {
    // Validation
    if (!name.trim()) {
      setError(language === 'hi' ? 'कृपया अपना नाम दर्ज करें' : 'Please enter your name');
      return;
    }
    if (mobile.length !== 10) {
      setError(language === 'hi' ? 'कृपया 10 अंकों का मोबाइल नंबर दर्ज करें' : 'Please enter 10-digit mobile number');
      return;
    }
    if (!age || parseInt(age) > 100) {
      setError(language === 'hi' ? 'कृपया वैध आयु दर्ज करें' : 'Please enter valid age');
      return;
    }
    if (parseInt(age) < 18) {
      setError(language === 'hi' ? 'आप 18 वर्ष से कम हैं, निवेश के लिए पात्र नहीं हैं' : 'You are under 18, not eligible to invest');
      return;
    }
    if (password.length < 4) {
      setError(language === 'hi' ? 'पासवर्ड कम से कम 4 अंकों का होना चाहिए' : 'Password must be at least 4 characters');
      return;
    }

    // Check if user already exists
    if (findUser(mobile)) {
      setShowPopup(true);
      return;
    }

    setLoading(true);
    setError('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Save user
    const userData = {
      id: 'user_' + Date.now(),
      name: name.trim(),
      mobile,
      age: parseInt(age),
      password,
      createdAt: new Date().toISOString()
    };
    saveUser(mobile, userData);

    // Login user
    dispatch({ type: 'SET_USER', payload: userData });
    setLoading(false);
  };

  const handleSignIn = async () => {
    if (mobile.length !== 10) {
      setError(language === 'hi' ? 'कृपया 10 अंकों का मोबाइल नंबर दर्ज करें' : 'Please enter 10-digit mobile number');
      return;
    }
    if (!password) {
      setError(language === 'hi' ? 'कृपया पासवर्ड दर्ज करें' : 'Please enter password');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = findUser(mobile);
    if (!user) {
      setError(language === 'hi' ? 'यह नंबर पंजीकृत नहीं है' : 'This number is not registered');
      setLoading(false);
      return;
    }
    if (user.password !== password) {
      setError(language === 'hi' ? 'गलत पासवर्ड' : 'Incorrect password');
      setLoading(false);
      return;
    }

    // Login user
    dispatch({ type: 'SET_USER', payload: user });
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="full-screen" style={{ justifyContent: 'center', background: 'var(--bg)' }}>
        <Loader message={mode === 'signup' 
          ? (language === 'hi' ? 'खाता बना रहे हैं...' : 'Creating account...') 
          : (language === 'hi' ? 'लॉगिन हो रहा है...' : 'Signing in...')} 
        />
      </div>
    );
  }

  return (
    <div className="full-screen container" style={{ paddingTop: '2rem', position: 'relative', overflow: 'hidden' }}>
      {/* Popup for existing user */}
      {showPopup && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div className="card" style={{ maxWidth: '320px', textAlign: 'center' }}>
            <HiExclamationCircle style={{ fontSize: '3rem', color: 'var(--warning)', marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              {language === 'hi' ? 'खाता पहले से मौजूद है' : 'Account Already Exists'}
            </h3>
            <p className="text-secondary" style={{ fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              {language === 'hi' 
                ? 'इस नंबर से पहले से खाता बना हुआ है। कृपया साइन इन करें।' 
                : 'An account with this number already exists. Please sign in.'}
            </p>
            <div className="flex gap-8">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowPopup(false)}
              >
                {language === 'hi' ? 'रद्द करें' : 'Cancel'}
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setShowPopup(false);
                  setMode('signin');
                  setPassword('');
                }}
              >
                {language === 'hi' ? 'साइन इन करें' : 'Sign In'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Decorative circles */}
      <div className="decoration-circle decoration-circle-1"></div>
      <div className="decoration-circle decoration-circle-2"></div>
      
      <div className="text-center mb-16 fade-in">
        <LanguageToggle />
      </div>
      
      <div className="text-center mb-24 fade-in-up">
        <img 
          src="/icons/logo.jpg" 
          alt="Nivesh Sathi"
          className="float"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
          style={{ 
            width: '80px', 
            height: '80px', 
            borderRadius: '24px',
            objectFit: 'cover',
            margin: '0 auto 1.5rem',
            boxShadow: '0 10px 40px var(--primary-glow)'
          }}
        />
        <div 
          className="float"
          style={{ 
            width: '80px', 
            height: '80px', 
            borderRadius: '24px',
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            boxShadow: '0 10px 40px var(--primary-glow)',
            fontSize: '2.5rem',
            color: 'white'
          }}
        >
          💰
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.5rem' }}>
          <span className="text-gradient">{t('appName', language)}</span>
        </h1>
        <p className="text-secondary" style={{ fontSize: '1rem' }}>{t('tagline', language)}</p>
      </div>

      {/* Choice Screen */}
      {mode === 'choice' && (
        <div className="card scale-in" style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: '700', textAlign: 'center', marginBottom: '1.5rem' }}>
            {language === 'hi' ? 'शुरू करें' : 'Get Started'}
          </h2>
          
          <button 
            className="btn btn-primary mb-12"
            onClick={() => { setMode('signup'); resetForm(); }}
          >
            {language === 'hi' ? 'नया खाता बनाएं' : 'Create New Account'}
            <HiArrowRight />
          </button>
          
          <button 
            className="btn btn-secondary"
            onClick={() => { setMode('signin'); resetForm(); }}
          >
            {language === 'hi' ? 'साइन इन करें' : 'Sign In'}
            <HiArrowRight />
          </button>
        </div>
      )}

      {/* Sign Up Screen */}
      {mode === 'signup' && (
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
              <HiUser style={{ fontSize: '1.5rem', color: 'var(--primary)' }} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.125rem', fontWeight: '700' }}>
                {language === 'hi' ? 'नया खाता बनाएं' : 'Create Account'}
              </h2>
              <p className="text-secondary" style={{ fontSize: '0.875rem' }}>
                {language === 'hi' ? 'अपनी जानकारी दर्ज करें' : 'Enter your details'}
              </p>
            </div>
          </div>
          
          {/* Name */}
          <div className="mb-12">
            <label style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>
              {language === 'hi' ? 'नाम' : 'Name'}
            </label>
            <input
              type="text"
              className="input"
              placeholder={language === 'hi' ? 'अपना नाम दर्ज करें' : 'Enter your name'}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          {/* Mobile */}
          <div className="mb-12">
            <label style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>
              {language === 'hi' ? 'मोबाइल नंबर' : 'Mobile Number'}
            </label>
            <div className="flex items-center gap-8">
              <span style={{ 
                padding: '1rem', 
                background: 'var(--bg-secondary)', 
                borderRadius: 'var(--radius-sm)',
                fontWeight: '600',
                border: '2px solid var(--border)'
              }}>
                +91
              </span>
              <input
                type="tel"
                className="input"
                placeholder={language === 'hi' ? '10 अंकों का नंबर' : '10-digit number'}
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                maxLength={10}
              />
            </div>
          </div>
          
          {/* Age */}
          <div className="mb-12">
            <label style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>
              {language === 'hi' ? 'आयु' : 'Age'}
            </label>
            <div className="flex items-center gap-8">
              <div style={{
                padding: '1rem',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-sm)',
                border: '2px solid var(--border)'
              }}>
                <HiCalendar style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }} />
              </div>
              <input
                type="tel"
                className="input"
                placeholder={language === 'hi' ? 'आयु (18+)' : 'Age (18+)'}
                value={age}
                onChange={(e) => setAge(e.target.value.replace(/\D/g, '').slice(0, 2))}
                maxLength={2}
              />
            </div>
          </div>
          
          {/* Password */}
          <div className="mb-16">
            <label style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>
              {language === 'hi' ? 'पासवर्ड' : 'Password'}
            </label>
            <div className="flex items-center gap-8">
              <div style={{
                padding: '1rem',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-sm)',
                border: '2px solid var(--border)'
              }}>
                <HiLockClosed style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }} />
              </div>
              <input
                type="password"
                className="input"
                placeholder={language === 'hi' ? 'पासवर्ड बनाएं' : 'Create password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          {error && (
            <p className="text-danger mb-16 fade-in" style={{ fontSize: '0.875rem' }}>
              {error}
            </p>
          )}
          
          <button 
            className="btn btn-primary mb-12"
            onClick={handleSignUp}
          >
            {language === 'hi' ? 'खाता बनाएं' : 'Create Account'}
            <HiArrowRight />
          </button>
          
          <button 
            className="btn btn-ghost"
            onClick={() => { setMode('choice'); resetForm(); }}
          >
            <HiArrowLeft />
            {t('back', language)}
          </button>
          
          <p className="text-center text-secondary mt-16" style={{ fontSize: '0.875rem' }}>
            {language === 'hi' ? 'पहले से खाता है?' : 'Already have an account?'}{' '}
            <span 
              style={{ color: 'var(--primary)', fontWeight: '600', cursor: 'pointer' }}
              onClick={() => { setMode('signin'); resetForm(); }}
            >
              {language === 'hi' ? 'साइन इन करें' : 'Sign In'}
            </span>
          </p>
        </div>
      )}

      {/* Sign In Screen */}
      {mode === 'signin' && (
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
              <HiDevicePhoneMobile style={{ fontSize: '1.5rem', color: 'var(--success)' }} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.125rem', fontWeight: '700' }}>
                {language === 'hi' ? 'साइन इन करें' : 'Sign In'}
              </h2>
              <p className="text-secondary" style={{ fontSize: '0.875rem' }}>
                {language === 'hi' ? 'अपने खाते में लॉगिन करें' : 'Login to your account'}
              </p>
            </div>
          </div>
          
          {/* Mobile */}
          <div className="mb-12">
            <label style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>
              {language === 'hi' ? 'मोबाइल नंबर' : 'Mobile Number'}
            </label>
            <div className="flex items-center gap-8">
              <span style={{ 
                padding: '1rem', 
                background: 'var(--bg-secondary)', 
                borderRadius: 'var(--radius-sm)',
                fontWeight: '600',
                border: '2px solid var(--border)'
              }}>
                +91
              </span>
              <input
                type="tel"
                className="input"
                placeholder={language === 'hi' ? '10 अंकों का नंबर' : '10-digit number'}
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                maxLength={10}
              />
            </div>
          </div>
          
          {/* Password */}
          <div className="mb-16">
            <label style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>
              {language === 'hi' ? 'पासवर्ड' : 'Password'}
            </label>
            <div className="flex items-center gap-8">
              <div style={{
                padding: '1rem',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-sm)',
                border: '2px solid var(--border)'
              }}>
                <HiLockClosed style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }} />
              </div>
              <input
                type="password"
                className="input"
                placeholder={language === 'hi' ? 'पासवर्ड दर्ज करें' : 'Enter password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          {error && (
            <p className="text-danger mb-16 fade-in" style={{ fontSize: '0.875rem' }}>
              {error}
            </p>
          )}
          
          <button 
            className="btn btn-success mb-12"
            onClick={handleSignIn}
          >
            {language === 'hi' ? 'साइन इन करें' : 'Sign In'}
            <HiArrowRight />
          </button>
          
          <button 
            className="btn btn-ghost"
            onClick={() => { setMode('choice'); resetForm(); }}
          >
            <HiArrowLeft />
            {t('back', language)}
          </button>
          
          <p className="text-center text-secondary mt-16" style={{ fontSize: '0.875rem' }}>
            {language === 'hi' ? 'नए उपयोगकर्ता?' : 'New user?'}{' '}
            <span 
              style={{ color: 'var(--primary)', fontWeight: '600', cursor: 'pointer' }}
              onClick={() => { setMode('signup'); resetForm(); }}
            >
              {language === 'hi' ? 'खाता बनाएं' : 'Create Account'}
            </span>
          </p>
        </div>
      )}

      <TrustBadges />
    </div>
  );
};

export default LoginScreen;
