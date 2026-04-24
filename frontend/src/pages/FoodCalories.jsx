import { useState } from 'react';
import api from '../utils/api';

const FoodCalories = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError('Please type a food name to search');
      return;
    }

    setLoading(true);
    setError('');
    setSearched(true);

    try {
      const res = await api.get(`/calc/food-search?q=${encodeURIComponent(query.trim())}`);
      setResults(res.data.results);
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  // some suggested searches for quick access
  const suggestions = ['apple', 'rice', 'chicken', 'banana', 'egg', 'oats'];

  const handleSuggestion = (food) => {
    setQuery(food);
    // trigger search with this food
    setLoading(true);
    setError('');
    setSearched(true);

    api.get(`/calc/food-search?q=${encodeURIComponent(food)}`)
      .then(res => setResults(res.data.results))
      .catch(err => setError(err.response?.data?.message || 'Search failed'))
      .finally(() => setLoading(false));
  };

  // pick a color based on calorie density
  const getCalorieColor = (cal) => {
    if (cal < 50) return 'text-green-600';
    if (cal < 150) return 'text-yellow-600';
    if (cal < 300) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Food Calorie Finder</h1>
      <p className="text-gray-600 mb-8">
        Search for any food to see its calorie and nutrition info per 100 grams.
        Our database includes 50+ common foods.
      </p>

      {/* search form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <form onSubmit={handleSearch} className="flex gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setError(''); }}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Search for a food (e.g. apple, rice, chicken)"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-primary-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 whitespace-nowrap"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {/* quick suggestions */}
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-xs text-gray-500">Try:</span>
          {suggestions.map(food => (
            <button
              key={food}
              onClick={() => handleSuggestion(food)}
              className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors capitalize"
            >
              {food}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
          {error}
        </div>
      )}

      {/* results */}
      {searched && !loading && (
        <>
          {results.length > 0 ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-500">{results.length} result{results.length !== 1 ? 's' : ''} found</p>

              {/* table view on larger screens */}
              <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3 text-gray-600 font-medium">Food</th>
                      <th className="text-right px-4 py-3 text-gray-600 font-medium">Calories</th>
                      <th className="text-right px-4 py-3 text-gray-600 font-medium">Protein (g)</th>
                      <th className="text-right px-4 py-3 text-gray-600 font-medium">Carbs (g)</th>
                      <th className="text-right px-4 py-3 text-gray-600 font-medium">Fat (g)</th>
                      <th className="text-right px-4 py-3 text-gray-600 font-medium">Fiber (g)</th>
                      <th className="text-left px-4 py-3 text-gray-600 font-medium">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((food) => (
                      <tr key={food._id} className="border-t border-gray-50 hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium capitalize">{food.name}</td>
                        <td className={`px-4 py-3 text-right font-semibold ${getCalorieColor(food.caloriesPer100g)}`}>
                          {food.caloriesPer100g}
                        </td>
                        <td className="px-4 py-3 text-right">{food.protein}</td>
                        <td className="px-4 py-3 text-right">{food.carbs}</td>
                        <td className="px-4 py-3 text-right">{food.fat}</td>
                        <td className="px-4 py-3 text-right">{food.fiber}</td>
                        <td className="px-4 py-3">
                          <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs capitalize">
                            {food.category}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* card view on mobile */}
              <div className="md:hidden space-y-3">
                {results.map((food) => (
                  <div key={food._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold capitalize text-gray-800">{food.name}</h3>
                      <span className={`text-lg font-bold ${getCalorieColor(food.caloriesPer100g)}`}>
                        {food.caloriesPer100g} kcal
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-center text-xs">
                      <div className="bg-gray-50 rounded p-2">
                        <p className="text-gray-500">Protein</p>
                        <p className="font-semibold">{food.protein}g</p>
                      </div>
                      <div className="bg-gray-50 rounded p-2">
                        <p className="text-gray-500">Carbs</p>
                        <p className="font-semibold">{food.carbs}g</p>
                      </div>
                      <div className="bg-gray-50 rounded p-2">
                        <p className="text-gray-500">Fat</p>
                        <p className="font-semibold">{food.fat}g</p>
                      </div>
                      <div className="bg-gray-50 rounded p-2">
                        <p className="text-gray-500">Fiber</p>
                        <p className="font-semibold">{food.fiber}g</p>
                      </div>
                    </div>
                    <span className="inline-block mt-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs capitalize">
                      {food.category}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-500 mt-2">
                All values are per 100 grams. Nutritional data is approximate.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3 mx-auto"><span className="text-gray-400 font-bold text-sm">N/A</span></div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No results found</h3>
              <p className="text-gray-500 text-sm">
                We couldn't find "{query}" in our database. Try searching for common foods like
                apple, rice, chicken, or banana.
              </p>
            </div>
          )}
        </>
      )}

      {/* empty state before search */}
      {!searched && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mb-4 mx-auto"><span className="text-primary-400 font-bold">FD</span></div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Discover Food Nutrition</h3>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Type a food name in the search bar above to see its calorie count, protein,
            carbs, fat, and fiber per 100 grams.
          </p>
        </div>
      )}
    </div>
  );
};

export default FoodCalories;
