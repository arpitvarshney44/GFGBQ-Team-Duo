import { useApp } from '../../context/AppContext';
import { HiSun, HiMoon } from 'react-icons/hi2';

const ThemeToggle = () => {
  const { state, dispatch } = useApp();
  const { theme } = state;

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  return (
    <button
      onClick={toggleTheme}
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: 'none',
        background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'var(--bg-secondary)',
        color: theme === 'dark' ? '#fbbf24' : 'var(--text-secondary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? <HiSun style={{ fontSize: '1.25rem' }} /> : <HiMoon style={{ fontSize: '1.25rem' }} />}
    </button>
  );
};

export default ThemeToggle;
