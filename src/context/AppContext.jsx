import { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  language: 'en',
  theme: 'light',
  isOnline: navigator.onLine,
  portfolio: [],
  learningProgress: {
    whatIsInvesting: false,
    whyInvest: false,
    typesOfInvestments: false,
    howToStart: false
  }
};

// Get user-specific storage key
const getUserKey = (mobile) => `niveshSathi_user_${mobile}`;

// Load state from localStorage
const loadState = () => {
  try {
    const saved = localStorage.getItem('niveshSathiState');
    if (saved) {
      const parsed = JSON.parse(saved);
      
      // If user exists, load their specific data
      if (parsed.user?.mobile && parsed.isAuthenticated) {
        const userData = loadUserData(parsed.user.mobile);
        return {
          ...initialState,
          user: parsed.user,
          isAuthenticated: true,
          language: parsed.language || 'en',
          theme: parsed.theme || 'light',
          // Load ONLY this user's data, not any stale data
          portfolio: userData?.portfolio || [],
          learningProgress: userData?.learningProgress || initialState.learningProgress,
          isOnline: navigator.onLine
        };
      }
      
      // No authenticated user - return clean state with just preferences
      return { 
        ...initialState, 
        language: parsed.language || 'en',
        theme: parsed.theme || 'light',
        isOnline: navigator.onLine
      };
    }
  } catch (e) {
    console.warn('Failed to load state:', e);
  }
  return initialState;
};

// Save user-specific data
const saveUserData = (mobile, portfolio, learningProgress) => {
  if (!mobile) return;
  try {
    const userDataKey = getUserKey(mobile);
    localStorage.setItem(userDataKey, JSON.stringify({
      portfolio,
      learningProgress
    }));
  } catch (e) {
    console.warn('Failed to save user data:', e);
  }
};

// Load user-specific data
const loadUserData = (mobile) => {
  if (!mobile) return null;
  try {
    const userDataKey = getUserKey(mobile);
    const data = localStorage.getItem(userDataKey);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER': {
      const user = action.payload;
      // Load user-specific data or start completely fresh for new users
      const userData = loadUserData(user.mobile);
      
      // Always reset to clean state for this user - don't carry over any previous user's data
      return { 
        ...state, 
        user, 
        isAuthenticated: true,
        // Use this user's data if exists, otherwise start completely fresh
        portfolio: userData?.portfolio || [],
        learningProgress: userData?.learningProgress || {
          whatIsInvesting: false,
          whyInvest: false,
          typesOfInvestments: false,
          howToStart: false
        }
      };
    }
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
      // Save general state (without user-specific data)
      localStorage.setItem('niveshSathiState', JSON.stringify({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        language: state.language,
        theme: state.theme
      }));
      
      // Save user-specific data separately
      if (state.user?.mobile) {
        saveUserData(state.user.mobile, state.portfolio, state.learningProgress);
      }
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
