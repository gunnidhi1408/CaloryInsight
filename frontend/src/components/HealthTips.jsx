import { useState, useEffect } from 'react';

// a collection of health and calorie tips
// these rotate randomly each time the component mounts
const tips = [
  "Drinking water before meals can help reduce calorie intake by up to 13%.",
  "Walking for 30 minutes daily burns approximately 150-200 calories.",
  "Eating slowly gives your brain time to register fullness, preventing overeating.",
  "Green tea can slightly boost your metabolism throughout the day.",
  "Getting 7-8 hours of sleep helps regulate hunger hormones.",
  "Adding fiber-rich foods to your diet keeps you fuller for longer.",
  "Cooking at home gives you better control over portions and ingredients.",
  "Standing for an hour burns about 50 more calories than sitting.",
  "Eating protein at breakfast can reduce cravings later in the day.",
  "Small, frequent meals can help maintain steady blood sugar levels.",
  "Spicy foods like chili peppers can temporarily boost your metabolism.",
  "Replacing sugary drinks with water can cut hundreds of daily calories.",
  "Taking the stairs instead of the elevator adds up over time.",
  "Stress eating is real - try deep breathing before reaching for snacks.",
  "A handful of almonds (about 23) contains around 160 calories and lots of nutrients.",
  "Fruits like berries are low in calories but packed with antioxidants.",
  "Stretching for 10 minutes in the morning can improve circulation and energy.",
  "Reading food labels helps you make more informed choices at the store.",
  "Dark chocolate (in moderation) has less sugar than milk chocolate.",
  "Eating vegetables first at meals helps fill you up with fewer calories."
];

const HealthTips = () => {
  const [currentTip, setCurrentTip] = useState('');

  useEffect(() => {
    // pick a random tip on mount
    const randomIndex = Math.floor(Math.random() * tips.length);
    setCurrentTip(tips[randomIndex]);
  }, []);

  const getNewTip = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * tips.length);
    } while (tips[newIndex] === currentTip && tips.length > 1);
    setCurrentTip(tips[newIndex]);
  };

  return (
    <div className="bg-gradient-to-r from-primary-50 to-emerald-50 border border-primary-100 rounded-xl p-5">
      <div className="flex items-start space-x-3">
        <span className="w-8 h-8 rounded-full bg-primary-200 flex items-center justify-center flex-shrink-0 text-primary-700 text-xs font-bold">TIP</span>
        <div className="flex-1">
          <h3 className="text-primary-800 font-semibold text-sm mb-1">Health Tip</h3>
          <p className="text-gray-700 text-sm leading-relaxed">{currentTip}</p>
          <button
            onClick={getNewTip}
            className="mt-2 text-xs text-primary-600 hover:text-primary-800 font-medium transition-colors"
          >
            Show another tip →
          </button>
        </div>
      </div>
    </div>
  );
};

export default HealthTips;
