import React, { useState } from 'react';
import axios from 'axios';

const Events = () => {
  const [activeTab, setActiveTab] = useState('typing');
  const [typingData, setTypingData] = useState({
    recent_messages: '',
    typing_metrics: {
      avg_pause_duration: '',
      keystroke_variance: '',
      backspace_frequency: '',
      typo_rate: ''
    }
  });
  const [messageData, setMessageData] = useState({
    email_subject: '',
    sender: '',
    links: '',
    text: '',
    user_profile: {
      name: '',
      email: ''
    }
  });
  const [healthData, setHealthData] = useState({
    sleep_hours: '',
    steps: '',
    symptoms: ''
  });
  const [loading, setLoading] = useState(false);

  // Use Vite's import.meta.env instead of process.env
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001';

  const handleTypingSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        recent_messages: typingData.recent_messages.split('\n').filter(msg => msg.trim() !== ''),
        typing_metrics: {
          avg_pause_duration: parseFloat(typingData.typing_metrics.avg_pause_duration),
          keystroke_variance: parseFloat(typingData.typing_metrics.keystroke_variance),
          backspace_frequency: parseFloat(typingData.typing_metrics.backspace_frequency),
          typo_rate: parseFloat(typingData.typing_metrics.typo_rate)
        }
      };
      
      const response = await axios.post(`${BACKEND_URL}/api/events/typing`, payload);
      console.log('Typing event submitted:', response.data);
      alert('Typing event submitted successfully!');
    } catch (error) {
      console.error('Error submitting typing event:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Error submitting typing event';
      alert(`Error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        email_subject: messageData.email_subject,
        sender: messageData.sender,
        links: messageData.links.split(',').map(link => link.trim()).filter(link => link !== ''),
        text: messageData.text,
        user_profile: {
          name: messageData.user_profile.name,
          email: messageData.user_profile.email
        }
      };
      
      const response = await axios.post(`${BACKEND_URL}/api/events/message`, payload);
      console.log('Message event submitted:', response.data);
      alert('Message event submitted successfully!');
    } catch (error) {
      console.error('Error submitting message event:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Error submitting message event';
      alert(`Error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleHealthSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        sleep_hours: parseFloat(healthData.sleep_hours),
        steps: parseInt(healthData.steps),
        symptoms: healthData.symptoms.split(',').map(symptom => symptom.trim()).filter(symptom => symptom !== '')
      };
      
      const response = await axios.post(`${BACKEND_URL}/api/events/health`, payload);
      console.log('Health event submitted:', response.data);
      alert('Health event submitted successfully!');
    } catch (error) {
      console.error('Error submitting health event:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Error submitting health event';
      alert(`Error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'typing', name: 'Typing Metrics', icon: '⌨️' },
    { id: 'message', name: 'Message Content', icon: '✉️' },
    { id: 'health', name: 'Health Data', icon: '❤️' }
  ];

  const eventTypes = [
    {
      title: 'Typing Behavior Analysis',
      description: 'Monitor workplace stress indicators through keystroke dynamics and typing patterns',
      metrics: ['Pause Duration', 'Keystroke Variance', 'Backspace Frequency', 'Typo Rate']
    },
    {
      title: 'Message Content Scanning',
      description: 'Analyze email communications for phishing risks and sensitive data exposure',
      metrics: ['Sender Authentication', 'Link Safety', 'Content Analysis', 'User Profiling']
    },
    {
      title: 'Health Pattern Monitoring',
      description: 'Track employee wellness indicators for proactive health intervention',
      metrics: ['Sleep Quality', 'Activity Levels', 'Symptom Tracking', 'Risk Assessment']
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-yellow-500/10 border border-orange-500/20 p-8">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Enterprise Data Integration
            <span className="block text-2xl md:text-3xl font-light text-amber-400 mt-2">Secure Data Processing & Analytics</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl">
            Submit real enterprise events for AI Guardian analysis. Our system processes workplace communications, behavioral metrics, 
            and health data to provide comprehensive protection and insights.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Data Integration Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {eventTypes.map((event, index) => (
          <div key={index} className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 p-6 hover:border-amber-500/50 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <h4 className="text-lg font-bold text-white mb-2">{event.title}</h4>
              <p className="text-gray-400 text-sm mb-4">{event.description}</p>
              <ul className="space-y-2">
                {event.metrics.map((metric, idx) => (
                  <li key={idx} className="flex items-center text-gray-400 text-sm">
                    <svg className="h-4 w-4 text-amber-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {metric}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Data Submission Form */}
      <div className="rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border-b border-gray-700/50 px-6 py-6">
          <h3 className="text-2xl font-black text-white">Event Data Submission</h3>
          <p className="mt-2 text-gray-400">
            Securely submit enterprise events for AI analysis and protection
          </p>
        </div>
        <div className="px-6 py-6">
          {/* Tab Navigation */}
          <div className="border-b border-gray-700 mb-6">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-amber-500 text-amber-500'
                      : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === 'typing' && (
              <form onSubmit={handleTypingSubmit} className="space-y-6">
                <div>
                  <label htmlFor="recent_messages" className="block text-sm font-medium text-gray-300 mb-2">
                    Recent Messages
                  </label>
                  <p className="text-xs text-gray-500 mb-3">
                    Enter recent workplace communications, one per line (used for stress and behavioral analysis)
                  </p>
                  <textarea
                    id="recent_messages"
                    rows={4}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Enter recent messages here..."
                    value={typingData.recent_messages}
                    onChange={(e) => setTypingData({...typingData, recent_messages: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="avg_pause_duration" className="block text-sm font-medium text-gray-300 mb-2">
                      Average Pause Duration (ms)
                    </label>
                    <p className="text-xs text-gray-500 mb-3">
                      Workplace typing behavior analysis metric
                    </p>
                    <input
                      type="number"
                      id="avg_pause_duration"
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="e.g., 350"
                      value={typingData.typing_metrics.avg_pause_duration}
                      onChange={(e) => setTypingData({
                        ...typingData, 
                        typing_metrics: {...typingData.typing_metrics, avg_pause_duration: e.target.value}
                      })}
                    />
                  </div>

                  <div>
                    <label htmlFor="keystroke_variance" className="block text-sm font-medium text-gray-300 mb-2">
                      Keystroke Variance
                    </label>
                    <p className="text-xs text-gray-500 mb-3">
                      Workplace stress indicator metric
                    </p>
                    <input
                      type="number"
                      step="0.01"
                      id="keystroke_variance"
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="e.g., 0.75"
                      value={typingData.typing_metrics.keystroke_variance}
                      onChange={(e) => setTypingData({
                        ...typingData, 
                        typing_metrics: {...typingData.typing_metrics, keystroke_variance: e.target.value}
                      })}
                    />
                  </div>

                  <div>
                    <label htmlFor="backspace_frequency" className="block text-sm font-medium text-gray-300 mb-2">
                      Backspace Frequency
                    </label>
                    <p className="text-xs text-gray-500 mb-3">
                      Workplace correction behavior analysis metric
                    </p>
                    <input
                      type="number"
                      step="0.01"
                      id="backspace_frequency"
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="e.g., 0.12"
                      value={typingData.typing_metrics.backspace_frequency}
                      onChange={(e) => setTypingData({
                        ...typingData, 
                        typing_metrics: {...typingData.typing_metrics, backspace_frequency: e.target.value}
                      })}
                    />
                  </div>

                  <div>
                    <label htmlFor="typo_rate" className="block text-sm font-medium text-gray-300 mb-2">
                      Typo Rate
                    </label>
                    <p className="text-xs text-gray-500 mb-3">
                      Workplace cognitive load indicator metric
                    </p>
                    <input
                      type="number"
                      step="0.01"
                      id="typo_rate"
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="e.g., 0.05"
                      value={typingData.typing_metrics.typo_rate}
                      onChange={(e) => setTypingData({
                        ...typingData, 
                        typing_metrics: {...typingData.typing_metrics, typo_rate: e.target.value}
                      })}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${
                      loading ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Submit Typing Event'
                    )}
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'message' && (
              <form onSubmit={handleMessageSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email_subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Subject
                    </label>
                    <p className="text-xs text-gray-500 mb-3">
                      Enterprise email security analysis
                    </p>
                    <input
                      type="text"
                      id="email_subject"
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="e.g., Quarterly Financial Report"
                      value={messageData.email_subject}
                      onChange={(e) => setMessageData({...messageData, email_subject: e.target.value})}
                    />
                  </div>

                  <div>
                    <label htmlFor="sender" className="block text-sm font-medium text-gray-300 mb-2">
                      Sender
                    </label>
                    <p className="text-xs text-gray-500 mb-3">
                      Enterprise email authentication
                    </p>
                    <input
                      type="text"
                      id="sender"
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="e.g., john.doe@company.com"
                      value={messageData.sender}
                      onChange={(e) => setMessageData({...messageData, sender: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="links" className="block text-sm font-medium text-gray-300 mb-2">
                    Links
                  </label>
                  <p className="text-xs text-gray-500 mb-3">
                    Enterprise URL security scanning (comma-separated)
                  </p>
                  <input
                    type="text"
                    id="links"
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="e.g., https://company.com/report, https://external-site.com"
                    value={messageData.links}
                    onChange={(e) => setMessageData({...messageData, links: e.target.value})}
                  />
                </div>

                <div>
                  <label htmlFor="text" className="block text-sm font-medium text-gray-300 mb-2">
                    Message Text
                  </label>
                  <p className="text-xs text-gray-500 mb-3">
                    Enterprise content security analysis
                  </p>
                  <textarea
                    id="text"
                    rows={4}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Enter the full message content here..."
                    value={messageData.text}
                    onChange={(e) => setMessageData({...messageData, text: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="user_name" className="block text-sm font-medium text-gray-300 mb-2">
                      User Name
                    </label>
                    <p className="text-xs text-gray-500 mb-3">
                      Enterprise user identification
                    </p>
                    <input
                      type="text"
                      id="user_name"
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="e.g., John Doe"
                      value={messageData.user_profile.name}
                      onChange={(e) => setMessageData({
                        ...messageData, 
                        user_profile: {...messageData.user_profile, name: e.target.value}
                      })}
                    />
                  </div>

                  <div>
                    <label htmlFor="user_email" className="block text-sm font-medium text-gray-300 mb-2">
                      User Email
                    </label>
                    <p className="text-xs text-gray-500 mb-3">
                      Enterprise user authentication
                    </p>
                    <input
                      type="email"
                      id="user_email"
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="e.g., john.doe@company.com"
                      value={messageData.user_profile.email}
                      onChange={(e) => setMessageData({
                        ...messageData, 
                        user_profile: {...messageData.user_profile, email: e.target.value}
                      })}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${
                      loading ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Submit Message Event'
                    )}
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'health' && (
              <form onSubmit={handleHealthSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="sleep_hours" className="block text-sm font-medium text-gray-300 mb-2">
                      Sleep Hours
                    </label>
                    <p className="text-xs text-gray-500 mb-3">
                      Enterprise wellness program tracking
                    </p>
                    <input
                      type="number"
                      step="0.1"
                      id="sleep_hours"
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="e.g., 7.5"
                      value={healthData.sleep_hours}
                      onChange={(e) => setHealthData({...healthData, sleep_hours: e.target.value})}
                    />
                  </div>

                  <div>
                    <label htmlFor="steps" className="block text-sm font-medium text-gray-300 mb-2">
                      Steps
                    </label>
                    <p className="text-xs text-gray-500 mb-3">
                      Enterprise fitness program monitoring
                    </p>
                    <input
                      type="number"
                      id="steps"
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="e.g., 8500"
                      value={healthData.steps}
                      onChange={(e) => setHealthData({...healthData, steps: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="symptoms" className="block text-sm font-medium text-gray-300 mb-2">
                    Symptoms
                  </label>
                  <p className="text-xs text-gray-500 mb-3">
                    Enterprise health risk assessment (comma-separated)
                  </p>
                  <input
                    type="text"
                    id="symptoms"
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="e.g., headache, fatigue, stress"
                    value={healthData.symptoms}
                    onChange={(e) => setHealthData({...healthData, symptoms: e.target.value})}
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${
                      loading ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Submit Health Event'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Data Security Notice */}
      <div className="rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 overflow-hidden">
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-b border-gray-700/50 px-6 py-4">
          <h3 className="text-lg font-bold text-white">🔒 Enterprise Data Security</h3>
        </div>
        <div className="px-6 py-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="p-2 rounded-lg bg-cyan-500/20">
                <svg className="h-6 w-6 text-cyan-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm text-cyan-100">
                <strong className="text-cyan-300">Data Protection:</strong> All submitted data is processed securely and never stored. 
                Our system uses advanced encryption and follows enterprise-grade security protocols to ensure your information remains confidential. 
                Data is analyzed in real-time and immediately discarded after processing to maintain privacy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;