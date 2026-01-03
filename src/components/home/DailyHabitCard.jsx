import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { HiCheckCircle, HiFire } from 'react-icons/hi2';

/**
 * Daily ₹10 Habit Card
 * Tracks daily savings habit with streak counter
 * Uses localStorage for offline support
 */
const DailyHabitCard = () => {
  const { state } = useApp();
  const { language } = state;
  
  const [streak, setStreak] = useState(0);
  const [savedToday, setSavedToday] = useState(false);

  // Get today's date as string (YYYY-MM-DD)
  const getToday = () => new Date().toISOString().split('T')[0];

  // Load habit data from localStorage
  useEffect(() => {
    const habitData = JSON.parse(localStorage.getItem('dailyHabit') || '{}');
    const today = getToday();
    
    if (habitData.lastSaveDate === today) {
      setSavedToday(true);
      setStreak(habitData.streak || 0);
    } else {
      // Check if streak should continue or reset
      const lastDate = habitData.lastSaveDate;
      if (lastDate) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        if (lastDate === yesterdayStr) {
          // Streak continues
          setStreak(habitData.streak || 0);
        } else {
          // Streak broken
          setStreak(0);
        }
      }
      setSavedToday(false);
    }
  }, []);

  // Handle save button click
  const handleSave = () => {
    if (savedToday) return;
    
    const today = getToday();
    const habitData = JSON.parse(localStorage.getItem('dailyHabit') || '{}');
    
    let newStreak = 1;
    const lastDate = habitData.lastSaveDate;
    
    if (lastDate) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      if (lastDate === yesterdayStr) {
        newStreak = (habitData.streak || 0) + 1;
      }
    }
    
    // Save to localStorage
    localStorage.setItem('dailyHabit', JSON.stringify({
      lastSaveDate: today,
      streak: newStreak,
      totalSaved: (habitData.totalSaved || 0) + 10
    }));
    
    setStreak(newStreak);
    setSavedToday(true);
  };

  return (
    <div className="card" style={{ background: savedToday ? '#f0fdf4' : 'var(--bg)' }}>
      <div className="flex justify-between items-center">
        <div>
          <p style={{ fontSize: '0.9375rem', fontWeight: '600', marginBottom: '0.25rem' }}>
            {language === 'hi' ? 'क्या आपने आज ₹10 बचाए?' : 'Have you saved ₹10 today?'}
          </p>
          {streak > 0 && (
            <p style={{ fontSize: '0.875rem', color: '#f97316', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <HiFire />
              {streak} {language === 'hi' ? 'दिन की स्ट्रीक' : 'day streak'}
            </p>
          )}
        </div>
        
        <button
          onClick={handleSave}
          disabled={savedToday}
          style={{
            padding: '0.625rem 1rem',
            borderRadius: '8px',
            border: 'none',
            background: savedToday ? '#d1d5db' : '#10b981',
            color: 'white',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: savedToday ? 'default' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem'
          }}
        >
          {savedToday ? (
            <>
              <HiCheckCircle />
              {language === 'hi' ? 'बचाया' : 'Saved'}
            </>
          ) : (
            language === 'hi' ? '₹10 बचाएं' : 'Save ₹10'
          )}
        </button>
      </div>
    </div>
  );
};

export default DailyHabitCard;
