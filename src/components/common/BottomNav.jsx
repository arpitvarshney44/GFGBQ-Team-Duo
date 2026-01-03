import React from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';
import { HiHome, HiAcademicCap, HiUser } from 'react-icons/hi2';
import { HiOutlineHome, HiOutlineAcademicCap, HiOutlineUser } from 'react-icons/hi2';
import { RiWallet3Fill, RiWallet3Line } from 'react-icons/ri';

const BottomNav = ({ currentPage, onNavigate }) => {
  const { state } = useApp();
  const { language } = state;

  const navItems = [
    { 
      id: 'home', 
      icon: HiOutlineHome, 
      activeIcon: HiHome, 
      label: t('home', language) 
    },
    { 
      id: 'portfolio', 
      icon: RiWallet3Line, 
      activeIcon: RiWallet3Fill, 
      label: t('portfolio', language) 
    },
    { 
      id: 'learn', 
      icon: HiOutlineAcademicCap, 
      activeIcon: HiAcademicCap, 
      label: t('learn', language) 
    },
    { 
      id: 'profile', 
      icon: HiOutlineUser, 
      activeIcon: HiUser, 
      label: t('profile', language) 
    }
  ];

  return (
    <nav className="bottom-nav" role="navigation" aria-label="Main navigation">
      {navItems.map(item => {
        const isActive = currentPage === item.id;
        const Icon = isActive ? item.activeIcon : item.icon;
        
        return (
          <button
            key={item.id}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
            aria-current={isActive ? 'page' : undefined}
            aria-label={item.label}
          >
            <Icon className="nav-icon" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
