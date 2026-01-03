/**
 * Money Story - Maps investment amount to relatable message
 * Shows what the user "saved" in everyday terms
 */

const stories = [
  { max: 10, en: "You saved the cost of 1 samosa for your future 🥟", hi: "आपने 1 समोसे की कीमत अपने भविष्य के लिए बचाई 🥟" },
  { max: 20, en: "You saved the cost of a cup of chai ☕", hi: "आपने एक कप चाय की कीमत बचाई ☕" },
  { max: 50, en: "You saved the cost of 2 cups of tea 🍵", hi: "आपने 2 कप चाय की कीमत बचाई 🍵" },
  { max: 100, en: "You saved today's mobile recharge 📱", hi: "आपने आज का मोबाइल रिचार्ज बचाया 📱" },
  { max: 200, en: "You saved a movie ticket 🎬", hi: "आपने एक मूवी टिकट बचाया 🎬" },
  { max: 500, en: "You saved a week's worth of snacks 🍿", hi: "आपने एक हफ्ते के नाश्ते की कीमत बचाई 🍿" },
  { max: 1000, en: "You saved a nice dinner out 🍽️", hi: "आपने एक अच्छे डिनर की कीमत बचाई 🍽️" },
  { max: 2000, en: "You saved a month's internet bill 🌐", hi: "आपने एक महीने का इंटरनेट बिल बचाया 🌐" },
  { max: 5000, en: "You saved a new pair of shoes 👟", hi: "आपने नए जूतों की कीमत बचाई 👟" },
  { max: Infinity, en: "You made a big step towards your dreams 🌟", hi: "आपने अपने सपनों की ओर बड़ा कदम बढ़ाया 🌟" }
];

export const getMoneyStory = (amount, language = 'en') => {
  const story = stories.find(s => amount <= s.max);
  return story ? story[language] : stories[stories.length - 1][language];
};
