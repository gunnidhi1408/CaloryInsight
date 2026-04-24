import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import CalorieBurn from './pages/CalorieBurn';
import BmiCalculator from './pages/BmiCalculator';
import FoodCalories from './pages/FoodCalories';
import GoalTracking from './pages/GoalTracking';
import DailyJournal from './pages/DailyJournal';
import ExportReport from './pages/ExportReport';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        <Routes>
          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* protected routes - require login */}
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute><Profile /></ProtectedRoute>
          } />
          <Route path="/calorie-burn" element={
            <ProtectedRoute><CalorieBurn /></ProtectedRoute>
          } />
          <Route path="/bmi" element={
            <ProtectedRoute><BmiCalculator /></ProtectedRoute>
          } />
          <Route path="/food-search" element={
            <ProtectedRoute><FoodCalories /></ProtectedRoute>
          } />
          <Route path="/goals" element={
            <ProtectedRoute><GoalTracking /></ProtectedRoute>
          } />
          <Route path="/journal" element={
            <ProtectedRoute><DailyJournal /></ProtectedRoute>
          } />
          <Route path="/export" element={
            <ProtectedRoute><ExportReport /></ProtectedRoute>
          } />

          {/* 404 fallback */}
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
              <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
              <p className="text-gray-600 mb-4">Page not found</p>
              <a href="/" className="text-primary-600 hover:text-primary-700 font-medium">
                Go back home
              </a>
            </div>
          } />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
