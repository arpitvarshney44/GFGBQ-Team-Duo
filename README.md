# Nivesh Sathi - निवेश साथी

A lightweight micro-investment PWA for first-time Indian investors. Start investing with just ₹10.

## Features

- 🪙 **Micro-Investment**: Start with as little as ₹10
- 🛡️ **Safe Options**: Government bonds, FDs, RDs, low-risk mutual funds
- 📚 **Financial Education**: Jargon-free learning modules
- 🌐 **Bilingual**: English + Hindi support
- 📱 **PWA**: Works offline, installable on mobile
- 🎯 **Trust-focused**: Clear fee breakdown, regulatory badges

## Tech Stack

- React 18
- Vite
- PWA (Service Worker)
- LocalStorage for offline data

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── auth/          # Login/OTP
│   ├── common/        # Reusable UI
│   ├── education/     # Learning modules
│   ├── home/          # Home screen
│   ├── investment/    # Investment flow
│   ├── portfolio/     # Portfolio view
│   └── profile/       # User profile
├── context/           # React context
├── services/          # Mock APIs
├── styles/            # CSS
└── utils/             # Translations
```

## Demo Flow

1. Enter any 10-digit mobile number
2. Enter any 6-digit OTP (mock)
3. Browse investment options
4. Select amount (min ₹10)
5. Enter any UPI ID (e.g., test@upi)
6. View portfolio

## Target Users

- First-time investors
- Rural and semi-urban users
- Low-income individuals
- Users with low financial literacy
- Users on low-end smartphones (2G/3G)

## Mission

Democratize investing and help every Indian start their financial journey with confidence, one small step at a time.
