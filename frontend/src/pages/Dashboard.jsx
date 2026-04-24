import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import HealthTips from '../components/HealthTips';

const Dashboard = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await api.get('/calc/history');
      setHistory(res.data.history);
    } catch (err) {
      setError('Could not load your history. Try refreshing the page.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/calc/history/${id}`);
      setHistory(history.filter(item => item._id !== id));
    } catch (err) {
      setError('Failed to delete record. Please try again.');
    }
  };

  // separate history by type for display
  const calorieBurns = history.filter(h => h.type === 'calorie_burn');
  const bmiRecords = history.filter(h => h.type === 'bmi');
  const foodSearches = history.filter(h => h.type === 'food_search');

  // format a date nicely
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* welcome header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, {user?.name || 'User'}!
        </h1>
        <p className="text-gray-600 mt-1">Here's a summary of your recent activity.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
          {error}
        </div>
      )}



      {/* health tips */}
      <div className="mb-8">
        <HealthTips />
      </div>

      {/* stats overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-500">Calorie Burns Logged</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{calorieBurns.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-500">BMI Checks</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{bmiRecords.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-500">Food Searches</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{foodSearches.length}</p>
        </div>
      </div>

      {/* recent calorie burns */}
      {calorieBurns.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Calorie Burns</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 text-gray-500 font-medium">Exercise</th>
                  <th className="text-left py-2 text-gray-500 font-medium">Duration</th>
                  <th className="text-left py-2 text-gray-500 font-medium">Calories</th>
                  <th className="text-left py-2 text-gray-500 font-medium">Date</th>
                  <th className="text-right py-2 text-gray-500 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {calorieBurns.slice(0, 5).map((item) => (
                  <tr key={item._id} className="border-b border-gray-50">
                    <td className="py-2.5 capitalize">{item.inputs.exercise?.replace('_', ' ')}</td>
                    <td className="py-2.5">{item.inputs.duration} min</td>
                    <td className="py-2.5 font-medium text-orange-600">{item.result.caloriesBurned} kcal</td>
                    <td className="py-2.5 text-gray-500">{formatDate(item.createdAt)}</td>
                    <td className="py-2.5 text-right">
                      <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-700 text-sm font-medium">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* recent BMI records */}
      {bmiRecords.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">BMI History</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 text-gray-500 font-medium">BMI</th>
                  <th className="text-left py-2 text-gray-500 font-medium">Category</th>
                  <th className="text-left py-2 text-gray-500 font-medium">Weight</th>
                  <th className="text-left py-2 text-gray-500 font-medium">Height</th>
                  <th className="text-left py-2 text-gray-500 font-medium">Date</th>
                  <th className="text-right py-2 text-gray-500 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {bmiRecords.slice(0, 5).map((item) => (
                  <tr key={item._id} className="border-b border-gray-50">
                    <td className="py-2.5 font-medium">{item.result.bmi}</td>
                    <td className="py-2.5">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        item.result.category === 'Normal' ? 'bg-green-100 text-green-700' :
                        item.result.category === 'Underweight' ? 'bg-yellow-100 text-yellow-700' :
                        item.result.category === 'Overweight' ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {item.result.category}
                      </span>
                    </td>
                    <td className="py-2.5">{item.inputs.weight} kg</td>
                    <td className="py-2.5">{item.inputs.height} cm</td>
                    <td className="py-2.5 text-gray-500">{formatDate(item.createdAt)}</td>
                    <td className="py-2.5 text-right">
                      <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-700 text-sm font-medium">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* empty state */}
      {history.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4 mx-auto"><span className="text-gray-400 font-bold text-sm">N/A</span></div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No activity yet</h3>
          <p className="text-gray-500 text-sm mb-4">
            Start using the calculators to see your history here.
          </p>
          <Link to="/services" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
            Explore services →
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
