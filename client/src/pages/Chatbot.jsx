import React from 'react';

const Chatbot = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header with balanced design */}
      <div className="text-center py-8 relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-cyan-900/40 border border-purple-500/20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjAuNSIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjA4Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')] opacity-10"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 rounded-full blur opacity-30"></div>
              <h1 className="relative text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400">
                AI Guardian Assistant
              </h1>
            </div>
          </div>
          <p className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-indigo-300 to-cyan-300 mb-3 max-w-2xl mx-auto">
            Intelligent Conversational Security & Wellness
          </p>
          <p className="text-gray-300 text-sm max-w-2xl mx-auto px-4">
            Experience the future of enterprise protection through our AI-powered conversational assistant
          </p>
        </div>
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-purple-500/20 via-indigo-500/20 to-cyan-500/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-full blur-2xl"></div>
      </div>

      {/* Assistant Concept with balanced cards */}
      <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-700/30 rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-900/20 to-indigo-900/20 border-b border-gray-700/30 px-5 py-4">
          <h2 className="text-lg font-extrabold text-white flex items-center">
            <svg className="w-5 h-5 text-purple-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            How the AI Assistant Works
          </h2>
          <p className="text-gray-400 text-sm mt-1">Advanced conversational AI for comprehensive enterprise protection</p>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-800/70 to-gray-900/70 border border-purple-500/20 p-5 hover:border-purple-400/40 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-base font-extrabold text-white mb-2">Conversational Interface</h3>
                <p className="text-gray-400 text-sm">
                  Users interact with the AI through a familiar chat interface, similar to popular messaging apps.
                </p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-800/70 to-gray-900/70 border border-cyan-500/20 p-5 hover:border-cyan-400/40 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-base font-extrabold text-white mb-2">Threat Detection</h3>
                <p className="text-gray-400 text-sm">
                  The AI analyzes messages for phishing attempts and other cybersecurity threats in real-time.
                </p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-800/70 to-gray-900/70 border border-green-500/20 p-5 hover:border-green-400/40 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-base font-extrabold text-white mb-2">Wellness Monitoring</h3>
                <p className="text-gray-400 text-sm">
                  Detects signs of workplace stress through typing patterns and message content analysis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Interface Preview with Hovering AI Bot */}
      <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-700/30 rounded-xl overflow-hidden relative">
        {/* Hovering AI Bot - Enhanced Version with Custom Robot Look */}
        <div className="absolute top-4 right-8 z-20 animate-float" style={{ animation: 'float 3s ease-in-out infinite' }}>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full blur-xl opacity-40"></div>
            <div className="relative">
              {/* Robot Image from Unsplash */}
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-4 border-gray-700 shadow-2xl overflow-hidden">
                <img 
                  src="/images/robot-unsplash.jpg" 
                  alt="AI Robot Assistant" 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              
              {/* Status indicator */}
              <div className="absolute top-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse"></div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-cyan-400 rounded-full animate-ping opacity-70"></div>
              <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-70"></div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-900/20 to-indigo-900/20 border-b border-gray-700/30 px-5 py-4">
          <h2 className="text-lg font-extrabold text-white flex items-center">
            <svg className="w-5 h-5 text-indigo-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Assistant Interaction Preview
          </h2>
          <p className="text-gray-400 text-sm mt-1">Experience how our AI assistant responds to security and wellness queries</p>
        </div>
        <div className="p-5">
          <div className="flex flex-col h-full max-w-2xl mx-auto bg-gray-900 rounded-xl overflow-hidden border border-gray-700/30">
            {/* Chat Header with AI Avatar */}
            <div className="bg-gradient-to-r from-purple-800 to-indigo-800 text-white p-4">
              <div className="flex items-center">
                {/* AI Avatar */}
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full blur opacity-50"></div>
                  <div className="relative w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse"></div>
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-lg">AI Guardian</h3>
                  <p className="text-purple-200 text-sm">Online • Ready to help</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 bg-gray-900 bg-opacity-60 p-4 overflow-y-auto h-96">
              <div className="space-y-5">
                {/* AI Welcome Message with Avatar */}
                <div className="flex justify-start">
                  <div className="flex items-end space-x-3">
                    {/* AI Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                    </div>
                    <div className="bg-gray-800 text-gray-200 rounded-2xl rounded-bl-none px-4 py-3 max-w-xs border border-gray-700/40">
                      <div className="text-sm">
                        Hello! I'm your AI Guardian assistant. I can help monitor cybersecurity threats, detect workplace stress, and track health anomalies. How can I assist you today?
                      </div>
                      <div className="text-xs text-gray-500 mt-1">10:00 AM</div>
                    </div>
                  </div>
                </div>

                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl rounded-br-none px-4 py-3 max-w-xs">
                    <div className="text-sm">
                      Can you check if this email looks suspicious?
                    </div>
                    <div className="text-xs text-blue-200 mt-1">10:02 AM</div>
                  </div>
                </div>

                {/* AI Response with Avatar */}
                <div className="flex justify-start">
                  <div className="flex items-end space-x-3">
                    {/* AI Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center animate-pulse">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                    </div>
                    <div className="bg-gray-800 text-gray-200 rounded-2xl rounded-bl-none px-4 py-3 max-w-md border border-gray-700/40">
                      <div className="text-sm">
                        <span className="font-bold text-cyan-400">Phishing Detection:</span> This email contains several red flags:
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                          <li>Urgent language creating false sense of emergency</li>
                          <li>Suspicious sender domain</li>
                          <li>Request for sensitive information</li>
                        </ul>
                        <span className="block mt-2 font-semibold text-orange-400">Risk Level: HIGH</span>
                        <span className="block mt-1">Recommended Action: Do not click any links. Report this email to IT security.</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">10:02 AM</div>
                    </div>
                  </div>
                </div>

                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl rounded-br-none px-4 py-3 max-w-xs">
                    <div className="text-sm">
                      I've been feeling stressed lately. Can you help?
                    </div>
                    <div className="text-xs text-blue-200 mt-1">10:05 AM</div>
                  </div>
                </div>

                {/* AI Response with Avatar */}
                <div className="flex justify-start">
                  <div className="flex items-end space-x-3">
                    {/* AI Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center animate-pulse" style={{ animationDuration: '1.5s' }}>
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="bg-gray-800 text-gray-200 rounded-2xl rounded-bl-none px-4 py-3 max-w-md border border-gray-700/40">
                      <div className="text-sm">
                        <span className="font-bold text-green-400">Wellness Check:</span> I've detected signs of workplace stress based on recent communication patterns.
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                          <li>Increased typing hesitation</li>
                          <li>Higher than usual correction rate</li>
                          <li>Stress-related language patterns</li>
                        </ul>
                        <span className="block mt-2 font-semibold text-yellow-400">Stress Level: MODERATE</span>
                        <span className="block mt-1">Recommended Action: Take a short break and try our guided breathing exercise.</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">10:05 AM</div>
                    </div>
                  </div>
                </div>

                {/* Typing Indicator with Avatar */}
                <div className="flex justify-start">
                  <div className="flex items-end space-x-3">
                    {/* AI Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-800 text-gray-200 rounded-2xl rounded-bl-none px-4 py-3 border border-gray-700/40">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="bg-gray-800 p-4">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-700 text-white rounded-l-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm"
                  disabled
                />
                <button
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-3 rounded-r-xl opacity-70 cursor-not-allowed font-medium text-sm flex items-center"
                  disabled
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features with balanced styling */}
      <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-700/30 rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border-b border-gray-700/30 px-5 py-4">
          <h2 className="text-lg font-extrabold text-white flex items-center">
            <svg className="w-5 h-5 text-cyan-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            Key Assistant Capabilities
          </h2>
          <p className="text-gray-400 text-sm mt-1">Comprehensive protection across cybersecurity, wellness, and health domains</p>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-white border-b border-red-500/40 pb-2 flex items-center">
                <svg className="w-4 h-4 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Cybersecurity Protection
              </h3>
              <ul className="space-y-2.5">
                <li className="flex items-start p-2.5 rounded-lg bg-gray-800/40 border border-gray-700/30 hover:border-red-500/40 transition-all duration-200">
                  <div className="flex-shrink-0 h-4 w-4 text-red-400 mt-0.5">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="ml-2.5 text-gray-300 text-sm">Real-time phishing detection with advanced heuristic analysis</span>
                </li>
                <li className="flex items-start p-2.5 rounded-lg bg-gray-800/40 border border-gray-700/30 hover:border-red-500/40 transition-all duration-200">
                  <div className="flex-shrink-0 h-4 w-4 text-red-400 mt-0.5">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="ml-2.5 text-gray-300 text-sm">Suspicious link and attachment analysis</span>
                </li>
                <li className="flex items-start p-2.5 rounded-lg bg-gray-800/40 border border-gray-700/30 hover:border-red-500/40 transition-all duration-200">
                  <div className="flex-shrink-0 h-4 w-4 text-red-400 mt-0.5">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="ml-2.5 text-gray-300 text-sm">Malware and ransomware scanning</span>
                </li>
                <li className="flex items-start p-2.5 rounded-lg bg-gray-800/40 border border-gray-700/30 hover:border-red-500/40 transition-all duration-200">
                  <div className="flex-shrink-0 h-4 w-4 text-red-400 mt-0.5">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="ml-2.5 text-gray-300 text-sm">Automated security incident reporting</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-white border-b border-green-500/40 pb-2 flex items-center">
                <svg className="w-4 h-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Wellness & Health Monitoring
              </h3>
              <ul className="space-y-2.5">
                <li className="flex items-start p-2.5 rounded-lg bg-gray-800/40 border border-gray-700/30 hover:border-green-500/40 transition-all duration-200">
                  <div className="flex-shrink-0 h-4 w-4 text-green-400 mt-0.5">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="ml-2.5 text-gray-300 text-sm">Advanced stress level detection through behavioral analysis</span>
                </li>
                <li className="flex items-start p-2.5 rounded-lg bg-gray-800/40 border border-gray-700/30 hover:border-green-500/40 transition-all duration-200">
                  <div className="flex-shrink-0 h-4 w-4 text-green-400 mt-0.5">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="ml-2.5 text-gray-300 text-sm">Burnout prevention with early warning systems</span>
                </li>
                <li className="flex items-start p-2.5 rounded-lg bg-gray-800/40 border border-gray-700/30 hover:border-green-500/40 transition-all duration-200">
                  <div className="flex-shrink-0 h-4 w-4 text-green-400 mt-0.5">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="ml-2.5 text-gray-300 text-sm">Health anomaly detection in sleep and activity patterns</span>
                </li>
                <li className="flex items-start p-2.5 rounded-lg bg-gray-800/40 border border-gray-700/30 hover:border-green-500/40 transition-all duration-200">
                  <div className="flex-shrink-0 h-4 w-4 text-green-400 mt-0.5">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="ml-2.5 text-gray-300 text-sm">Personalized wellness recommendations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center py-6 relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-900/30 via-indigo-900/30 to-cyan-900/30 border border-purple-500/20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjAuNSIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjA5Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')] opacity-15"></div>
        <div className="relative z-10">
          <h2 className="text-xl font-extrabold text-white mb-3">Ready to Experience AI Guardian?</h2>
          <p className="text-sm text-gray-300 max-w-xl mx-auto mb-5">
            Transform your enterprise security and employee wellness with our intelligent assistant
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/simulator" className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 flex items-center text-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
              </svg>
              Try the Simulator
            </a>
            <a href="/dashboard" className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all duration-200 flex items-center text-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              View Dashboard
            </a>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-500/20 via-indigo-500/20 to-cyan-500/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
};

export default Chatbot;