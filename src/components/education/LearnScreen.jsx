import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';
import Header from '../common/Header';
import LessonCard from './LessonCard';
import LessonContent from './LessonContent';
import { HiSparkles, HiTrophy } from 'react-icons/hi2';

const lessons = [
  {
    id: 'whatIsInvesting',
    icon: '💡',
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.1)',
    content: {
      en: {
        title: 'What is Investing?',
        points: [
          'Investing means putting your money to work so it can grow over time.',
          'Instead of keeping money under your mattress, you give it to banks, government, or companies.',
          'They use your money and pay you back more than you gave them.',
          'Think of it like planting a seed - you put in a little, and over time it grows into something bigger!'
        ]
      },
      hi: {
        title: 'निवेश क्या है?',
        points: [
          'निवेश का मतलब है अपने पैसे को काम पर लगाना ताकि वह समय के साथ बढ़ सके।',
          'पैसे को तकिए के नीचे रखने के बजाय, आप इसे बैंक, सरकार या कंपनियों को देते हैं।',
          'वे आपके पैसे का उपयोग करते हैं और आपको जितना दिया उससे ज्यादा वापस देते हैं।',
          'इसे एक बीज बोने की तरह समझें - आप थोड़ा डालते हैं, और समय के साथ यह कुछ बड़ा बन जाता है!'
        ]
      }
    }
  },
  {
    id: 'whyInvest',
    icon: '🎯',
    color: '#6366f1',
    bg: 'rgba(99, 102, 241, 0.1)',
    content: {
      en: {
        title: 'Why Should You Invest?',
        points: [
          'Beat Inflation: Prices go up every year. ₹100 today will buy less next year. Investing helps your money keep up.',
          'Build Wealth: Small amounts invested regularly can become big over time.',
          'Achieve Goals: Save for a bike, phone, wedding, or your children\'s education.',
          'Financial Security: Have money ready for emergencies and retirement.'
        ]
      },
      hi: {
        title: 'निवेश क्यों करें?',
        points: [
          'महंगाई से लड़ें: हर साल कीमतें बढ़ती हैं। आज के ₹100 से अगले साल कम चीजें मिलेंगी। निवेश आपके पैसे को बनाए रखने में मदद करता है।',
          'धन बनाएं: नियमित रूप से निवेश की गई छोटी राशि समय के साथ बड़ी हो सकती है।',
          'लक्ष्य पूरे करें: बाइक, फोन, शादी या बच्चों की पढ़ाई के लिए बचत करें।',
          'वित्तीय सुरक्षा: आपातकाल और रिटायरमेंट के लिए पैसे तैयार रखें।'
        ]
      }
    }
  },
  {
    id: 'typesOfInvestments',
    icon: '📊',
    color: '#10b981',
    bg: 'rgba(16, 185, 129, 0.1)',
    content: {
      en: {
        title: 'Types of Investments',
        points: [
          'Government Bonds: Safest option. You lend money to the government, they pay you back with interest.',
          'Fixed Deposits: Put money in bank for a fixed time. Get guaranteed returns.',
          'Recurring Deposits: Save small amounts every month. Great for building habit.',
          'Mutual Funds: Experts invest your money in many places. Can give higher returns but has some risk.'
        ]
      },
      hi: {
        title: 'निवेश के प्रकार',
        points: [
          'सरकारी बॉन्ड: सबसे सुरक्षित विकल्प। आप सरकार को पैसे उधार देते हैं, वे ब्याज के साथ वापस करते हैं।',
          'फिक्स्ड डिपॉजिट: एक निश्चित समय के लिए बैंक में पैसे रखें। गारंटीड रिटर्न पाएं।',
          'रिकरिंग डिपॉजिट: हर महीने छोटी राशि बचाएं। आदत बनाने के लिए बढ़िया।',
          'म्यूचुअल फंड: विशेषज्ञ आपके पैसे को कई जगह निवेश करते हैं। ज्यादा रिटर्न दे सकता है लेकिन कुछ जोखिम है।'
        ]
      }
    }
  },
  {
    id: 'howToStart',
    icon: '🚀',
    color: '#ec4899',
    bg: 'rgba(236, 72, 153, 0.1)',
    content: {
      en: {
        title: 'How to Start Investing?',
        points: [
          'Start Small: Begin with just ₹10. You don\'t need a lot of money to start.',
          'Choose Safe Options: As a beginner, pick low-risk investments like government bonds or FDs.',
          'Be Regular: Invest a small amount every month. Consistency is key.',
          'Be Patient: Investing is a long-term game. Don\'t expect to get rich overnight.',
          'Learn More: Keep learning about different investment options as you grow.'
        ]
      },
      hi: {
        title: 'निवेश कैसे शुरू करें?',
        points: [
          'छोटे से शुरू करें: सिर्फ ₹10 से शुरू करें। शुरू करने के लिए बहुत पैसे की जरूरत नहीं।',
          'सुरक्षित विकल्प चुनें: शुरुआत में कम जोखिम वाले निवेश जैसे सरकारी बॉन्ड या FD चुनें।',
          'नियमित रहें: हर महीने छोटी राशि निवेश करें। नियमितता महत्वपूर्ण है।',
          'धैर्य रखें: निवेश एक लंबी दौड़ है। रातोंरात अमीर बनने की उम्मीद न करें।',
          'और सीखें: जैसे-जैसे आप बढ़ें, विभिन्न निवेश विकल्पों के बारे में सीखते रहें।'
        ]
      }
    }
  }
];

