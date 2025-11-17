import React, { useState, useEffect } from 'react';
import useStore from '../store/useStore';

const Dashboard = () => {
  const { agentActions, notifications } = useStore();
  const [stats, setStats] = useState({
    totalEvents: 0,
    cyberThreats: 0,
    stressAlerts: 0,
    healthAnomalies: 0
  });

  useEffect(() => {
    setStats({
      totalEvents: agentActions.length,
      cyberThreats: agentActions.filter(a => a.agentType === 'phishing').length,
      stressAlerts: agentActions.filter(a => a.agentType === 'stress').length,
      healthAnomalies: agentActions.filter(a => a.agentType === 'health').length
    });
  }, [agentActions]);

  // Calculate trends for the last 30 days
  const calculateTrends = () => {
    const now = Date.now();
    const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
    
    const recentActions = agentActions.filter(action => 
      action.timestamp >= thirtyDaysAgo
    );
    
    // Group by week
    const weeklyData = Array(4).fill(0).map(() => ({
      cyber: 0,
      stress: 0,
      health: 0
    }));
    
    recentActions.forEach(action => {
      const daysAgo = Math.floor((now - action.timestamp) / (24 * 60 * 60 * 1000));
      const weekIndex = Math.min(3, Math.floor(daysAgo / 7));
      if (action.agentType === 'phishing') weeklyData[weekIndex].cyber++;
      else if (action.agentType === 'stress') weeklyData[weekIndex].stress++;
      else if (action.agentType === 'health') weeklyData[weekIndex].health++;
    });
    
    return weeklyData;
  };

  const trends = calculateTrends();

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 border border-cyan-500/30 p-6">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjAuNSIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjE1Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')] opacity-20"></div>
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between mb-4 gap-3">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-lg blur opacity-40"></div>
                <h1 className="relative text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 tracking-tight">
                  AI GUARDIAN
                </h1>
              </div>
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-sm opacity-70"></div>
                  <div className="relative w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {/* Robot Guardian Image - Optimized for face visibility */}
            <div className="relative mt-4">
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-xl blur opacity-40"></div>
              <div className="relative w-32 h-32 rounded-xl overflow-hidden border-4 border-gray-700 shadow-xl">
                <img 
                  src="/images/robot-guardian.jpg" 
                  alt="Futuristic Robot Guardian" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>
          <p className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-300 mb-3">
            Enterprise Digital Wellness Platform
          </p>
          <p className="text-gray-300 text-base max-w-3xl mb-4">
            Proactive AI-powered cybersecurity, mental wellness, and health monitoring for modern enterprises
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-cyan-900/60 text-cyan-200 border border-cyan-500/40">
              <span className="mr-2">🔒</span> Cybersecurity
            </span>
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-yellow-900/60 text-yellow-200 border border-yellow-500/40">
              <span className="mr-2">🧠</span> Mental Wellness
            </span>
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-green-900/60 text-green-200 border border-green-500/40">
              <span className="mr-2">🏥</span> Health Monitoring
            </span>
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-purple-900/60 text-purple-200 border border-purple-500/40">
              <span className="mr-2">🤖</span> Agentic AI
            </span>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-500/40 via-blue-500/40 to-purple-500/40 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-gradient-to-br from-purple-500/30 via-pink-500/30 to-cyan-500/30 rounded-full blur-xl"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-cyan-500/30 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-lg bg-cyan-500/20">
              <svg className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-2xl font-extrabold text-white">{stats.totalEvents}</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-2">Total Events</p>
        </div>

        <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-red-500/30 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-lg bg-red-500/20">
              <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-2xl font-extrabold text-white">{stats.cyberThreats}</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-2">Cyber Threats</p>
        </div>

        <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-yellow-500/30 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-lg bg-yellow-500/20">
              <svg className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-2xl font-extrabold text-white">{stats.stressAlerts}</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-2">Stress Alerts</p>
        </div>

        <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-green-500/30 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-lg bg-green-500/20">
              <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-2xl font-extrabold text-white">{stats.healthAnomalies}</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-2">Health Anomalies</p>
        </div>
      </div>

      {/* Trends Visualization */}
      <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-purple-500/30 rounded-xl">
        <div className="border-b border-gray-700/50 px-5 py-4">
          <h3 className="text-lg font-extrabold text-white">30-Day Event Trends</h3>
          <p className="text-gray-400 text-sm mt-1">Historical analysis of security and wellness events</p>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {trends.map((week, index) => (
              <div key={index} className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/40">
                <h4 className="text-gray-300 font-bold text-sm mb-2">Week {index + 1}</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-red-400 text-xs">Threats</span>
                    <span className="text-white font-bold text-sm">{week.cyber}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div 
                      className="bg-gradient-to-r from-red-500 to-orange-500 h-1.5 rounded-full"
                      style={{ width: `${Math.min(100, (week.cyber / 20) * 100)}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-400 text-xs">Stress</span>
                    <span className="text-white font-bold text-sm">{week.stress}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div 
                      className="bg-gradient-to-r from-yellow-500 to-amber-500 h-1.5 rounded-full"
                      style={{ width: `${Math.min(100, (week.stress / 20) * 100)}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-green-400 text-xs">Health</span>
                    <span className="text-white font-bold text-sm">{week.health}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-1.5 rounded-full"
                      style={{ width: `${Math.min(100, (week.health / 20) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Agent Activity */}
        <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-purple-500/30 rounded-xl">
          <div className="border-b border-gray-700/50 px-5 py-4">
            <h3 className="text-lg font-extrabold text-white">Live Agent Activity</h3>
            <p className="text-gray-400 text-sm mt-1">Recent security and wellness events</p>
          </div>
          <div className="divide-y divide-gray-700/40 max-h-80 overflow-y-auto">
            {agentActions.length > 0 ? (
              agentActions.slice().reverse().slice(0, 8).map((action, index) => (
                <div key={index} className="px-5 py-4 hover:bg-gray-800/30">
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 rounded-lg p-2 ${
                      action.agentType === 'phishing' ? 'bg-red-500/20' :
                      action.agentType === 'stress' ? 'bg-yellow-500/20' : 'bg-green-500/20'
                    }`}>
                      <div className={`h-3 w-3 rounded-full ${
                        action.agentType === 'phishing' ? 'bg-red-400' :
                        action.agentType === 'stress' ? 'bg-yellow-400' : 'bg-green-400'
                      }`}></div>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-extrabold text-white capitalize">
                          {action.agentType} Agent
                        </p>
                        <span className="text-xs text-gray-500">
                          {new Date(action.timestamp || Date.now()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                      <p className="text-xs text-gray-300 mt-1 line-clamp-2">
                        {action.response?.explanation?.split('\n')[0] || 'Processing event...'}
                      </p>
                      <div className="mt-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${
                          action.agentType === 'phishing' ? 'bg-red-900/60 text-red-200' :
                          action.agentType === 'stress' ? 'bg-yellow-900/60 text-yellow-200' :
                          'bg-green-900/60 text-green-200'
                        }`}>
                          {action.agentType === 'phishing' ? 'Severity' : action.agentType === 'health' ? 'Risk Score' : 'Severity'}: 
                          <span className="ml-1">
                            {action.response?.severity || action.response?.risk_score || 'N/A'}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-5 py-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-gray-800/50 mb-4">
                  <svg className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <p className="text-gray-400 font-bold">No agent activity yet</p>
                <p className="text-xs text-gray-500 mt-1">Use the Simulator to trigger events</p>
              </div>
            )}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-cyan-500/30 rounded-xl">
          <div className="border-b border-gray-700/50 px-5 py-4">
            <h3 className="text-lg font-extrabold text-white">Notifications</h3>
            <p className="text-gray-400 text-sm mt-1">Recent system alerts and updates</p>
          </div>
          <div className="divide-y divide-gray-700/40 max-h-80 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.slice().reverse().slice(0, 8).map((notification, index) => (
                <div key={index} className="px-5 py-4 hover:bg-gray-800/30">
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 rounded-lg p-2 ${
                      notification.type === 'alert' ? 'bg-red-500/20' :
                      notification.type === 'intervention' ? 'bg-yellow-500/20' : 'bg-blue-500/20'
                    }`}>
                      <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between items-start">
                        <p className="text-sm text-gray-200 line-clamp-2">{notification.message}</p>
                        <span className="text-xs text-gray-500">
                          {new Date(notification.timestamp || Date.now()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${
                          notification.type === 'alert' ? 'bg-red-900/60 text-red-200' :
                          notification.type === 'intervention' ? 'bg-yellow-900/60 text-yellow-200' :
                          'bg-blue-900/60 text-blue-200'
                        }`}>
                          {notification.type?.toUpperCase() || 'NOTIFICATION'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-5 py-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-gray-800/50 mb-4">
                  <svg className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <p className="text-gray-400 font-bold">No notifications</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a href="/simulator" className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/40 rounded-xl p-5 hover:border-purple-400/60 transition-all">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-500/30">
              <svg className="h-6 w-6 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-white font-extrabold">Launch Simulator</p>
              <p className="text-gray-400 text-sm">Test security protocols</p>
            </div>
          </div>
        </a>

        <a href="/events" className="bg-gradient-to-br from-orange-600/20 to-red-600/20 border border-orange-500/40 rounded-xl p-5 hover:border-orange-400/60 transition-all">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-orange-500/30">
              <svg className="h-6 w-6 text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-white font-extrabold">Submit Event</p>
              <p className="text-gray-400 text-sm">Enterprise data integration</p>
            </div>
          </div>
        </a>

        <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/40 rounded-xl p-5">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-500/30">
              <svg className="h-6 w-6 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-white font-extrabold">System Status</p>
              <p className="text-green-400 text-sm font-bold">Enterprise grade reliability</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;