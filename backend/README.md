# Nivesh Sathi - Mock Backend

Lightweight Express server with in-memory data storage for hackathon demo.

## Quick Start

```bash
cd backend
npm install
node index.js
```

Server runs on `http://localhost:3001`

## API Endpoints

### Authentication

**Send OTP**
```
POST /api/auth/send-otp
Body: { "mobile": "9876543210" }
```

**Verify OTP**
```
POST /api/auth/verify-otp
Body: { "mobile": "9876543210", "otp": "123456" }
```
> Demo: Any 6-digit OTP works!

### Investments

**Get Options**
```
GET /api/investments/options
```

**Create Investment**
```
POST /api/investments/create
Body: {
  "userId": "user_123",
  "optionId": "govt-bonds",
  "amount": 100,
  "transactionId": "TXN123"
}
```

### Payments

**Process Payment**
```
POST /api/payments/process
Body: { "amount": 100, "upiId": "user@upi" }
```

### Portfolio

**Get Portfolio**
```
GET /api/portfolio/:userId
```

## Notes

- All data is stored in-memory (resets on server restart)
- No real database or payment integration
- Demo-safe for hackathon presentations
