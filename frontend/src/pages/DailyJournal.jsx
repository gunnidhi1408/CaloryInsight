import { useState, useEffect } from 'react';
import api from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

const DailyJournal = () => {
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [journal, setJournal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Forms
  const [foodName, setFoodName] = useState('');
  const [foodCalories, setFoodCalories] = useState('');
  
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseCalories, setExerciseCalories] = useState('');

  useEffect(() => {
    fetchJournal();
  }, [date]);

  const fetchJournal = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/journal/${date}`);
      setJournal(res.data.journal);
    } catch (err) {
      setError('Failed to fetch journal.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogFood = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/journal/food', {
        date,
        name: foodName,
        calories: Number(foodCalories)
      });
      setJournal(res.data.journal);
      setFoodName('');
      setFoodCalories('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to log food');
    }
  };

  const handleLogExercise = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/journal/exercise', {
        date,
        name: exerciseName,
        caloriesBurned: Number(exerciseCalories)
      });
      setJournal(res.data.journal);
      setExerciseName('');
      setExerciseCalories('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to log exercise');
    }
  };

  if (loading && !journal) return <LoadingSpinner />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Daily Journal</h1>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)}
          className="px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Summary Stats */}
      {journal && (
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-green-50 border border-green-100 p-6 rounded-xl text-center">
            <h3 className="text-sm font-semibold text-green-700 uppercase tracking-wider mb-2">Calories In</h3>
            <p className="text-3xl font-bold text-green-800">{journal.totalCaloriesIn} kcal</p>
          </div>
          <div className="bg-orange-50 border border-orange-100 p-6 rounded-xl text-center">
            <h3 className="text-sm font-semibold text-orange-700 uppercase tracking-wider mb-2">Calories Out</h3>
            <p className="text-3xl font-bold text-orange-800">{journal.totalCaloriesOut} kcal</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Food Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Log Food</h2>
          <form onSubmit={handleLogFood} className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Food name"
              required
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg text-sm"
            />
            <input
              type="number"
              placeholder="Calories"
              required
              value={foodCalories}
              onChange={(e) => setFoodCalories(e.target.value)}
              className="w-24 px-3 py-2 border rounded-lg text-sm"
            />
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700">
              Add
            </button>
          </form>

          <div className="space-y-3">
            {journal?.foodItems?.length === 0 && <p className="text-sm text-gray-500">No food logged yet.</p>}
            {journal?.foodItems?.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                <span className="text-gray-700">{item.name}</span>
                <span className="font-medium text-green-600">+{item.calories}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Exercise Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Log Exercise</h2>
          <form onSubmit={handleLogExercise} className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Exercise name"
              required
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg text-sm"
            />
            <input
              type="number"
              placeholder="Calories"
              required
              value={exerciseCalories}
              onChange={(e) => setExerciseCalories(e.target.value)}
              className="w-24 px-3 py-2 border rounded-lg text-sm"
            />
            <button type="submit" className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700">
              Add
            </button>
          </form>

          <div className="space-y-3">
            {journal?.exercises?.length === 0 && <p className="text-sm text-gray-500">No exercises logged yet.</p>}
            {journal?.exercises?.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                <span className="text-gray-700">{item.name}</span>
                <span className="font-medium text-orange-600">-{item.caloriesBurned}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyJournal;
