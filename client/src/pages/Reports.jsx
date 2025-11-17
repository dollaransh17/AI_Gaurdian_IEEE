import React, { useState, useEffect } from 'react';
import useStore from '../store/useStore';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const Reports = () => {
  const { agentActions, notifications, auditLogs } = useStore();
  const [reportType, setReportType] = useState('monthly');
  const [exportFormat, setExportFormat] = useState('pdf');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState(null);

  // Use Vite's import.meta.env instead of process.env
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001';

  // Generate monthly safety report
  const generateMonthlyReport = () => {
    setIsGenerating(true);
    setGenerationError(null);
    try {
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(22);
      doc.setTextColor(40, 40, 40);
      doc.text('AI Guardian Monthly Safety Report', 20, 20);
      
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
      
      // Summary statistics
      const phishingCount = agentActions.filter(a => a.agentType === 'phishing').length;
      const stressCount = agentActions.filter(a => a.agentType === 'stress').length;
      const healthCount = agentActions.filter(a => a.agentType === 'health').length;
      
      doc.setFontSize(16);
      doc.setTextColor(40, 40, 40);
      doc.text('Executive Summary', 20, 45);
      
      doc.setFontSize(12);
      doc.text(`Phishing Incidents Detected: ${phishingCount}`, 25, 55);
      doc.text(`Stress Events Detected: ${stressCount}`, 25, 62);
      doc.text(`Health Anomalies Detected: ${healthCount}`, 25, 69);
      
      // Agent Activity Summary
      doc.setFontSize(16);
      doc.setTextColor(40, 40, 40);
      doc.text('Agent Activity Summary', 20, 85);
      
      const agentData = [
        ['Phishing Investigator', phishingCount, `${Math.round(phishingCount > 0 ? agentActions.filter(a => a.agentType === 'phishing')[0].response?.severity || 0 : 0)}%`],
        ['Stress Detection Agent', stressCount, `${Math.round(stressCount > 0 ? agentActions.filter(a => a.agentType === 'stress')[0].response?.severity || 0 : 0)}%`],
        ['Health Pattern Agent', healthCount, `${Math.round(healthCount > 0 ? agentActions.filter(a => a.agentType === 'health')[0].response?.risk_score || 0 : 0)}%`]
      ];
      
      // Use the correct autotable function
      autoTable(doc, {
        startY: 90,
        head: [['Agent', 'Events Handled', 'Avg. Severity']],
        body: agentData,
        theme: 'grid',
        styles: { fontSize: 10 },
        headStyles: { fillColor: [67, 56, 202] }
      });
      
      // Recommendations
      doc.setFontSize(16);
      doc.setTextColor(40, 40, 40);
      doc.text('AI Recommendations', 20, doc.lastAutoTable.finalY + 15);
      
      doc.setFontSize(12);
      doc.text('1. Continue monitoring email security protocols', 25, doc.lastAutoTable.finalY + 25);
      doc.text('2. Implement stress reduction workshops for high-risk users', 25, doc.lastAutoTable.finalY + 32);
      doc.text('3. Review health and wellness program effectiveness', 25, doc.lastAutoTable.finalY + 39);
      
      // Save the PDF
      doc.save('ai-guardian-monthly-report.pdf');
      
      alert('Report generated successfully!');
    } catch (error) {
      console.error('Error generating report:', error);
      setGenerationError('Failed to generate report: ' + error.message);
      alert('Error generating report: ' + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    setIsGenerating(true);
    setGenerationError(null);
    try {
      const headers = ['Timestamp', 'Event Type', 'Severity', 'Actions Taken'];
      const rows = agentActions.map(action => [
        new Date(action.timestamp).toLocaleString(),
        action.agentType,
        action.response?.severity || action.response?.risk_score || 'N/A',
        action.response?.steps?.map(step => step.text).join('; ') || 'N/A'
      ]);
      
      let csvContent = headers.join(',') + '\n';
      rows.forEach(row => {
        csvContent += row.map(field => `"${field}"`).join(',') + '\n';
      });
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'ai-guardian-data.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      alert('CSV exported successfully!');
    } catch (error) {
      console.error('Error exporting CSV:', error);
      setGenerationError('Failed to export CSV: ' + error.message);
      alert('Error exporting CSV: ' + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  // Export to JSON
  const exportToJSON = () => {
    setIsGenerating(true);
    setGenerationError(null);
    try {
      const data = {
        reportGenerated: new Date().toISOString(),
        agentActions: agentActions,
        notifications: notifications,
        auditLogs: auditLogs
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'ai-guardian-data.json');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      alert('JSON exported successfully!');
    } catch (error) {
      console.error('Error exporting JSON:', error);
      setGenerationError('Failed to export JSON: ' + error.message);
      alert('Error exporting JSON: ' + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle export
  const handleExport = () => {
    switch (exportFormat) {
      case 'pdf':
        generateMonthlyReport();
        break;
      case 'csv':
        exportToCSV();
        break;
      case 'json':
        exportToJSON();
        break;
      default:
        setGenerationError('Invalid export format selected');
        break;
    }
  };

  // Compliance data
  const complianceData = {
    iso27001: {
      status: 'In Progress',
      percentage: 75,
      requirements: [
        'Information Security Policy',
        'Risk Assessment',
        'Access Control',
        'Cryptography',
        'Physical Security'
      ]
    },
    soc2: {
      status: 'Partially Compliant',
      percentage: 60,
      requirements: [
        'Security',
        'Availability',
        'Processing Integrity',
        'Confidentiality',
        'Privacy'
      ]
    }
  };

  // Automated summary
  const automatedSummary = {
    safetyScore: Math.floor((agentActions.length > 0 ? 
      agentActions.reduce((sum, action) => sum + (action.response?.severity || action.response?.risk_score || 0), 0) / agentActions.length : 0) * 0.8),
    topThreats: agentActions
      .filter(a => a.agentType === 'phishing')
      .slice(0, 3)
      .map(a => a.response?.explanation?.split('\n')[0] || 'Suspicious email detected'),
    wellnessPatterns: agentActions
      .filter(a => a.agentType === 'stress')
      .slice(0, 3)
      .map(a => a.response?.explanation?.split('\n')[0] || 'Stress indicators detected'),
    recommendedImprovements: [
      'Implement advanced email filtering protocols',
      'Schedule regular stress assessment workshops',
      'Enhance employee health monitoring programs',
      'Review and update security policies quarterly'
    ]
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-500/20 p-8">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Reports & Analytics
            <span className="block text-2xl md:text-3xl font-light text-emerald-400 mt-2">Compliance & Documentation</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl">
            Generate professional reports, export data, and ensure compliance with industry standards.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Report Generator */}
      <div className="rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-b border-gray-700/50 px-6 py-4">
          <h3 className="text-xl font-bold text-white">📄 Report Generator</h3>
          <p className="text-gray-400 text-sm mt-1">Create professional reports for stakeholders and compliance</p>
        </div>
        <div className="px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Report Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="monthly">Monthly Safety Report</option>
                <option value="quarterly">Quarterly Security Review</option>
                <option value="annual">Annual Compliance Report</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Export Format</label>
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="pdf">PDF Document</option>
                <option value="csv">CSV Export</option>
                <option value="json">JSON Data</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={handleExport}
                disabled={isGenerating}
                className={`w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg shadow-purple-500/20 flex items-center justify-center ${
                  isGenerating ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  'Generate Report'
                )}
              </button>
            </div>
          </div>
          
          {generationError && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded-lg">
              <p className="text-red-300 text-sm">Error: {generationError}</p>
            </div>
          )}
          
          <div className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 border border-gray-600 rounded-lg p-4">
            <h4 className="text-gray-300 font-medium mb-2">Report Preview</h4>
            <p className="text-gray-400 text-sm">
              {reportType === 'monthly' && "Monthly safety report including threat detection summary, agent activity, and AI recommendations."}
              {reportType === 'quarterly' && "Quarterly security review with trend analysis, compliance status, and strategic recommendations."}
              {reportType === 'annual' && "Annual compliance report covering all security protocols, audit trails, and regulatory adherence."}
            </p>
          </div>
        </div>
      </div>

      {/* Automated Summary */}
      <div className="rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 overflow-hidden">
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-b border-gray-700/50 px-6 py-4">
          <h3 className="text-lg font-bold text-white">🤖 AI-Powered Summary</h3>
          <p className="text-gray-400 text-sm mt-1">Automated analysis of your last 30 days of activity</p>
        </div>
        <div className="px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 border border-gray-600 rounded-lg p-6">
                <h4 className="text-gray-300 font-medium mb-4">Overall Safety Score</h4>
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full border-8 border-gray-700 flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">{automatedSummary.safetyScore}<span className="text-xl">/100</span></span>
                    </div>
                    <div 
                      className="absolute top-0 left-0 w-32 h-32 rounded-full border-8 border-cyan-500 border-t-cyan-500 border-r-cyan-500 border-b-transparent border-l-transparent"
                      style={{ transform: `rotate(${automatedSummary.safetyScore * 3.6}deg)` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 border border-gray-600 rounded-lg p-6 mt-6">
                <h4 className="text-gray-300 font-medium mb-4">Top Threats Detected</h4>
                <ul className="space-y-3">
                  {automatedSummary.topThreats.map((threat, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      </div>
                      <p className="text-gray-400 text-sm ml-3">{threat}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div>
              <div className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 border border-gray-600 rounded-lg p-6">
                <h4 className="text-gray-300 font-medium mb-4">Wellness Patterns</h4>
                <ul className="space-y-3">
                  {automatedSummary.wellnessPatterns.map((pattern, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      </div>
                      <p className="text-gray-400 text-sm ml-3">{pattern}</p>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 border border-gray-600 rounded-lg p-6 mt-6">
                <h4 className="text-gray-300 font-medium mb-4">Recommended Improvements</h4>
                <ul className="space-y-3">
                  {automatedSummary.recommendedImprovements.map((improvement, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-400 text-sm ml-3">{improvement}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Incident Logs */}
      <div className="rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 overflow-hidden">
        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-b border-gray-700/50 px-6 py-4">
          <h3 className="text-lg font-bold text-white">📝 Incident Logs</h3>
          <p className="text-gray-400 text-sm mt-1">Complete record of all system events</p>
        </div>
        <div className="px-6 py-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Event Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Severity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions Taken</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Agent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {agentActions.slice().reverse().slice(0, 10).map((action, index) => (
                  <tr key={index} className="hover:bg-gray-800/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {new Date(action.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 capitalize">
                      {action.agentType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        (action.response?.severity || action.response?.risk_score || 0) > 75 ? 'bg-red-900/50 text-red-300' :
                        (action.response?.severity || action.response?.risk_score || 0) > 50 ? 'bg-yellow-900/50 text-yellow-300' :
                        'bg-green-900/50 text-green-300'
                      }`}>
                        {action.response?.severity || action.response?.risk_score || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400 max-w-xs">
                      <div className="line-clamp-2">
                        {action.response?.steps?.map(step => step.text).join(', ') || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 capitalize">
                      {action.agentType} Agent
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Compliance Report */}
      <div className="rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-b border-gray-700/50 px-6 py-4">
          <h3 className="text-lg font-bold text-white">🔒 Compliance Report</h3>
          <p className="text-gray-400 text-sm mt-1">Enterprise-ready compliance documentation</p>
        </div>
        <div className="px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(complianceData).map(([standard, data]) => (
              <div key={standard} className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 border border-gray-600 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-xl font-bold text-white capitalize">{standard}</h4>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    data.status === 'In Progress' ? 'bg-yellow-900/50 text-yellow-300' :
                    data.status === 'Partially Compliant' ? 'bg-orange-900/50 text-orange-300' :
                    'bg-green-900/50 text-green-300'
                  }`}>
                    {data.status}
                  </span>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>Compliance Progress</span>
                    <span>{data.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
                      style={{ width: `${data.percentage}%` }}
                    ></div>
                  </div>
                </div>
                
                <h5 className="text-gray-300 font-medium mb-3">Requirements Covered:</h5>
                <ul className="space-y-2">
                  {data.requirements.map((req, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-400">
                      <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-6 bg-gradient-to-r from-gray-700/50 to-gray-800/50 border border-gray-600 rounded-lg p-6">
            <h4 className="text-gray-300 font-medium mb-3">HIPAA-like Recommendations</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <li className="flex items-center text-sm text-gray-400">
                <svg className="h-4 w-4 text-cyan-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Implement encryption for all health data
              </li>
              <li className="flex items-center text-sm text-gray-400">
                <svg className="h-4 w-4 text-cyan-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Establish audit trails for all access
              </li>
              <li className="flex items-center text-sm text-gray-400">
                <svg className="h-4 w-4 text-cyan-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Regular security risk assessments
              </li>
              <li className="flex items-center text-sm text-gray-400">
                <svg className="h-4 w-4 text-cyan-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Employee privacy training programs
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;