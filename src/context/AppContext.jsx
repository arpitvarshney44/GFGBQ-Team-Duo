import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  language: 'en',
  isOnline: navigator.onLine,
  portfolio: [],
  learningProgress: {
    whatIsInvesting: false,
    whyInvest: false,
    typesOfInvestments: false,
    howToStart: false
  }
};

// Load state from localStorage
const loadState = () => {
  try {
    const saved = localStorage.getItem('niveshSathiState');
    if (saved) {
      return { ...initialState, ...JSON.parse(saved) };
    }
  } catch (e) {}
  return initialState;
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false };
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'SET_ONLINE':
      return { ...state, isOnline: action.payload };
    case 'ADD_INVESTMENT':
      return { ...state, portfolio: [...state.portfolio, action.payload] };
    case 'SET_LEARNING_PROGRESS':
      return {
        ...state,
        learningProgress: { ...state.learningProgress, [action.payload]: true }
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, loadState());

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('niveshSathiState', JSON.stringify(state));
  }, [state]);

  // Online/offline detection
  useEffect(() => {
    const handleOnline = () => dispatch({ type: 'SET_ONLINE', payload: true });
    const handleOffline = () => dispatch({ type: 'SET_ONLINE', payload: false });
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
