import { publishEvent } from '../socket.js';
import { processEvent } from '../orchestrator/AgentOrchestrator.js';

// Simulate phishing event
export const simulatePhishingEvent = async (req, res) => {
  try {
    // Select random phishing scenario
    const scenarios = [
      {
        email_subject: "URGENT: Your account will be suspended!",
        sender: "security@fake-bank-alert.com",
        links: ["http://suspicious-bank-login.com/secure-login"],
        text: "Dear Customer, Your account has been compromised. Please verify your identity immediately by clicking the link below. Failure to act within 24 hours will result in permanent account suspension.",
        user_profile: {
          name: "John Doe",
          email: "john.doe@example.com"
        }
      },
      {
        email_subject: "You've inherited $5,000,000 from a distant relative!",
        sender: "lottery@international-prize.org",
        links: ["http://claim-your-inheritance.com/verify-identity"],
        text: "CONGRATULATIONS! You have been selected as the beneficiary of a large inheritance. Click here to claim your funds. Government fees apply.",
        user_profile: {
          name: "Jane Smith",
          email: "jane.smith@example.com"
        }
      },
      {
        email_subject: "Your Netflix subscription has been charged $249.99",
        sender: "billing@netflix-support.co",
        links: ["http://fake-netflix-billing.com/dispute-charge"],
        text: "Payment Failed: We attempted to charge your card ending in 4821 for $249.99. Your subscription will be suspended unless you update your payment information now.",
        user_profile: {
          name: "Alex Johnson",
          email: "alex.johnson@example.com"
        }
      }
    ];
    
    const selectedScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    
    // Mock phishing event data
    const eventData = {
      type: 'message',
      timestamp: new Date(),
      payload: selectedScenario
    };

    // Publish event via Socket.IO
    await publishEvent('event_stream', eventData);

    // Process event with orchestrator
    await processEvent(eventData);

    res.status(200).json({ 
      success: true, 
      message: 'Phishing event simulated successfully',
      scenario: selectedScenario.email_subject
    });
  } catch (error) {
    console.error('Error simulating phishing event:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to simulate phishing event' 
    });
  }
};

// Simulate stress event
export const simulateStressEvent = async (req, res) => {
  try {
    // Select random stress scenario
    const scenarios = [
      {
        recent_messages: [
          "I can't focus on anything today",
          "My boss is being so difficult",
          "I have too many deadlines and not enough time"
        ],
        typing_metrics: {
          avg_pause_duration: Math.floor(Math.random() * 2000) + 1500, // 1500-3500ms
          keystroke_variance: Math.random() * 0.5 + 0.6, // 0.6-1.1
          backspace_frequency: Math.random() * 0.3 + 0.2, // 0.2-0.5
          typo_rate: Math.random() * 0.1 + 0.1 // 0.1-0.2
        }
      },
      {
        recent_messages: [
          "I'm feeling so anxious about the presentation",
          "What if I mess up in front of everyone?",
          "I can't sleep because my mind won't stop racing"
        ],
        typing_metrics: {
          avg_pause_duration: Math.floor(Math.random() * 3000) + 2000, // 2000-5000ms
          keystroke_variance: Math.random() * 0.4 + 0.7, // 0.7-1.1
          backspace_frequency: Math.random() * 0.2 + 0.3, // 0.3-0.5
          typo_rate: Math.random() * 0.15 + 0.1 // 0.1-0.25
        }
      },
      {
        recent_messages: [
          "Everything is piling up at work",
          "I feel like I'm drowning in tasks",
          "I just want to take a break but I can't"
        ],
        typing_metrics: {
          avg_pause_duration: Math.floor(Math.random() * 1500) + 1000, // 1000-2500ms
          keystroke_variance: Math.random() * 0.3 + 0.5, // 0.5-0.8
          backspace_frequency: Math.random() * 0.4 + 0.1, // 0.1-0.5
          typo_rate: Math.random() * 0.05 + 0.05 // 0.05-0.1
        }
      }
    ];
    
    const selectedScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    
    // Mock stress event data
    const eventData = {
      type: 'typing',
      timestamp: new Date(),
      payload: selectedScenario
    };

    // Publish event via Socket.IO
    await publishEvent('event_stream', eventData);

    // Process event with orchestrator
    await processEvent(eventData);

    res.status(200).json({ 
      success: true, 
      message: 'Stress event simulated successfully',
      metrics: selectedScenario.typing_metrics
    });
  } catch (error) {
    console.error('Error simulating stress event:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to simulate stress event' 
    });
  }
};

// Simulate health anomaly event
export const simulateHealthAnomalyEvent = async (req, res) => {
  try {
    // Select random health scenario
    const scenarios = [
      {
        sleep_hours: Math.random() * 2 + 2, // 2-4 hours
        steps: Math.floor(Math.random() * 1000) + 500, // 500-1500 steps
        symptoms: ["fatigue", "headache", "irritability"]
      },
      {
        sleep_hours: Math.random() * 1.5 + 3, // 3-4.5 hours
        steps: Math.floor(Math.random() * 800) + 300, // 300-1100 steps
        symptoms: ["drowsiness", "difficulty concentrating", "mood swings"]
      },
      {
        sleep_hours: Math.random() * 3 + 1, // 1-4 hours
        steps: Math.floor(Math.random() * 1200) + 200, // 200-1400 steps
        symptoms: ["restlessness", "anxiety", "muscle tension"]
      }
    ];
    
    const selectedScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    
    // Mock health anomaly event data
    const eventData = {
      type: 'health',
      timestamp: new Date(),
      payload: selectedScenario
    };

    // Publish event via Socket.IO
    await publishEvent('event_stream', eventData);

    // Process event with orchestrator
    await processEvent(eventData);

    res.status(200).json({ 
      success: true, 
      message: 'Health anomaly event simulated successfully',
      data: {
        sleep: selectedScenario.sleep_hours.toFixed(1) + ' hours',
        steps: selectedScenario.steps + ' steps',
        symptoms: selectedScenario.symptoms.join(', ')
      }
    });
  } catch (error) {
    console.error('Error simulating health anomaly event:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to simulate health anomaly event' 
    });
  }
};