import React from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';

const BottomNav = ({ currentPage, onNavigate }) => {
  const { state } = useApp();
  const { language } = state;

  const navItems = [
    { id: 'home', icon: '🏠', label: t('home', language) },
    { id: 'portfolio', icon: '💼', label: t('portfolio', language) },
    { id: 'learn', icon: '📚', label: t('learn', language) },
    { id: 'profile', icon: '👤', label: t('profile', language) }
  ];

  return (
    <nav className="bottom-nav" role="navigation" aria-label="Main navigation">
      {navItems.map(item => (
        <button
          key={item.id}
          className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
          onClick={() => onNavigate(item.id)}
          aria-current={currentPage === item.id ? 'page' : undefined}
          aria-label={item.label}
        >
          <span className="nav-icon" aria-hidden="true">{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
