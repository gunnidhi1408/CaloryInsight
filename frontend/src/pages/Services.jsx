import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Services = () => {
  const { user } = useAuth();

  const services = [
    {
      abbr: 'CAL',
      abbrColor: 'bg-orange-100 text-orange-700',
      title: 'Calorie Burn Calculator',
      description: 'Calculate how many calories you burn during various exercises. Just enter your weight, choose an activity, and set the duration.',
      link: '/calorie-burn',
      color: 'from-orange-50 to-red-50',
      borderColor: 'border-orange-100'
    },
    {
      abbr: 'BMI',
      abbrColor: 'bg-blue-100 text-blue-700',
      title: 'BMI Calculator',
      description: 'Find out your Body Mass Index by entering your height and weight. Get your BMI value, category, and healthy weight range.',
      link: '/bmi',
      color: 'from-blue-50 to-indigo-50',
      borderColor: 'border-blue-100'
    },
    {
      abbr: 'FD',
      abbrColor: 'bg-green-100 text-green-700',
      title: 'Food Calorie Finder',
      description: 'Search our database of 50+ common foods to check calories, protein, carbs, fat, and fiber content per 100 grams.',
      link: '/food-search',
      color: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-100'
    },
    {
      abbr: 'GTS',
      abbrColor: 'bg-purple-100 text-purple-700',
      title: 'Goal Tracking System',
      description: 'Set your personal weight loss or gain goals. Track your progress over days with visual progress bars and percentages.',
      link: '/goals',
      color: 'from-purple-50 to-violet-50',
      borderColor: 'border-purple-100'
    },
    {
      abbr: 'LOG',
      abbrColor: 'bg-teal-100 text-teal-700',
      title: 'Daily Log / Journal',
      description: 'Keep a daily record of the food you eat and the exercises you perform. Store everything securely in your database.',
      link: '/journal',
      color: 'from-teal-50 to-cyan-50',
      borderColor: 'border-teal-100'
    },
    {
      abbr: 'EXP',
      abbrColor: 'bg-indigo-100 text-indigo-700',
      title: 'Export Report',
      description: 'Download detailed PDF or text reports of your BMI history and Calorie burn sessions.',
      link: '/export',
      color: 'from-indigo-50 to-blue-50',
      borderColor: 'border-indigo-100'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Our Services</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          CaloryInsight offers a set of free health tools designed to help you understand your
          body better and make informed choices about nutrition and fitness.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, idx) => (
          <div
            key={idx}
            className={`bg-gradient-to-br ${service.color} border ${service.borderColor} rounded-xl p-6 hover:shadow-md transition-shadow`}
          >
            <div className={`w-10 h-10 rounded-lg ${service.abbrColor} flex items-center justify-center mb-4`}><span className="font-bold text-xs">{service.abbr}</span></div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{service.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.description}</p>
            {user ? (
              <Link
                to={service.link}
                className="inline-block text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
              >
                Use this tool →
              </Link>
            ) : (
              <Link
                to="/login"
                className="inline-block text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
              >
                Login to use →
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
