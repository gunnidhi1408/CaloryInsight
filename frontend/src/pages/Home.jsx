import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* hero section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              Take Control of Your <span className="text-primary-200">Health Journey</span>
            </h1>
            <p className="text-lg sm:text-xl text-primary-100 mb-8 leading-relaxed">
              CaloryInsight helps you track calories burned during exercise, calculate your BMI,
              and discover nutritional information about the foods you eat — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link
                  to="/dashboard"
                  className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
                  >
                    Get Started Free
                  </Link>
                  <Link
                    to="/login"
                    className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* features section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          What Can You Do With CaloryInsight?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* calorie burn */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center mb-4"><span className="text-orange-600 font-bold text-sm">CAL</span></div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Calorie Burn Calculator</h3>
            <p className="text-gray-600 leading-relaxed">
              Enter your details and exercise type to find out exactly how many
              calories you burned during your workout session.
            </p>
          </div>

          {/* bmi */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-4"><span className="text-blue-600 font-bold text-sm">BMI</span></div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">BMI Calculator</h3>
            <p className="text-gray-600 leading-relaxed">
              Quickly check your Body Mass Index with just your height and weight.
              Get your BMI category and healthy range instantly.
            </p>
          </div>

          {/* food search */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mb-4"><span className="text-green-600 font-bold text-sm">FD</span></div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Food Calorie Finder</h3>
            <p className="text-gray-600 leading-relaxed">
              Search our database to find calorie and nutrition information for
              common foods. Know what you're eating before you eat it.
            </p>
          </div>
        </div>
      </section>

      {/* why choose us */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why CaloryInsight?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <div className="w-8 h-8 rounded-full bg-primary-100 mx-auto flex items-center justify-center mb-3"><span className="text-primary-700 font-bold text-xs">01</span></div>
              <h4 className="font-semibold text-gray-800 mb-1">Track History</h4>
              <p className="text-sm text-gray-600">All your calculations saved in one dashboard</p>
            </div>
            <div className="text-center p-4">
              <div className="w-8 h-8 rounded-full bg-primary-100 mx-auto flex items-center justify-center mb-3"><span className="text-primary-700 font-bold text-xs">02</span></div>
              <h4 className="font-semibold text-gray-800 mb-1">Secure & Private</h4>
              <p className="text-sm text-gray-600">Your data is protected with JWT authentication</p>
            </div>
            <div className="text-center p-4">
              <div className="w-8 h-8 rounded-full bg-primary-100 mx-auto flex items-center justify-center mb-3"><span className="text-primary-700 font-bold text-xs">03</span></div>
              <h4 className="font-semibold text-gray-800 mb-1">Fully Responsive</h4>
              <p className="text-sm text-gray-600">Works on desktop, tablet, and mobile</p>
            </div>
            <div className="text-center p-4">
              <div className="w-8 h-8 rounded-full bg-primary-100 mx-auto flex items-center justify-center mb-3"><span className="text-primary-700 font-bold text-xs">04</span></div>
              <h4 className="font-semibold text-gray-800 mb-1">100% Free</h4>
              <p className="text-sm text-gray-600">No hidden fees or premium features</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
