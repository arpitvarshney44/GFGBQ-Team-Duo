// Mock API service for demo purposes

// Simulated delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock investment options
export const investmentOptions = [
  {
    id: 'govt-bonds',
    type: 'govtBonds',
    name: { en: 'Government Bonds', hi: 'सरकारी बॉन्ड' },
    description: {
      en: 'Safe investment backed by government. Your money helps build roads, schools, and hospitals.',
      hi: 'सरकार द्वारा समर्थित सुरक्षित निवेश। आपका पैसा सड़कें, स्कूल और अस्पताल बनाने में मदद करता है।'
    },
    minAmount: 10,
    expectedReturns: '6.5-7.5%',
    riskLevel: 'low',
    lockInPeriod: '1 year',
    icon: '🏛️'
  },
  {
    id: 'fixed-deposit',
    type: 'fixedDeposits',
    name: { en: 'Fixed Deposits', hi: 'फिक्स्ड डिपॉजिट' },
    description: {
      en: 'Bank fixed deposits with guaranteed returns. Your money is safe with the bank.',
      hi: 'गारंटीड रिटर्न के साथ बैंक फिक्स्ड डिपॉजिट। आपका पैसा बैंक में सुरक्षित है।'
    },
    minAmount: 100,
    expectedReturns: '5.5-6.5%',
    riskLevel: 'low',
    lockInPeriod: '6 months',
    icon: '🏦'
  },
  {
    id: 'recurring-deposit',
    type: 'recurringDeposits',
    name: { en: 'Recurring Deposits', hi: 'रिकरिंग डिपॉजिट' },
    description: {
      en: 'Save small amounts every month. Build a habit of saving regularly.',
      hi: 'हर महीने छोटी राशि बचाएं। नियमित बचत की आदत बनाएं।'
    },
    minAmount: 10,
    expectedReturns: '5.0-6.0%',
    riskLevel: 'low',
    lockInPeriod: '6 months',
    icon: '📅'
  },
  {
    id: 'mutual-fund-low',
    type: 'mutualFunds',
    name: { en: 'Low Risk Mutual Fund', hi: 'कम जोखिम म्यूचुअल फंड' },
    description: {
      en: 'Professionally managed fund with low risk. Experts invest your money wisely.',
      hi: 'कम जोखिम वाला पेशेवर प्रबंधित फंड। विशेषज्ञ आपके पैसे को समझदारी से निवेश करते हैं।'
    },
    minAmount: 100,
    expectedReturns: '7-9%',
    riskLevel: 'medium',
    lockInPeriod: 'None',
    icon: '📊'
  }
];

// Mock OTP verification
export const sendOtp = async (mobile) => {
  await delay(1000);
  console.log(`OTP sent to ${mobile}: 123456`);
  return { success: true, message: 'OTP sent successfully' };
};

export const verifyOtp = async (mobile, otp) => {
  await delay(1000);
  // Accept any 6-digit OTP for demo
  if (otp.length === 6) {
    return {
      success: true,
      user: {
        id: 'user_' + Date.now(),
        mobile,
        name: 'User'
      }
    };
  }
  return { success: false, message: 'Invalid OTP' };
};

// Mock payment
export const processPayment = async (amount, upiId) => {
  await delay(2000);
  return {
    success: true,
    transactionId: 'TXN' + Date.now(),
    amount,
    timestamp: new Date().toISOString()
  };
};

// Mock investment creation
export const createInvestment = async (investmentData) => {
  await delay(1000);
  return {
    success: true,
    investment: {
      id: 'INV' + Date.now(),
      ...investmentData,
      status: 'active',
      createdAt: new Date().toISOString(),
      currentValue: investmentData.amount
    }
  };
};

// Get portfolio
export const getPortfolio = async () => {
  await delay(500);
  const saved = localStorage.getItem('niveshSathiState');
  if (saved) {
    const state = JSON.parse(saved);
    return state.portfolio || [];
  }
  return [];
};
