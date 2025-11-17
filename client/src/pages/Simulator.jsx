import React, { useState } from 'react';
import axios from 'axios';

const Simulator = () => {
  const [loading, setLoading] = useState({
    phishing: false,
    stress: false,
    health: false
  });
  const [errors, setErrors] = useState({});

  // Use Vite's import.meta.env instead of process.env
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001';

  const triggerPhishingEvent = async () => {
    setLoading(prev => ({ ...prev, phishing: true }));
    setErrors(prev => ({ ...prev, phishing: null }));
    try {
      const response = await axios.post(`${BACKEND_URL}/api/simulate/phishing`);
      console.log('Phishing event triggered:', response.data);
      alert('Phishing event triggered successfully!');
    } catch (error) {
      console.error('Error triggering phishing event:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Error triggering phishing event';
      setErrors(prev => ({ ...prev, phishing: errorMsg }));
      alert(`Error: ${errorMsg}`);
    } finally {
      setLoading(prev => ({ ...prev, phishing: false }));
    }
  };

  const triggerStressEvent = async () => {
    setLoading(prev => ({ ...prev, stress: true }));
    setErrors(prev => ({ ...prev, stress: null }));
    try {
      const response = await axios.post(`${BACKEND_URL}/api/simulate/stress`);
      console.log('Stress event triggered:', response.data);
      alert('Stress event triggered successfully!');
    } catch (error) {
      console.error('Error triggering stress event:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Error triggering stress event';
      setErrors(prev => ({ ...prev, stress: errorMsg }));
      alert(`Error: ${errorMsg}`);
    } finally {
      setLoading(prev => ({ ...prev, stress: false }));
    }
  };

  const triggerHealthAnomalyEvent = async () => {
    setLoading(prev => ({ ...prev, health: true }));
    setErrors(prev => ({ ...prev, health: null }));
    try {
      const response = await axios.post(`${BACKEND_URL}/api/simulate/health-anomaly`);
      console.log('Health anomaly event triggered:', response.data);
      alert('Health anomaly event triggered successfully!');
    } catch (error) {
      console.error('Error triggering health anomaly event:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Error triggering health anomaly event';
      setErrors(prev => ({ ...prev, health: errorMsg }));
      alert(`Error: ${errorMsg}`);
    } finally {
      setLoading(prev => ({ ...prev, health: false }));
    }
  };

  const scenarios = [
    {
      id: 'phishing',
      title: 'Phishing Event',
      description: 'Simulate enterprise phishing attacks to test security protocols and employee awareness',
      icon: (
        <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      color: 'from-red-500/10 to-orange-500/10',
      border: 'border-red-500/20',
      hover: 'hover:border-red-500/50',
      buttonGradient: 'from-red-500 to-orange-600',
      shadow: 'shadow-red-500/50',
      hoverShadow: 'hover:shadow-red-500/70',
      onClick: triggerPhishingEvent,
      loading: loading.phishing,
      error: errors.phishing
    },
    {
      id: 'stress',
      title: 'Stress Event',
      description: 'Simulate workplace stress detection through behavioral typing patterns and cognitive load analysis',
      icon: (
        <svg className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      color: 'from-yellow-500/10 to-amber-500/10',
      border: 'border-yellow-500/20',
      hover: 'hover:border-yellow-500/50',
      buttonGradient: 'from-yellow-500 to-amber-600',
      shadow: 'shadow-yellow-500/50',
      hoverShadow: 'hover:shadow-yellow-500/70',
      onClick: triggerStressEvent,
      loading: loading.stress,
      error: errors.stress
    },
    {
      id: 'health',
      title: 'Health Anomaly',
      description: 'Simulate employee health pattern irregularities for proactive wellness monitoring',
      icon: (
        <svg className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      color: 'from-green-500/10 to-emerald-500/10',
      border: 'border-green-500/20',
      hover: 'hover:border-green-500/50',
      buttonGradient: 'from-green-500 to-emerald-600',
      shadow: 'shadow-green-500/50',
      hoverShadow: 'hover:shadow-green-500/70',
      onClick: triggerHealthAnomalyEvent,
      loading: loading.health,
      error: errors.health
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-red-500/10 border border-purple-500/20 p-8">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Enterprise Security Testing
            <span className="block text-2xl md:text-3xl font-light text-purple-400 mt-2">Protocol Validation & Threat Simulation</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl">
            Validate your organization's cybersecurity readiness, employee wellness programs, and health monitoring capabilities through realistic threat simulations.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 p-5 hover:border-cyan-500/50 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative">
            <p className="text-2xl font-bold text-white">98%</p>
            <p className="text-gray-400 text-sm mt-1">Detection Accuracy</p>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 p-5 hover:border-purple-500/50 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative">
            <p className="text-2xl font-bold text-white">2.4s</p>
            <p className="text-gray-400 text-sm mt-1">Avg. Response Time</p>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 p-5 hover:border-green-500/50 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative">
            <p className="text-2xl font-bold text-white">24/7</p>
            <p className="text-gray-400 text-sm mt-1">Continuous Monitoring</p>
          </div>
        </div>
      </div>

      {/* Simulation Scenarios */}
      <div className="rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-b border-gray-700/50 px-6 py-6">
          <h3 className="text-2xl font-black text-white">Threat Simulation Scenarios</h3>
          <p className="mt-2 text-gray-400">
            Launch realistic simulations to test your organization's protective measures
          </p>
        </div>
        <div className="px-6 py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {scenarios.map((scenario) => (
              <div 
                key={scenario.id}
                className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${scenario.color} ${scenario.border} p-6 ${scenario.hover} transition-all duration-300`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-4 rounded-xl bg-purple-500/20`}>
                      {scenario.icon}
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{scenario.title}</h4>
                  <p className="text-gray-400 text-sm mb-6">
                    {scenario.description}
                  </p>
                  <button
                    onClick={scenario.onClick}
                    disabled={scenario.loading}
                    className={`w-full py-3 px-4 bg-gradient-to-r ${scenario.buttonGradient} text-white font-semibold rounded-lg shadow-lg ${scenario.shadow} ${scenario.hoverShadow} transition-all duration-300 hover:scale-105 flex items-center justify-center ${
                      scenario.loading ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {scenario.loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        {scenario.id === 'phishing' && 'Launch Attack'}
                        {scenario.id === 'stress' && 'Trigger Analysis'}
                        {scenario.id === 'health' && 'Run Scan'}
                      </>
                    )}
                  </button>
                  {scenario.error && (
                    <div className="mt-3 p-2 bg-red-900/30 border border-red-500/50 rounded-lg">
                      <p className="text-red-300 text-xs">Error: {scenario.error}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Security Information */}
          <div className="mt-8 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="p-2 rounded-lg bg-cyan-500/20">
                  <svg className="h-6 w-6 text-cyan-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm text-cyan-100 font-medium">
                  <strong className="text-cyan-300">Enterprise Security:</strong> These simulations validate your organization's readiness against real-world threats. 
                  Results help improve security protocols, employee wellness programs, and health monitoring systems. All simulations are safe and non-disruptive to your actual operations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-b border-gray-700/50 px-6 py-6">
          <h3 className="text-xl font-bold text-white">How Security Testing Works</h3>
          <p className="mt-2 text-gray-400">
            Our AI-powered approach to enterprise security validation
          </p>
        </div>
        <div className="px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Trigger Simulation</h4>
              <p className="text-gray-400 text-sm">
                Select a threat scenario to simulate real-world security challenges
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">AI Analysis</h4>
              <p className="text-gray-400 text-sm">
                Our multi-agent system analyzes the threat and generates protective actions
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Action & Report</h4>
              <p className="text-gray-400 text-sm">
                Receive immediate protective actions and detailed reports for improvement
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;