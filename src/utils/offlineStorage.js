/**
 * Offline Storage Helper
 * Saves and retrieves portfolio data for offline viewing
 */

const PORTFOLIO_KEY = 'offlinePortfolio';

// Save portfolio to localStorage
export const savePortfolioOffline = (portfolio) => {
  try {
    const data = {
      portfolio,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Failed to save portfolio offline:', e);
  }
};

// Get offline portfolio
export const getOfflinePortfolio = () => {
  try {
    const data = localStorage.getItem(PORTFOLIO_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
};

// Format last updated date
export const formatLastUpdated = (isoDate, language = 'en') => {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  const formatted = date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  return language === 'hi' 
    ? `अंतिम अपडेट: ${formatted}` 
    : `Last updated: ${formatted}`;
};
