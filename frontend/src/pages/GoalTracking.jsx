import { useState, useEffect } from 'react';
import api from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

const GoalTracking = () => {
  const [goal, setGoal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Form states
  const [goalType, setGoalType] = useState('weight_loss');
  const [startWeight, setStartWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [currentWeightInput, setCurrentWeightInput] = useState('');

  useEffect(() => {
    fetchGoal();
  }, []);

  const fetchGoal = async () => {
    try {
      setLoading(true);
      const res = await api.get('/goals');
      if (res.data.goal) {
        setGoal(res.data.goal);
        setCurrentWeightInput(res.data.goal.currentWeight);
      }
    } catch (err) {
      if (err.response?.status !== 404) {
        setError('Failed to fetch goal. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSetGoal = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/goals', {
        goalType,
        startWeight: Number(startWeight),
        targetWeight: Number(targetWeight)
      });
      setGoal(res.data.goal);
      setCurrentWeightInput(res.data.goal.startWeight);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to set goal');
    }
  };

  const handleUpdateProgress = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.put('/goals/progress', {
        currentWeight: Number(currentWeightInput)
      });
      setGoal(res.data.goal);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update progress');
    }
  };

  if (loading) return <LoadingSpinner />;

  // Calculate progress
  let progressPercentage = 0;
  if (goal) {
    const totalDiff = Math.abs(goal.targetWeight - goal.startWeight);
    const currentDiff = Math.abs(goal.currentWeight - goal.startWeight);
    progressPercentage = totalDiff === 0 ? 100 : Math.min(100, Math.max(0, (currentDiff / totalDiff) * 100));
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Goal Tracking System</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {!goal ? (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Set a New Goal</h2>
          <form onSubmit={handleSetGoal} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Goal Type</label>
              <select
                value={goalType}
                onChange={(e) => setGoalType(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="weight_loss">Weight Loss</option>
                <option value="weight_gain">Weight Gain</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Starting Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                required
                value={startWeight}
                onChange={(e) => setStartWeight(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                required
                value={targetWeight}
                onChange={(e) => setTargetWeight(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary-600 text-white font-semibold py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Set Goal
            </button>
          </form>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Progress Bar Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-2">
              {goal.goalType === 'weight_loss' ? 'Weight Loss' : 'Weight Gain'} Progress
            </h2>
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Start: {goal.startWeight} kg</span>
              <span>Target: {goal.targetWeight} kg</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div
                className="bg-primary-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-right text-sm font-medium text-gray-700">
              {progressPercentage.toFixed(1)}% Complete
            </p>
          </div>

          {/* Update Progress Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Log Current Weight</h3>
            <form onSubmit={handleUpdateProgress} className="flex gap-4">
              <input
                type="number"
                step="0.1"
                required
                value={currentWeightInput}
                onChange={(e) => setCurrentWeightInput(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                className="bg-primary-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Update
              </button>
            </form>
          </div>
          
          <button
            onClick={() => setGoal(null)}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Start a new goal
          </button>
        </div>
      )}
    </div>
  );
};

export default GoalTracking;
