export const translations = {
  en: {
    // Common
    appName: 'Nivesh Sathi',
    tagline: 'Start investing with just ₹10',
    continue: 'Continue',
    back: 'Back',
    home: 'Home',
    portfolio: 'Portfolio',
    learn: 'Learn',
    profile: 'Profile',
    loading: 'Loading...',
    
    // Auth
    welcome: 'Welcome to Nivesh Sathi',
    enterMobile: 'Enter your mobile number',
    mobileNumber: 'Mobile Number',
    sendOtp: 'Send OTP',
    enterOtp: 'Enter OTP',
    otpSent: 'OTP sent to',
    verifyOtp: 'Verify OTP',
    resendOtp: 'Resend OTP',
    
    // Investment
    investNow: 'Invest Now',
    minInvestment: 'Minimum ₹10',
    selectAmount: 'Select Amount',
    customAmount: 'Custom Amount',
    investmentOptions: 'Investment Options',
    govtBonds: 'Government Bonds',
    fixedDeposits: 'Fixed Deposits',
    mutualFunds: 'Mutual Funds',
    recurringDeposits: 'Recurring Deposits',
    expectedReturns: 'Expected Returns',
    riskLevel: 'Risk Level',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    
    // Payment
    payViaUpi: 'Pay via UPI',
    enterUpiId: 'Enter UPI ID',
    confirmPayment: 'Confirm Payment',
    paymentSuccess: 'Payment Successful!',
    investmentConfirmed: 'Your investment is confirmed',
    
    // Portfolio
    myPortfolio: 'My Portfolio',
    totalInvested: 'Total Invested',
    currentValue: 'Current Value',
    returns: 'Returns',
    noInvestments: 'No investments yet',
    startInvesting: 'Start your investment journey',
    
    // Education
    learnToInvest: 'Learn to Invest',
    whatIsInvesting: 'What is Investing?',
    whyInvest: 'Why should you invest?',
    typesOfInvestments: 'Types of Investments',
    howToStart: 'How to start?',
    completed: 'Completed',
    
    // Trust
    noHiddenFees: 'No Hidden Fees',
    secureInvestment: 'Secure Investment',
    rbiRegulated: 'RBI Regulated',
    sebiRegistered: 'SEBI Registered',
    moneyBreakdown: 'Where your money goes',
    
    // Offline
    offlineMode: 'You are offline',
    offlineMessage: 'Some features may not be available'
  },
  hi: {
    // Common
    appName: 'निवेश साथी',
    tagline: 'सिर्फ ₹10 से निवेश शुरू करें',
    continue: 'आगे बढ़ें',
    back: 'वापस',
    home: 'होम',
    portfolio: 'पोर्टफोलियो',
    learn: 'सीखें',
    profile: 'प्रोफाइल',
    loading: 'लोड हो रहा है...',
    
    // Auth
    welcome: 'निवेश साथी में आपका स्वागत है',
    enterMobile: 'अपना मोबाइल नंबर दर्ज करें',
    mobileNumber: 'मोबाइल नंबर',
    sendOtp: 'OTP भेजें',
    enterOtp: 'OTP दर्ज करें',
    otpSent: 'OTP भेजा गया',
    verifyOtp: 'OTP सत्यापित करें',
    resendOtp: 'OTP दोबारा भेजें',
    
    // Investment
    investNow: 'अभी निवेश करें',
    minInvestment: 'न्यूनतम ₹10',
    selectAmount: 'राशि चुनें',
    customAmount: 'अपनी राशि',
    investmentOptions: 'निवेश विकल्प',
    govtBonds: 'सरकारी बॉन्ड',
    fixedDeposits: 'फिक्स्ड डिपॉजिट',
    mutualFunds: 'म्यूचुअल फंड',
    recurringDeposits: 'रिकरिंग डिपॉजिट',
    expectedReturns: 'अपेक्षित रिटर्न',
    riskLevel: 'जोखिम स्तर',
    low: 'कम',
    medium: 'मध्यम',
    high: 'अधिक',
    
    // Payment
    payViaUpi: 'UPI से भुगतान करें',
    enterUpiId: 'UPI ID दर्ज करें',
    confirmPayment: 'भुगतान की पुष्टि करें',
    paymentSuccess: 'भुगतान सफल!',
    investmentConfirmed: 'आपका निवेश पुष्टि हो गया',
    
    // Portfolio
    myPortfolio: 'मेरा पोर्टफोलियो',
    totalInvested: 'कुल निवेश',
    currentValue: 'वर्तमान मूल्य',
    returns: 'रिटर्न',
    noInvestments: 'अभी कोई निवेश नहीं',
    startInvesting: 'अपनी निवेश यात्रा शुरू करें',
    
    // Education
    learnToInvest: 'निवेश करना सीखें',
    whatIsInvesting: 'निवेश क्या है?',
    whyInvest: 'निवेश क्यों करें?',
    typesOfInvestments: 'निवेश के प्रकार',
    howToStart: 'कैसे शुरू करें?',
    completed: 'पूर्ण',
    
    // Trust
    noHiddenFees: 'कोई छुपी फीस नहीं',
    secureInvestment: 'सुरक्षित निवेश',
    rbiRegulated: 'RBI विनियमित',
    sebiRegistered: 'SEBI पंजीकृत',
    moneyBreakdown: 'आपका पैसा कहाँ जाता है',
    
    // Offline
    offlineMode: 'आप ऑफलाइन हैं',
    offlineMessage: 'कुछ सुविधाएं उपलब्ध नहीं हो सकतीं'
  }
};

export const t = (key, lang = 'en') => translations[lang]?.[key] || translations.en[key] || key;
