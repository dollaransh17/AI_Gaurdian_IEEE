import { create } from 'zustand';

// Generate random data for agent actions
const generateRandomAgentActions = () => {
  const actionTypes = ['phishing', 'stress', 'health'];
  const phishingExplanations = [
    'Suspicious email detected with multiple red flags:\n• Sender domain mismatch: fake-bank-alert.com\n• Urgent language patterns detected\n• Suspicious link found: http://suspicious-bank-login.com/secure-login\n• Unusual grammar and spelling errors',
    'Phishing attempt identified:\n• Spoofed sender address mimicking corporate domain\n• Embedded malicious URL detected\n• Social engineering tactics employed\n• Request for sensitive credentials',
    'Advanced phishing threat neutralized:\n• Zero-day attack vector identified\n• Multi-stage payload delivery attempt\n• Domain impersonation detected\n• Attachment with malicious macro detected'
  ];
  
  const stressExplanations = [
    'Stress indicators detected through typing behavior analysis:\n• Increased pause duration: 4200ms (normal: 1500ms)\n• High keystroke variance: 0.85 (normal: 0.3)\n• Elevated backspace frequency: 0.42 (normal: 0.1)\n• Increased typo rate: 0.18 (normal: 0.05)',
    'Workplace stress patterns identified:\n• Extended work hours detected\n• Reduced break frequency\n• Elevated response time variance\n• Increased error correction rate',
    'Burnout risk indicators detected:\n• Chronic fatigue patterns\n• Decreased engagement metrics\n• Elevated absenteeism trends\n• Reduced productivity signals'
  ];
  
  const healthExplanations = [
    'Health pattern anomaly detected:\n• Sleep hours: 3.5 hours (recommended: 7-9 hours)\n• Steps: 1200 (recommended: 8000+ steps)\n• Symptoms reported: fatigue, headache, irritability',
    'Wellness monitoring alert:\n• Heart rate variability decreased\n• Activity levels below baseline\n• Sleep quality metrics poor\n• Stress biomarkers elevated',
    'Health risk assessment triggered:\n• Blood pressure elevated\n• Activity tracker anomalies\n• Nutrition pattern irregularities\n• Recovery metrics suboptimal'
  ];
  
  const steps = [
    [
      { 
        action: "notify_user", 
        text: "🚨 SECURITY ALERT: This email has been flagged as potentially malicious. Do not click any links or provide personal information."
      },
      { 
        action: "quarantine_email", 
        text: "Email has been moved to quarantine folder for further analysis."
      },
      { 
        action: "notify_it", 
        text: "IT security team has been notified of this potential threat."
      }
    ],
    [
      { 
        action: "send_notification", 
        text: "⚠️ WELLNESS ALERT: Elevated stress levels detected. Consider taking a short break."
      },
      { 
        action: "suggest_break", 
        text: "Recommendation: Take a 5-minute walk or do some breathing exercises."
      },
      { 
        action: "schedule_checkin", 
        text: "A wellness check-in has been scheduled with your manager for later today."
      }
    ],
    [
      { 
        action: "send_notification", 
        text: "🏥 HEALTH ALERT: Unusual health patterns detected. Please prioritize rest and hydration."
      },
      { 
        action: "suggest_wellness", 
        text: "Recommendation: Consider using wellness resources or speaking with HR about stress management."
      },
      { 
        action: "follow_up", 
        text: "A follow-up health check has been scheduled for tomorrow."
      }
    ]
  ];
  
  // Generate 50 random agent actions
  const actions = [];
  for (let i = 0; i < 50; i++) {
    const typeIndex = Math.floor(Math.random() * actionTypes.length);
    const type = actionTypes[typeIndex];
    const severity = Math.floor(Math.random() * 40) + 60; // 60-99
    const timestamp = Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000); // Random time within last 30 days
    
    let explanation, actionSteps;
    if (type === 'phishing') {
      explanation = phishingExplanations[Math.floor(Math.random() * phishingExplanations.length)];
      actionSteps = steps[0];
    } else if (type === 'stress') {
      explanation = stressExplanations[Math.floor(Math.random() * stressExplanations.length)];
      actionSteps = steps[1];
    } else {
      explanation = healthExplanations[Math.floor(Math.random() * healthExplanations.length)];
      actionSteps = steps[2];
    }
    
    actions.push({
      agentType: type,
      response: {
        severity: type === 'health' ? undefined : severity,
        risk_score: type === 'health' ? severity : undefined,
        explanation,
        steps: actionSteps
      },
      timestamp
    });
  }
  
  return actions;
};

