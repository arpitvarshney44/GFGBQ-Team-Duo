import { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  language: 'en',
  theme: 'light', // light | dark
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
      const parsed = JSON.parse(saved);
      return { 
        ...initialState, 
        ...parsed,
        isOnline: navigator.onLine
      };
    }
  } catch (e) {
    console.warn('Failed to load state:', e);
  }
  return initialState;
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return { 
        ...initialState, 
        language: state.language,
        theme: state.theme,
        isOnline: state.isOnline
      };
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    case 'SET_ONLINE':
      return { ...state, isOnline: action.payload };
    case 'ADD_INVESTMENT':
      return { ...state, portfolio: [...state.portfolio, action.payload] };
    case 'SET_PORTFOLIO':
      return { ...state, portfolio: action.payload };
    case 'SET_LEARNING_PROGRESS':
      return {
        ...state,
        learningProgress: { ...state.learningProgress, [action.payload]: true }
      };
    case 'RESET_LEARNING':
      return { ...state, learningProgress: initialState.learningProgress };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, null, loadState);

  // Save state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('niveshSathiState', JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to save state:', e);
    }
  }, [state]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

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
