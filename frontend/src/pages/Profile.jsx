import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import bgImage from '../assets/CaloryInsightBackgroundImage.png';
import profilePic from '../assets/Profile.png';

const Profile = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // form state for editing
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    gender: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/user/profile');
      const userData = res.data.user;
      setProfile(userData);
      setFormData({
        name: userData.name || '',
        age: userData.age || '',
        weight: userData.weight || '',
        height: userData.height || '',
        gender: userData.gender || ''
      });
    } catch (err) {
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    try {
      const payload = {
        name: formData.name,
        age: formData.age ? Number(formData.age) : null,
        weight: formData.weight ? Number(formData.weight) : null,
        height: formData.height ? Number(formData.height) : null,
        gender: formData.gender || null
      };

      const res = await api.put('/user/profile', payload);
      setProfile(res.data.user);
      updateUser(res.data.user);
      setMessage('Profile updated successfully!');
      setEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col lg:flex-row">
      {/* left column: profile info */}
      <div className="w-full lg:w-1/3 p-6 sm:p-8 lg:p-12 overflow-y-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Profile</h1>

        {message && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          {/* avatar and name */}
          <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-gray-100">
            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary-100 shadow-sm">
              <img 
                src={profilePic} 
                alt="Profile Avatar" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{profile?.name}</h2>
              <p className="text-gray-500 text-sm">{profile?.email}</p>
            </div>
          </div>

          {editing ? (
            // edit form
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label htmlFor="profile-name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  id="profile-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="profile-age" className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    id="profile-age"
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
                  <label htmlFor="profile-gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    id="profile-gender"
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="profile-weight" className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                  <input
                    id="profile-weight"
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
                <div>
                  <label htmlFor="profile-height" className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                  <input
                    id="profile-height"
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    min="50"
                    max="300"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g. 175"
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            // display mode
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Age</p>
                  <p className="text-gray-800 font-medium mt-0.5">{profile?.age || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Gender</p>
                  <p className="text-gray-800 font-medium mt-0.5 capitalize">{profile?.gender || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Weight</p>
                  <p className="text-gray-800 font-medium mt-0.5">{profile?.weight ? `${profile.weight} kg` : 'Not set'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Height</p>
                  <p className="text-gray-800 font-medium mt-0.5">{profile?.height ? `${profile.height} cm` : 'Not set'}</p>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Member Since</p>
                <p className="text-gray-800 font-medium mt-0.5">
                  {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  }) : '-'}
                </p>
              </div>

              <button
                onClick={() => setEditing(true)}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors mt-2"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-2">Account Actions</h3>
          <p className="text-sm text-gray-600 mb-4">
            Logging out will end your current session. You can always log back in.
          </p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* right column: image */}
      <div className="hidden lg:block lg:w-2/3 relative min-h-[calc(100vh-4rem)]">
        <img
          src={bgImage}
          alt="CaloryInsight Profile Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Light overlay to make image lighter */}
        <div className="absolute inset-0 bg-white/20"></div>
      </div>
    </div>
  );
};

export default Profile;