// Generate random notifications
const generateRandomNotifications = () => {
  const notificationMessages = [
    "Phishing email detected and quarantined",
    "Employee stress levels elevated - wellness check recommended",
    "Health pattern anomaly detected - follow-up scheduled",
    "Security protocol update completed successfully",
    "New threat intelligence feed integrated",
    "Wellness program enrollment milestone reached",
    "Compliance audit completed with no findings",
    "System performance optimization applied",
    "User training module completion rate increased",
    "Incident response drill successfully executed"
  ];
  
  const notificationTypes = ['alert', 'intervention', 'info'];
  
  const notifications = [];
  for (let i = 0; i < 30; i++) {
    const message = notificationMessages[Math.floor(Math.random() * notificationMessages.length)];
    const type = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
    const timestamp = Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000); // Random time within last 7 days
    
    notifications.push({
      message,
      type,
      timestamp
    });
  }
  
  return notifications;
};

// Generate random audit logs
const generateRandomAuditLogs = () => {
  const auditEvents = [
    "Phishing Detection",
    "Stress Detection",
    "Health Monitoring",
    "System Update",
    "User Authentication",
    "Data Access",
    "Policy Enforcement",
    "Compliance Check",
    "Incident Response",
    "Threat Intelligence Update"
  ];
  
  const auditDetails = [
    "Suspicious email from fake-bank-alert.com quarantined",
    "Employee typing patterns indicate elevated stress levels",
    "Health pattern anomaly detected in employee wellness data",
    "Security patch applied to core system components",
    "User authentication successful with multi-factor verification",
    "Sensitive data access request approved and logged",
    "Compliance policy enforcement triggered for data handling",
    "Regulatory compliance audit completed successfully",
    "Automated incident response workflow executed",
    "New threat intelligence feed integrated and validated"
  ];
  
  const logs = [];
  for (let i = 0; i < 100; i++) {
    const event = auditEvents[Math.floor(Math.random() * auditEvents.length)];
    const detail = auditDetails[Math.floor(Math.random() * auditDetails.length)];
    const timestamp = Date.now() - Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000); // Random time within last 90 days
    
    logs.push({
      event,
      details: detail,
      timestamp
    });
  }
  
  return logs;
};

const useStore = create((set, get) => ({
  // Connection status
  isConnected: false,
  setConnectionStatus: (status) => set({ isConnected: status }),

  // Agent actions with more realistic data
  agentActions: generateRandomAgentActions(),
  addAgentAction: (action) => set((state) => ({
    agentActions: [...state.agentActions, { ...action, timestamp: Date.now() }]
  })),
  clearAgentActions: () => set({ agentActions: [] }),

  // Notifications with more realistic data
  notifications: generateRandomNotifications(),
  addNotification: (notification) => set((state) => ({
    notifications: [...state.notifications, { ...notification, timestamp: Date.now() }]
  })),
  clearNotifications: () => set({ notifications: [] }),

  // Audit logs with more realistic data
  auditLogs: generateRandomAuditLogs(),
  setAuditLogs: (logs) => set({ auditLogs: logs }),
  addAuditLog: (log) => set((state) => ({
    auditLogs: [...state.auditLogs, log]
  })),

  // Stress data
  stressData: [],
  addStressData: (data) => set((state) => ({
    stressData: [...state.stressData, data]
  })),

  // Health data
  healthData: [],
  addHealthData: (data) => set((state) => ({
    healthData: [...state.healthData, data]
  })),

  // Cybersecurity alerts
  cyberAlerts: [],
  addCyberAlert: (alert) => set((state) => ({
    cyberAlerts: [...state.cyberAlerts, alert]
  })),
}));

export default useStore;