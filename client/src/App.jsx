import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard-dark';
import Simulator from './pages/Simulator';
import Events from './pages/Events';
import BusinessInsights from './pages/BusinessInsights';
import Reports from './pages/Reports';
import Chatbot from './pages/Chatbot';
import useSocket from './hooks/useSocket';

function Navigation() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center">
              <div className="text-2xl font-black text-white">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">AI</span>
                <span className="ml-1">GUARDIAN</span>
              </div>
            </Link>
            <div className="hidden md:flex space-x-1">
              <Link
                to="/"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive('/') || isActive('/dashboard')
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/simulator"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive('/simulator')
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                Security Testing
              </Link>
              <Link
                to="/events"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive('/events')
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/50'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                Data Integration
              </Link>
              <Link
                to="/chatbot"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive('/chatbot')
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/50'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                AI Assistant
              </Link>
              <Link
                to="/business-insights"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive('/business-insights')
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/50'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                Business Insights
              </Link>
              <Link
                to="/reports"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive('/reports')
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/50'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                Reports
              </Link>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs text-gray-400">LIVE</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  // Initialize WebSocket connection
  useSocket();

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <Navigation />
        <main className="relative">
          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-96 h-96 -top-48 -left-48 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
            <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
            <div className="absolute w-96 h-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/simulator" element={<Simulator />} />
              <Route path="/events" element={<Events />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/business-insights" element={<BusinessInsights />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;