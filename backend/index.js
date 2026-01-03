/**
 * Nivesh Sathi - Mock Backend Server
 * Lightweight Express server with in-memory data storage
 * Run with: node index.js
 */

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// ============================================
// IN-MEMORY DATABASE (Mock Data Storage)
// ============================================

// Users database
const users = {};

// OTP storage (mobile -> otp)
const otpStore = {};

// Investment options
const investmentOptions = [
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

// Portfolios storage (userId -> investments[])
const portfolios = {};

// ============================================
// HELPER FUNCTIONS
// ============================================

// Generate random 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Generate unique ID
const generateId = (prefix) => `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Generate transaction ID
const generateTxnId = () => `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`;

// Simulate network delay (100-500ms)
const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 400));

// ============================================
// API ROUTES
// ============================================

/**
 * Health Check
 * GET /api/health
 */
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Nivesh Sathi Backend Running',
    timestamp: new Date().toISOString()
  });
});

/**
 * Send OTP
 * POST /api/auth/send-otp
 * Body: { mobile: "9876543210" }
 */
app.post('/api/auth/send-otp', async (req, res) => {
  await simulateDelay();
  
  const { mobile } = req.body;
  
  // Validate mobile number
  if (!mobile || mobile.length !== 10 || !/^\d+$/.test(mobile)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid mobile number. Please enter 10 digits.'
    });
  }
  
  // Generate and store OTP (in production, this would be sent via SMS)
  const otp = generateOTP();
  otpStore[mobile] = otp;
  
  // Log OTP for demo purposes
  console.log(`📱 OTP for ${mobile}: ${otp} (Demo: any 6 digits work)`);
  
  res.json({
    success: true,
    message: 'OTP sent successfully',
    // Include OTP in response for demo (remove in production!)
    demo_otp: otp
  });
});

/**
 * Verify OTP & Login
 * POST /api/auth/verify-otp
 * Body: { mobile: "9876543210", otp: "123456" }
 */
app.post('/api/auth/verify-otp', async (req, res) => {
  await simulateDelay();
  
  const { mobile, otp } = req.body;
  
  // Validate inputs
  if (!mobile || !otp) {
    return res.status(400).json({
      success: false,
      message: 'Mobile and OTP are required'
    });
  }
  
  // For demo: accept any 6-digit OTP
  if (otp.length !== 6) {
    return res.status(400).json({
      success: false,
      message: 'Invalid OTP. Please enter 6 digits.'
    });
  }
  
  // Create or get user
  let user = users[mobile];
  if (!user) {
    user = {
      id: generateId('user'),
      mobile,
      name: 'Investor',
      createdAt: new Date().toISOString()
    };
    users[mobile] = user;
    portfolios[user.id] = [];
    console.log(`👤 New user created: ${user.id}`);
  }
  
  // Clear OTP
  delete otpStore[mobile];
  
  res.json({
    success: true,
    message: 'Login successful',
    user: {
      id: user.id,
      mobile: user.mobile,
      name: user.name
    }
  });
});

/**
 * Get Investment Options
 * GET /api/investments/options
 */
app.get('/api/investments/options', async (req, res) => {
  await simulateDelay();
  
  res.json({
    success: true,
    data: investmentOptions
  });
});

/**
 * Get Single Investment Option
 * GET /api/investments/options/:id
 */
app.get('/api/investments/options/:id', async (req, res) => {
  await simulateDelay();
  
  const option = investmentOptions.find(opt => opt.id === req.params.id);
  
  if (!option) {
    return res.status(404).json({
      success: false,
      message: 'Investment option not found'
    });
  }
  
  res.json({
    success: true,
    data: option
  });
});

/**
 * Process Payment (Mock UPI)
 * POST /api/payments/process
 * Body: { amount: 100, upiId: "user@upi" }
 */
app.post('/api/payments/process', async (req, res) => {
  // Simulate payment processing delay
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
  
  const { amount, upiId } = req.body;
  
  // Validate
  if (!amount || amount < 10) {
    return res.status(400).json({
      success: false,
      message: 'Minimum investment amount is ₹10'
    });
  }
  
  if (!upiId || !upiId.includes('@')) {
    return res.status(400).json({
      success: false,
      message: 'Invalid UPI ID'
    });
  }
  
  // Mock payment success (in production, integrate with payment gateway)
  const transactionId = generateTxnId();
  
  console.log(`💳 Payment processed: ₹${amount} via ${upiId} | TXN: ${transactionId}`);
  
  res.json({
    success: true,
    message: 'Payment successful',
    data: {
      transactionId,
      amount,
      upiId,
      status: 'completed',
      timestamp: new Date().toISOString()
    }
  });
});

/**
 * Create Investment
 * POST /api/investments/create
 * Body: { userId, optionId, amount, transactionId }
 */
app.post('/api/investments/create', async (req, res) => {
  await simulateDelay();
  
  const { userId, optionId, amount, transactionId } = req.body;
  
  // Validate
  if (!userId || !optionId || !amount || !transactionId) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields'
    });
  }
  
  // Find investment option
  const option = investmentOptions.find(opt => opt.id === optionId);
  if (!option) {
    return res.status(404).json({
      success: false,
      message: 'Investment option not found'
    });
  }
  
  // Validate minimum amount
  if (amount < option.minAmount) {
    return res.status(400).json({
      success: false,
      message: `Minimum investment for ${option.name.en} is ₹${option.minAmount}`
    });
  }
  
  // Create investment record
  const investment = {
    id: generateId('inv'),
    optionId,
    optionName: option.name,
    optionIcon: option.icon,
    amount,
    transactionId,
    status: 'active',
    expectedReturns: option.expectedReturns,
    riskLevel: option.riskLevel,
    createdAt: new Date().toISOString(),
    currentValue: amount // Initial value equals invested amount
  };
  
  // Add to portfolio
  if (!portfolios[userId]) {
    portfolios[userId] = [];
  }
  portfolios[userId].push(investment);
  
  console.log(`📈 Investment created: ${investment.id} | ₹${amount} in ${option.name.en}`);
  
  res.json({
    success: true,
    message: 'Investment created successfully',
    data: investment
  });
});

/**
 * Get User Portfolio
 * GET /api/portfolio/:userId
 */
app.get('/api/portfolio/:userId', async (req, res) => {
  await simulateDelay();
  
  const { userId } = req.params;
  const userPortfolio = portfolios[userId] || [];
  
  // Calculate portfolio summary with mock returns
  const investments = userPortfolio.map(inv => {
    // Simulate small positive returns (1-3%)
    const returnPercent = 1 + Math.random() * 2;
    const currentValue = Math.round(inv.amount * (1 + returnPercent / 100));
    return {
      ...inv,
      currentValue,
      returns: currentValue - inv.amount,
      returnPercent: returnPercent.toFixed(2)
    };
  });
  
  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const currentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalReturns = currentValue - totalInvested;
  const overallReturnPercent = totalInvested > 0 
    ? ((totalReturns / totalInvested) * 100).toFixed(2) 
    : 0;
  
  res.json({
    success: true,
    data: {
      summary: {
        totalInvested,
        currentValue,
        totalReturns,
        overallReturnPercent,
        investmentCount: investments.length
      },
      investments
    }
  });
});

/**
 * Get Learning Progress (Mock)
 * GET /api/learning/:userId
 */
app.get('/api/learning/:userId', async (req, res) => {
  await simulateDelay();
  
  res.json({
    success: true,
    data: {
      completedLessons: [],
      totalLessons: 4,
      progress: 0
    }
  });
});

/**
 * Update Learning Progress (Mock)
 * POST /api/learning/:userId/complete
 * Body: { lessonId: "whatIsInvesting" }
 */
app.post('/api/learning/:userId/complete', async (req, res) => {
  await simulateDelay();
  
  const { lessonId } = req.body;
  
  res.json({
    success: true,
    message: `Lesson "${lessonId}" marked as complete`,
    data: { lessonId, completedAt: new Date().toISOString() }
  });
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.path}`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   💰 Nivesh Sathi Mock Backend                        ║
║   Server running on http://localhost:${PORT}            ║
║                                                       ║
║   API Endpoints:                                      ║
║   • POST /api/auth/send-otp                          ║
║   • POST /api/auth/verify-otp                        ║
║   • GET  /api/investments/options                    ║
║   • POST /api/payments/process                       ║
║   • POST /api/investments/create                     ║
║   • GET  /api/portfolio/:userId                      ║
║                                                       ║
║   Demo Mode: Any 6-digit OTP works!                  ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
  `);
});