const LearnScreen = ({ onBack }) => {
  const { state, dispatch } = useApp();
  const { language, learningProgress } = state;
  
  const [selectedLesson, setSelectedLesson] = useState(null);

  const completedCount = Object.values(learningProgress).filter(Boolean).length;
  const progressPercent = (completedCount / lessons.length) * 100;
  const allCompleted = completedCount === lessons.length;

  const handleComplete = (lessonId) => {
    dispatch({ type: 'SET_LEARNING_PROGRESS', payload: lessonId });
    setSelectedLesson(null);
  };

  if (selectedLesson) {
    return (
      <LessonContent
        lesson={selectedLesson}
        onComplete={() => handleComplete(selectedLesson.id)}
        onBack={() => setSelectedLesson(null)}
      />
    );
  }

  return (
    <div>
      <Header 
        title={t('learnToInvest', language)} 
        showBack={!!onBack}
        onBack={onBack}
      />
      
      <div className="container page-content">
        {/* Progress Card */}
        <div className={`card ${allCompleted ? 'card-success' : ''}`} style={{ border: allCompleted ? 'none' : undefined }}>
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-8">
              {allCompleted ? (
                <HiTrophy style={{ fontSize: '1.25rem' }} />
              ) : (
                <HiSparkles style={{ fontSize: '1.25rem', color: 'var(--primary)' }} />
              )}
              <span style={{ fontSize: '0.9375rem', fontWeight: '600' }}>
                {allCompleted 
                  ? (language === 'hi' ? 'बधाई हो! सब पूर्ण!' : 'Congrats! All done!')
                  : (language === 'hi' ? 'आपकी प्रगति' : 'Your Progress')}
              </span>
            </div>
            <span style={{ fontSize: '0.875rem', fontWeight: '700' }}>
              {completedCount}/{lessons.length}
            </span>
          </div>
          <div className="progress-bar" style={{ 
            background: allCompleted ? 'rgba(255,255,255,0.2)' : undefined 
          }}>
            <div 
              className="progress-fill" 
              style={{ 
                width: `${progressPercent}%`,
                background: allCompleted ? 'white' : undefined
              }} 
            />
          </div>
        </div>
        
        {/* Lessons */}
        {lessons.map((lesson, index) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            isCompleted={learningProgress[lesson.id]}
            onSelect={() => setSelectedLesson(lesson)}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default LearnScreen;
