import { useState } from 'react';
import api from '../utils/api';

const BmiCalculator = () => {
  const [height, setHeight] = useState('');
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImperialChange = (f, i) => {
    setFeet(f);
    setInches(i);
    setError('');
    
    const ftVal = f ? Number(f) : 0;
    const inVal = i ? Number(i) : 0;
    
    if (ftVal > 0 || inVal > 0) {
      const totalInches = (ftVal * 12) + inVal;
      const cmVal = Math.round(totalInches * 2.54);
      setHeight(cmVal.toString());
    } else {
      setHeight('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // validate
    if (!height || !weight) {
      setError('Both height and weight are required');
      return;
    }
    if (Number(height) <= 0 || Number(weight) <= 0) {
      setError('Values must be positive numbers');
      return;
    }
    if (Number(height) < 50 || Number(height) > 300) {
      setError('Height should be between 50 and 300 cm');
      return;
    }
    if (Number(weight) < 20 || Number(weight) > 300) {
      setError('Weight should be between 20 and 300 kg');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await api.post('/calc/bmi', {
        height: Number(height),
        weight: Number(weight)
      });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Calculation failed');
    } finally {
      setLoading(false);
    }
  };

  // color coding for BMI categories
  const getCategoryStyle = (category) => {
    switch (category) {
      case 'Underweight':
        return { bg: 'bg-yellow-100', text: 'text-yellow-800', ring: 'ring-yellow-300' };
      case 'Normal':
        return { bg: 'bg-green-100', text: 'text-green-800', ring: 'ring-green-300' };
      case 'Overweight':
        return { bg: 'bg-orange-100', text: 'text-orange-800', ring: 'ring-orange-300' };
      case 'Obese':
        return { bg: 'bg-red-100', text: 'text-red-800', ring: 'ring-red-300' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800', ring: 'ring-gray-300' };
    }
  };

  // where the BMI falls on a simple visual scale
  const getBmiPosition = (bmi) => {
    // clamp between 10 and 45 for the visual bar
    const clamped = Math.max(10, Math.min(45, bmi));
    return ((clamped - 10) / 35) * 100;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">BMI Calculator</h1>
      <p className="text-gray-600 mb-8">
        Check your Body Mass Index by entering your height and weight below.
        BMI is a simple screening tool, not a diagnostic measure.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Enter Your Measurements</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="bmi-height" className="block text-sm font-medium text-gray-700">
                  Height (cm) <span className="text-red-400">*</span>
                </label>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-gray-500 text-xs">Or convert from:</span>
                  <input
                    type="number"
                    placeholder="ft"
                    value={feet}
                    min="0"
                    max="10"
                    onChange={(e) => handleImperialChange(e.target.value, inches)}
                    className="w-14 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                  <input
                    type="number"
                    placeholder="in"
                    value={inches}
                    min="0"
                    max="11"
                    onChange={(e) => handleImperialChange(feet, e.target.value)}
                    className="w-14 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                </div>
              </div>
              <input
                id="bmi-height"
                type="number"
                value={height}
                onChange={(e) => { 
                  setHeight(e.target.value); 
                  setError(''); 
                  setFeet('');
                  setInches('');
                }}
                min="50"
                max="300"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="e.g. 175"
              />
            </div>

            <div>
              <label htmlFor="bmi-weight" className="block text-sm font-medium text-gray-700 mb-1">
                Weight (kg) <span className="text-red-400">*</span>
              </label>
              <input
                id="bmi-weight"
                type="number"
                value={weight}
                onChange={(e) => { setWeight(e.target.value); setError(''); }}
                min="20"
                max="300"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="e.g. 70"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 text-white py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Calculating...' : 'Calculate BMI'}
            </button>
          </form>

          {/* BMI category reference */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-700 mb-3">BMI Categories (WHO)</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Underweight</span>
                <span className="text-yellow-700 font-medium">&lt; 18.5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Normal</span>
                <span className="text-green-700 font-medium">18.5 – 24.9</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Overweight</span>
                <span className="text-orange-700 font-medium">25 – 29.9</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Obese</span>
                <span className="text-red-700 font-medium">≥ 30</span>
              </div>
            </div>
          </div>
        </div>

        {/* result */}
        <div>
          {result ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Result</h2>

              {/* big BMI number */}
              <div className={`rounded-lg p-6 text-center mb-4 ring-2 ${getCategoryStyle(result.category).bg} ${getCategoryStyle(result.category).ring}`}>
                <p className="text-sm text-gray-600 mb-1">Your BMI</p>
                <p className={`text-5xl font-bold ${getCategoryStyle(result.category).text}`}>
                  {result.bmi}
                </p>
                <p className={`text-lg font-semibold mt-2 ${getCategoryStyle(result.category).text}`}>
                  {result.category}
                </p>
              </div>

              {/* visual scale */}
              <div className="mb-4">
                <div className="relative h-3 rounded-full overflow-hidden flex">
                  <div className="flex-1 bg-yellow-300"></div>
                  <div className="flex-1 bg-green-400"></div>
                  <div className="flex-1 bg-orange-400"></div>
                  <div className="flex-1 bg-red-400"></div>
                </div>
                <div className="relative h-4">
                  <div
                    className="absolute w-3 h-3 bg-gray-800 rounded-full -top-0.5 transform -translate-x-1/2"
                    style={{ left: `${getBmiPosition(result.bmi)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>10</span>
                  <span>18.5</span>
                  <span>25</span>
                  <span>30</span>
                  <span>45</span>
                </div>
              </div>

              {/* healthy range */}
              <div className="bg-gray-50 rounded-lg p-4 text-sm mb-4">
                <p className="text-gray-700">
                  <strong>Healthy weight range</strong> for your height ({height} cm):
                </p>
                <p className="text-primary-700 font-semibold mt-1">
                  {result.healthyRange.min} kg – {result.healthyRange.max} kg
                </p>
              </div>

              {/* recommendations */}
              {result.recommendations && result.recommendations.length > 0 && (
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm">
                  <h3 className="font-semibold text-blue-800 mb-2">Smart Recommendations:</h3>
                  <ul className="space-y-1">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start text-blue-700">
                        <span className="mr-2 text-blue-500">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                BMI is a general indicator and does not account for muscle mass, bone density,
                or body composition. Consult a healthcare professional for a complete assessment.
              </p>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center h-full flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 mx-auto"><span className="text-gray-400 font-bold">BMI</span></div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Check Your BMI</h3>
              <p className="text-gray-500 text-sm">
                Enter your height and weight to get your BMI value and category.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BmiCalculator;
