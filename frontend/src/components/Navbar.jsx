import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/CaloryInsightLogo.png';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  const closeMenu = () => setMobileOpen(false);

  return (
    <nav className="bg-[#d4e8cd] shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <img src={logo} alt="CaloryInsight Logo" className="h-12 sm:h-14 w-auto object-contain" />
            <span className="text-xl font-bold text-primary-700">CaloryInsight</span>
          </Link>

          {/* desktop nav links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary-700 transition-colors">Home</Link>
            <Link to="/services" className="text-gray-700 hover:text-primary-700 transition-colors">Services</Link>
            <Link to="/about" className="text-gray-700 hover:text-primary-700 transition-colors">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary-700 transition-colors">Contact</Link>

            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-primary-700 transition-colors">Dashboard</Link>
                <Link to="/profile" className="text-gray-700 hover:text-primary-700 transition-colors">Profile</Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* mobile menu button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* mobile menu dropdown */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 bg-[#d4e8cd]">
            <div className="flex flex-col space-y-3 pt-3">
              <Link to="/" className="text-gray-700 hover:text-primary-700 px-2" onClick={closeMenu}>Home</Link>
              <Link to="/services" className="text-gray-700 hover:text-primary-700 px-2" onClick={closeMenu}>Services</Link>
              <Link to="/about" className="text-gray-700 hover:text-primary-700 px-2" onClick={closeMenu}>About</Link>
              <Link to="/contact" className="text-gray-700 hover:text-primary-700 px-2" onClick={closeMenu}>Contact</Link>

              {user ? (
                <>
                  <Link to="/dashboard" className="text-gray-700 hover:text-primary-700 px-2" onClick={closeMenu}>Dashboard</Link>
                  <Link to="/profile" className="text-gray-700 hover:text-primary-700 px-2" onClick={closeMenu}>Profile</Link>
                  <button onClick={handleLogout} className="text-left text-red-500 hover:text-red-600 px-2">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-primary-600 hover:text-primary-700 px-2" onClick={closeMenu}>Login</Link>
                  <Link to="/register" className="text-primary-600 hover:text-primary-700 px-2" onClick={closeMenu}>Register</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
