import React, { useState, useEffect } from 'react';
import useStore from '../store/useStore';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

const BusinessInsights = () => {
  const { agentActions, notifications } = useStore();
  const [roiData, setRoiData] = useState({
    employees: 100,
    phishingCost: 4910000, // Average cost per phishing incident in USD
    burnoutRate: 25 // Percentage
  });
  
  const [calculatedROI, setCalculatedROI] = useState(null);

  // Calculate ROI based on inputs
  const calculateROI = () => {
    const { employees, phishingCost, burnoutRate } = roiData;
    
    // Estimated incidents prevented per year
    const phishingIncidentsPrevented = Math.floor(employees * 0.15); // 15% reduction
    const burnoutCasesPrevented = Math.floor(employees * (burnoutRate / 100) * 0.3); // 30% reduction
    
    // Cost savings
    const phishingSavings = phishingIncidentsPrevented * phishingCost;
    const productivitySavings = burnoutCasesPrevented * 50000; // $50k avg productivity cost per burnout case
    const healthcareSavings = burnoutCasesPrevented * 25000; // $25k avg healthcare cost per burnout case
    
    const totalSavings = phishingSavings + productivitySavings + healthcareSavings;
    const platformCost = employees * 1200; // $1200 per employee per year
    
    setCalculatedROI({
      phishingIncidentsPrevented,
      burnoutCasesPrevented,
      phishingSavings: phishingSavings.toLocaleString(),
      productivitySavings: productivitySavings.toLocaleString(),
      healthcareSavings: healthcareSavings.toLocaleString(),
      totalSavings: totalSavings.toLocaleString(),
      platformCost: platformCost.toLocaleString(),
      netSavings: (totalSavings - platformCost).toLocaleString(),
      roiPercentage: Math.round((totalSavings / platformCost) * 100)
    });
  };

  useEffect(() => {
    calculateROI();
  }, [roiData]);

  // Extended risk data for heatmap with more months and realistic data
  const riskData = {
    digitalThreats: [
      { month: 'Jan', score: 75 },
      { month: 'Feb', score: 68 },
      { month: 'Mar', score: 82 },
      { month: 'Apr', score: 71 },
      { month: 'May', score: 65 },
      { month: 'Jun', score: 58 },
      { month: 'Jul', score: 62 },
      { month: 'Aug', score: 67 },
      { month: 'Sep', score: 73 },
      { month: 'Oct', score: 69 },
      { month: 'Nov', score: 77 },
      { month: 'Dec', score: 81 }
    ],
    wellnessRisks: [
      { month: 'Jan', score: 62 },
      { month: 'Feb', score: 67 },
      { month: 'Mar', score: 71 },
      { month: 'Apr', score: 69 },
      { month: 'May', score: 64 },
      { month: 'Jun', score: 59 },
      { month: 'Jul', score: 61 },
      { month: 'Aug', score: 65 },
      { month: 'Sep', score: 68 },
      { month: 'Oct', score: 63 },
      { month: 'Nov', score: 66 },
      { month: 'Dec', score: 70 }
    ],
    healthAnomalies: [
      { month: 'Jan', score: 55 },
      { month: 'Feb', score: 58 },
      { month: 'Mar', score: 62 },
      { month: 'Apr', score: 59 },
      { month: 'May', score: 56 },
      { month: 'Jun', score: 52 },
      { month: 'Jul', score: 54 },
      { month: 'Aug', score: 57 },
      { month: 'Sep', score: 60 },
      { month: 'Oct', score: 58 },
      { month: 'Nov', score: 59 },
      { month: 'Dec', score: 63 }
    ]
  };

  // Industry benchmarks with more metrics
  const benchmarks = {
    stressLevels: { user: 65, industry: 68 },
    cyberVulnerability: { user: 42, industry: 58 },
    wellnessScore: { user: 72, industry: 65 },
    productivity: { user: 82, industry: 75 },
    retention: { user: 88, industry: 82 }
  };

  // Business metrics with extended data
  const businessMetrics = {
    phishingPrevented: agentActions.filter(a => a.agentType === 'phishing').length,
    burnoutSaved: Math.floor(agentActions.filter(a => a.agentType === 'stress').length * 2.5),
    financialLossAvoided: (agentActions.filter(a => a.agentType === 'phishing').length * 4910000 / 1000000).toFixed(1),
    safetyScore: Math.floor((agentActions.length > 0 ? 
      agentActions.reduce((sum, action) => sum + (action.response?.severity || action.response?.risk_score || 0), 0) / agentActions.length : 0) * 0.8)
  };

  // Data for charts
  const monthlyRiskData = [
    { month: 'Jan', threats: 75, wellness: 62, health: 55 },
    { month: 'Feb', threats: 68, wellness: 67, health: 58 },
    { month: 'Mar', threats: 82, wellness: 71, health: 62 },
    { month: 'Apr', threats: 71, wellness: 69, health: 59 },
    { month: 'May', threats: 65, wellness: 64, health: 56 },
    { month: 'Jun', threats: 58, wellness: 59, health: 52 },
    { month: 'Jul', threats: 62, wellness: 61, health: 54 },
    { month: 'Aug', threats: 67, wellness: 65, health: 57 },
    { month: 'Sep', threats: 73, wellness: 68, health: 60 },
    { month: 'Oct', threats: 69, wellness: 63, health: 58 },
    { month: 'Nov', threats: 77, wellness: 66, health: 59 },
    { month: 'Dec', threats: 81, wellness: 70, health: 63 }
  ];

  const agentDistributionData = [
    { name: 'Phishing Detection', value: agentActions.filter(a => a.agentType === 'phishing').length },
    { name: 'Stress Monitoring', value: agentActions.filter(a => a.agentType === 'stress').length },
    { name: 'Health Anomalies', value: agentActions.filter(a => a.agentType === 'health').length }
  ];

  // Generate quarterly data for bar chart
  const quarterlyData = [
    { quarter: 'Q1', threats: 225, wellness: 190, health: 175 },
    { quarter: 'Q2', threats: 184, wellness: 182, health: 167 },
    { quarter: 'Q3', tears: 192, wellness: 194, health: 181 },
    { quarter: 'Q4', threats: 237, wellness: 201, health: 185 }
  ];

  // Generate employee engagement data
  const engagementData = [
    { month: 'Jan', engagement: 72 },
    { month: 'Feb', engagement: 75 },
    { month: 'Mar', engagement: 78 },
    { month: 'Apr', engagement: 76 },
    { month: 'May', engagement: 74 },
    { month: 'Jun', engagement: 77 },
    { month: 'Jul', engagement: 79 },
    { month: 'Aug', engagement: 81 },
    { month: 'Sep', engagement: 83 },
    { month: 'Oct', engagement: 80 },
    { month: 'Nov', engagement: 82 },
    { month: 'Dec', engagement: 85 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const savingsData = calculatedROI ? [
    { name: 'Phishing Savings', value: parseInt(calculatedROI.phishingSavings.replace(/,/g, '')) },
    { name: 'Productivity Savings', value: parseInt(calculatedROI.productivitySavings.replace(/,/g, '')) },
    { name: 'Healthcare Savings', value: parseInt(calculatedROI.healthcareSavings.replace(/,/g, '')) }
  ] : [];

  // Custom label function to prevent overlapping
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${name.split(' ')[0]}: ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 p-8">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Business Insights
            <span className="block text-2xl md:text-3xl font-light text-indigo-400 mt-2">Enterprise Value & ROI Analytics</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl">
            Quantify the business impact of AI Guardian with real-time analytics, ROI calculations, and industry benchmarks.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* ROI Calculator */}
      <div className="rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 overflow-hidden">
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-b border-gray-700/50 px-6 py-4">
          <h3 className="text-xl font-bold text-white">💰 Return on Investment Calculator</h3>
          <p className="text-gray-400 text-sm mt-1">Estimate yearly savings and ROI from implementing AI Guardian</p>
        </div>
        <div className="px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Number of Employees</label>
              <input
                type="number"
                value={roiData.employees}
                onChange={(e) => setRoiData({...roiData, employees: parseInt(e.target.value) || 0})}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Avg. Phishing Incident Cost ($)</label>
              <input
                type="number"
                value={roiData.phishingCost}
                onChange={(e) => setRoiData({...roiData, phishingCost: parseInt(e.target.value) || 0})}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Burnout Rate (%)</label>
              <input
                type="number"
                value={roiData.burnoutRate}
                onChange={(e) => setRoiData({...roiData, burnoutRate: parseInt(e.target.value) || 0})}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
          </div>
          
          {calculatedROI && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-4">
                <p className="text-green-400 text-sm font-medium">Total Savings</p>
                <p className="text-2xl font-bold text-white mt-1">${calculatedROI.totalSavings}</p>
                <p className="text-xs text-gray-400 mt-1">Per Year</p>
              </div>
              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-4">
                <p className="text-cyan-400 text-sm font-medium">Platform Cost</p>
                <p className="text-2xl font-bold text-white mt-1">${calculatedROI.platformCost}</p>
                <p className="text-xs text-gray-400 mt-1">Per Year</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4">
                <p className="text-purple-400 text-sm font-medium">Net Savings</p>
                <p className="text-2xl font-bold text-white mt-1">${calculatedROI.netSavings}</p>
                <p className="text-xs text-gray-400 mt-1">Per Year</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4">
                <p className="text-yellow-400 text-sm font-medium">ROI</p>
                <p className="text-2xl font-bold text-white mt-1">{calculatedROI.roiPercentage}%</p>
                <p className="text-xs text-gray-400 mt-1">Return on Investment</p>
              </div>
            </div>
          )}

          {/* Savings Breakdown Chart */}
          {calculatedROI && (
            <div className="mt-8">
              <h4 className="text-lg font-bold text-white mb-4">Savings Breakdown</h4>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={savingsData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name.split(' ')[0]}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {savingsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Business Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 p-6 hover:border-blue-500/50 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-blue-500/20">
                <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-white">{businessMetrics.phishingPrevented}</p>
            <p className="text-gray-400 text-sm mt-2">Phishing Incidents Prevented</p>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 p-6 hover:border-yellow-500/50 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-yellow-500/20">
                <svg className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-white">{businessMetrics.burnoutSaved} hrs</p>
            <p className="text-gray-400 text-sm mt-2">Burnout Hours Saved</p>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 p-6 hover:border-green-500/50 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-green-500/20">
                <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-white">${businessMetrics.financialLossAvoided}M</p>
            <p className="text-gray-400 text-sm mt-2">Financial Loss Avoided</p>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 p-6 hover:border-purple-500/50 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-purple-500/20">
                <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-white">{businessMetrics.safetyScore}/100</p>
            <p className="text-gray-400 text-sm mt-2">Digital Safety Score</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Risk Trends */}
        <div className="rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 overflow-hidden">
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-b border-gray-700/50 px-6 py-4">
            <h3 className="text-lg font-bold text-white">📈 Monthly Risk Trends</h3>
            <p className="text-gray-400 text-sm mt-1">Digital threats, wellness risks, and health anomalies over time</p>
          </div>
          <div className="px-6 py-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyRiskData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }}
                  itemStyle={{ color: '#F9FAFB' }}
                />
                <Legend />
                <Line type="monotone" dataKey="threats" stroke="#EF4444" activeDot={{ r: 8 }} name="Cyber Threats" />
                <Line type="monotone" dataKey="wellness" stroke="#F59E0B" name="Wellness Risks" />
                <Line type="monotone" dataKey="health" stroke="#10B981" name="Health Anomalies" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Agent Distribution */}
        <div className="rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-b border-gray-700/50 px-6 py-4">
            <h3 className="text-lg font-bold text-white">📊 Agent Activity Distribution</h3>
            <p className="text-gray-400 text-sm mt-1">Distribution of AI agent activities across security domains</p>
          </div>
          <div className="px-6 py-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={agentDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {agentDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, 'Events']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quarterly Risk Analysis */}
        <div className="rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-b border-gray-700/50 px-6 py-4">
            <h3 className="text-lg font-bold text-white">📊 Quarterly Risk Analysis</h3>
            <p className="text-gray-400 text-sm mt-1">Risk distribution across quarters</p>
          </div>
          <div className="px-6 py-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={quarterlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="quarter" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }}
                  itemStyle={{ color: '#F9FAFB' }}
                />
                <Legend />
                <Bar dataKey="threats" fill="#EF4444" name="Cyber Threats" />
                <Bar dataKey="wellness" fill="#F59E0B" name="Wellness Risks" />
                <Bar dataKey="health" fill="#10B981" name="Health Anomalies" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Employee Engagement Trend */}
        <div className="rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-b border-gray-700/50 px-6 py-4">
            <h3 className="text-lg font-bold text-white">📈 Employee Engagement Trend</h3>
            <p className="text-gray-400 text-sm mt-1">Employee engagement levels over time</p>
          </div>
          <div className="px-6 py-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={engagementData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" domain={[70, 90]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }}
                  itemStyle={{ color: '#F9FAFB' }}
                />
                <Area type="monotone" dataKey="engagement" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Risk Heatmap and Benchmarks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Heatmap */}
        <div className="rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 overflow-hidden">
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-b border-gray-700/50 px-6 py-4">
            <h3 className="text-lg font-bold text-white">🔥 Risk Heatmap</h3>
            <p className="text-gray-400 text-sm mt-1">Digital threats, wellness risks, and health anomalies over time</p>
          </div>
          <div className="px-6 py-6">
            <div className="space-y-6">
              {Object.entries(riskData).map(([category, data]) => (
                <div key={category}>
                  <h4 className="text-gray-300 font-medium capitalize mb-3">
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                  </h4>
                  <div className="flex items-center space-x-2">
                    {data.map((item, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold ${
                            item.score > 75 ? 'bg-red-500/20 text-red-400' :
                            item.score > 50 ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-green-500/20 text-green-400'
                          }`}
                        >
                          {item.score}
                        </div>
                        <span className="text-xs text-gray-500 mt-1">{item.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Industry Benchmarks */}
        <div className="rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-b border-gray-700/50 px-6 py-4">
            <h3 className="text-lg font-bold text-white">📊 Industry Benchmarks</h3>
            <p className="text-gray-400 text-sm mt-1">Compare your organization against industry standards</p>
          </div>
          <div className="px-6 py-6">
            <div className="space-y-6">
              {Object.entries(benchmarks).map(([metric, values]) => (
                <div key={metric}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300 capitalize">
                      {metric.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-gray-500 text-sm">
                      You: <span className="text-white font-medium">{values.user}</span> | 
                      Industry: <span className="text-gray-400">{values.industry}</span>
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full relative"
                      style={{ width: `${Math.min(100, (values.user / 100) * 100)}%` }}
                    >
                      <div className="absolute right-0 top-0 w-2 h-2 bg-white rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                    <div 
                      className="absolute w-2 h-2 bg-gray-400 rounded-full transform -translate-y-1/2"
                      style={{ 
                        left: `${(values.industry / 100) * 100}%`,
                        top: '50%'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 overflow-hidden">
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-b border-gray-700/50 px-6 py-4">
          <h3 className="text-lg font-bold text-white">📊 Additional Business Metrics</h3>
          <p className="text-gray-400 text-sm mt-1">Extended analytics for comprehensive business insights</p>
        </div>
        <div className="px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-5">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-white">98.7%</p>
                  <p className="text-gray-400 text-sm">Detection Accuracy</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-5">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <svg className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-white">2.3s</p>
                  <p className="text-gray-400 text-sm">Avg. Response Time</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-5">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-white">24/7</p>
                  <p className="text-gray-400 text-sm">Continuous Monitoring</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Recommendations */}
      <div className="rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 overflow-hidden">
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-b border-gray-700/50 px-6 py-4">
          <h3 className="text-lg font-bold text-white">💎 Plan Recommendations</h3>
          <p className="text-gray-400 text-sm mt-1">AI-recommended plans based on organization size</p>
        </div>
        <div className="px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-700 rounded-lg p-6 hover:border-cyan-500/50 transition-colors">
              <h4 className="text-xl font-bold text-white mb-2">Basic</h4>
              <p className="text-cyan-400 text-2xl font-bold mb-4">Up to 50 employees</p>
              <ul className="space-y-2 text-gray-400 text-sm mb-6">
                <li className="flex items-center">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Core threat detection
                </li>
                <li className="flex items-center">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Basic analytics
                </li>
                <li className="flex items-center">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Email support
                </li>
              </ul>
              <p className="text-gray-300 font-medium">$8/employee/month</p>
            </div>
            
            <div className="border-2 border-cyan-500 rounded-lg p-6 relative">
              <div className="absolute top-0 right-0 bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                RECOMMENDED
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Pro</h4>
              <p className="text-cyan-400 text-2xl font-bold mb-4">51-500 employees</p>
              <ul className="space-y-2 text-gray-400 text-sm mb-6">
                <li className="flex items-center">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Advanced threat detection
                </li>
                <li className="flex items-center">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Wellness monitoring
                </li>
                <li className="flex items-center">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Business insights dashboard
                </li>
                <li className="flex items-center">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Priority support
                </li>
              </ul>
              <p className="text-gray-300 font-medium">$12/employee/month</p>
            </div>
            
            <div className="border border-gray-700 rounded-lg p-6 hover:border-purple-500/50 transition-colors">
              <h4 className="text-xl font-bold text-white mb-2">Enterprise</h4>
              <p className="text-cyan-400 text-2xl font-bold mb-4">500+ employees</p>
              <ul className="space-y-2 text-gray-400 text-sm mb-6">
                <li className="flex items-center">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Full threat protection suite
                </li>
                <li className="flex items-center">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Advanced wellness analytics
                </li>
                <li className="flex items-center">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Custom reporting
                </li>
                <li className="flex items-center">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Dedicated account manager
                </li>
                <li className="flex items-center">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  24/7 premium support
                </li>
              </ul>
              <p className="text-gray-300 font-medium">Custom pricing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessInsights;