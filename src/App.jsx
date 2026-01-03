import React, { useState, useCallback } from 'react';
import { useApp } from './context/AppContext';
import LoginScreen from './components/auth/LoginScreen';
import HomeScreen from './components/home/HomeScreen';
import PortfolioScreen from './components/portfolio/PortfolioScreen';
import LearnScreen from './components/education/LearnScreen';
import ProfileScreen from './components/profile/ProfileScreen';
import InvestmentFlow from './components/investment/InvestmentFlow';
import BottomNav from './components/common/BottomNav';
import OfflineBanner from './components/common/OfflineBanner';

const App = () => {
  const { state } = useApp();
  const { isAuthenticated } = state;
  
  const [currentPage, setCurrentPage] = useState('home');
  const [pageHistory, setPageHistory] = useState(['home']);
  const [showInvestFlow, setShowInvestFlow] = useState(false);

  // Navigate to a page
  const navigateTo = useCallback((page) => {
    setPageHistory(prev => [...prev, page]);
    setCurrentPage(page);
  }, []);

  // Go back to previous page
  const goBack = useCallback(() => {
    if (pageHistory.length > 1) {
      const newHistory = [...pageHistory];
      newHistory.pop();
      setPageHistory(newHistory);
      setCurrentPage(newHistory[newHistory.length - 1]);
    }
  }, [pageHistory]);

  // Handle bottom nav click
  const handleNavClick = useCallback((page) => {
    setPageHistory([page]);
    setCurrentPage(page);
  }, []);

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  // Show investment flow
  if (showInvestFlow) {
    return (
      <InvestmentFlow 
        onClose={() => {
          setShowInvestFlow(false);
          setPageHistory(['portfolio']);
          setCurrentPage('portfolio');
        }}
        onBack={() => setShowInvestFlow(false)}
      />
    );
  }

  const handleInvest = () => setShowInvestFlow(true);
  const handleLearn = () => navigateTo('learn');
  const canGoBack = pageHistory.length > 1;

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomeScreen onInvest={handleInvest} onLearn={handleLearn} />;
      case 'portfolio':
        return (
          <PortfolioScreen 
            onInvest={handleInvest} 
            onBack={canGoBack ? goBack : null}
          />
        );
      case 'learn':
        return <LearnScreen onBack={canGoBack ? goBack : null} />;
      case 'profile':
        return <ProfileScreen onBack={canGoBack ? goBack : null} />;
      default:
        return <HomeScreen onInvest={handleInvest} onLearn={handleLearn} />;
    }
  };

  return (
    <div className="full-screen">
      <OfflineBanner />
      {renderPage()}
      <BottomNav currentPage={currentPage} onNavigate={handleNavClick} />
    </div>
  );
};

export default App;
