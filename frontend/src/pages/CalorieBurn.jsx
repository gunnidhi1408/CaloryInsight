import { useState } from 'react';
import api from '../utils/api';

// available exercise options with display labels
const EXERCISES = [
  { value: 'walking', label: 'Walking' },
  { value: 'running', label: 'Running' },
  { value: 'cycling', label: 'Cycling' },
  { value: 'swimming', label: 'Swimming' },
  { value: 'yoga', label: 'Yoga' },
  { value: 'jump_rope', label: 'Jump Rope' },
  { value: 'weight_training', label: 'Weight Training' },
  { value: 'dancing', label: 'Dancing' },
  { value: 'hiking', label: 'Hiking' },
  { value: 'stretching', label: 'Stretching' }
];

const CalorieBurn = () => {
  const [formData, setFormData] = useState({
    weight: '',
    age: '',
    gender: '',
    exercise: '',
    duration: ''
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const validate = () => {
    if (!formData.weight || !formData.exercise || !formData.duration) {
      return 'Weight, exercise, and duration are required';
    }
    if (Number(formData.weight) <= 0 || Number(formData.duration) <= 0) {
      return 'Weight and duration must be positive numbers';
    }
    if (formData.age && (Number(formData.age) < 10 || Number(formData.age) > 120)) {
      return 'Age must be between 10 and 120';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const payload = {
        weight: Number(formData.weight),
        duration: Number(formData.duration),
        exercise: formData.exercise,
        age: formData.age ? Number(formData.age) : undefined,
        gender: formData.gender || undefined
      };

      const res = await api.post('/calc/calorie-burn', payload);
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Calculation failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ weight: '', age: '', gender: '', exercise: '', duration: '' });
    setResult(null);
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Calorie Burn Calculator</h1>
      <p className="text-gray-600 mb-8">
        Find out how many calories you burned during your workout. Enter your details
        and select your exercise type below.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* input form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Enter Details</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="cb-weight" className="block text-sm font-medium text-gray-700 mb-1">
                Weight (kg) <span className="text-red-400">*</span>
              </label>
              <input
                id="cb-weight"
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                min="20"
                max="300"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="e.g. 70"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="cb-age" className="block text-sm font-medium text-gray-700 mb-1">Age (optional)</label>
                <input
                  id="cb-age"
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="10"
                  max="120"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g. 25"
                />
              </div>
              <div>
                <label htmlFor="cb-gender" className="block text-sm font-medium text-gray-700 mb-1">Gender (optional)</label>
                <select
                  id="cb-gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="cb-exercise" className="block text-sm font-medium text-gray-700 mb-1">
                Exercise Type <span className="text-red-400">*</span>
              </label>
              <select
                id="cb-exercise"
                name="exercise"
                value={formData.exercise}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Choose an exercise</option>
                {EXERCISES.map(ex => (
                  <option key={ex.value} value={ex.value}>{ex.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="cb-duration" className="block text-sm font-medium text-gray-700 mb-1">
                Duration (minutes) <span className="text-red-400">*</span>
              </label>
              <input
                id="cb-duration"
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                min="1"
                max="600"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="e.g. 30"
              />
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-primary-600 text-white py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Calculating...' : 'Calculate'}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* result display */}
        <div>
          {result ? (
            <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Result</h2>

              <div className="bg-white rounded-lg p-6 text-center mb-4">
                <p className="text-sm text-gray-500 mb-1">Estimated Calories Burned</p>
                <p className="text-5xl font-bold text-orange-600">{result.caloriesBurned}</p>
                <p className="text-sm text-gray-500 mt-1">kcal</p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-1.5 border-b border-orange-100">
                  <span className="text-gray-600">Exercise</span>
                  <span className="font-medium capitalize">{result.exercise?.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-orange-100">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">{result.duration} minutes</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-gray-600">MET Value</span>
                  <span className="font-medium">{result.met}</span>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                This is an estimate based on the MET (Metabolic Equivalent of Task) method.
                Actual calories burned may vary based on fitness level and other factors.
              </p>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center h-full flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 mx-auto"><span className="text-gray-400 font-bold">CAL</span></div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Ready to Calculate?</h3>
              <p className="text-gray-500 text-sm">
                Fill in the form on the left and hit Calculate to see
                how many calories you burned.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalorieBurn;
