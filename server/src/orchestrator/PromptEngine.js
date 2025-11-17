import OpenAI from 'openai';
import { z } from 'zod';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 10000, // 10 second timeout
  maxRetries: 0 // Don't retry, fail fast
});

// JSON schemas for agent responses
const phishingResponseSchema = z.object({
  severity: z.number().min(0).max(100),
  explanation: z.string(),
  steps: z.array(z.object({
    action: z.string(),
    target: z.string().optional(),
    text: z.string()
  }))
});

const stressResponseSchema = z.object({
  severity: z.number().min(0).max(100),
  explanation: z.string(),
  steps: z.array(z.object({
    action: z.string(),
    text: z.string()
  }))
});

const healthResponseSchema = z.object({
  risk_score: z.number().min(0).max(100),
  explanation: z.string(),
  steps: z.array(z.object({
    action: z.string(),
    text: z.string()
  }))
});

// Prompt templates
const PHISHING_INVESTIGATOR_PROMPT = `
You are a Phishing Investigator Agent.
Input: { email_subject, sender, links, text, user_profile }

Task:
1. Return severity (0-100)
2. Give a short explanation
3. Return steps[] containing:
   - notify_user
   - block_url
   - draft_reply

Format your response as valid JSON:
{
  "severity": 75,
  "explanation": "This email exhibits multiple red flags...",
  "steps": [
    {
      "action": "notify_user",
      "text": "Warning: This email may be a phishing attempt..."
    },
    {
      "action": "block_url",
      "target": "http://suspicious-url.com",
      "text": "Blocking suspicious URL"
    }
  ]
}
`;

const STRESS_DETECTION_PROMPT = `
You are a Stress Detection Agent.
Input: { recent_messages, typing_metrics }

Return valid JSON with:
{
  "severity": 65,
  "explanation": "Based on the emotional content and typing patterns...",
  "steps": [
    {
      "action": "micro_intervention",
      "text": "Take a deep breath and consider taking a short break..."
    }
  ]
}
`;

const HEALTH_PATTERN_PROMPT = `
You are a Health Pattern Agent.
Input: { sleep_hours, steps, symptoms }

Return valid JSON with:
{
  "risk_score": 80,
  "explanation": "The sleep pattern and activity level suggest...",
  "steps": [
    {
      "action": "advice",
      "text": "Consider establishing a consistent sleep schedule..."
    }
  ]
}
`;

// Run the appropriate prompt template based on agent type
export const runPrompt = async (agentType, payload) => {
  try {
    let mockResponse;
    
    switch (agentType) {
      case 'phishing':
        mockResponse = {
          severity: Math.floor(Math.random() * 30) + 65, // 65-95
          explanation: `Suspicious email detected with multiple red flags:
• Sender domain mismatch: ${payload.sender || 'unknown'}
• Urgent language patterns detected
• Suspicious link found: ${payload.links?.[0] || 'no links'}
• Unusual grammar and spelling errors`,
          steps: [
            { 
              action: "notify_user", 
              text: "🚨 SECURITY ALERT: This email has been flagged as potentially malicious. Do not click any links or provide personal information."
            },
            { 
              action: "block_url", 
              target: payload.links?.[0] || "suspicious-link", 
              text: `🛡️ Blocking suspicious URL: ${payload.links?.[0] || 'unknown-link'}`
            },
            { 
              action: "draft_reply", 
              text: "📧 Drafting security notification to report this phishing attempt"
            }
          ]
        };
        break;
      case 'stress':
        mockResponse = {
          severity: Math.floor(Math.random() * 25) + 60, // 60-85
          explanation: `Stress indicators detected in typing patterns:
• Average pause duration: ${payload.typing_metrics?.avg_pause_duration || 'N/A'}ms
• Keystroke variance: ${payload.typing_metrics?.keystroke_variance || 'N/A'}
• Backspace frequency: ${payload.typing_metrics?.backspace_frequency || 'N/A'}
• Typo rate: ${payload.typing_metrics?.typo_rate || 'N/A'}
• Emotional content in messages suggests elevated stress levels`,
          steps: [
            { 
              action: "micro_intervention", 
              text: "🧘‍♂️ Take a deep breath. Consider a 5-minute mindfulness break to reduce stress."
            },
            { 
              action: "notify_user", 
              text: "💬 Stress level detected. Suggesting breathing exercises and short break."
            },
            { 
              action: "schedule_reminder", 
              text: "⏰ Scheduling stress check-in for 30 minutes from now"
            }
          ]
        };
        break;
      case 'health':
        mockResponse = {
          risk_score: Math.floor(Math.random() * 30) + 55, // 55-85
          explanation: `Health pattern anomaly detected:
• Sleep hours: ${payload.sleep_hours || 'N/A'} hours
• Daily steps: ${payload.steps || 'N/A'}
• Reported symptoms: ${payload.symptoms?.join(', ') || 'none'}
• Pattern suggests potential disruption in circadian rhythm`,
          steps: [
            { 
              action: "advice", 
              text: "💤 Consider establishing a consistent sleep schedule of 7-8 hours for better health."
            },
            { 
              action: "notify_user", 
              text: "🏃‍♂️ Health alert: Activity levels below recommended baseline. Suggest light exercise."
            },
            { 
              action: "schedule_reminder", 
              text: "🔔 Scheduling health check reminder for tomorrow morning"
            }
          ]
        };
        break;
      default:
        throw new Error(`Unknown agent type: ${agentType}`);
    }

    console.log(`✅ Agent ${agentType} analyzed event with severity: ${mockResponse.severity || mockResponse.risk_score}`);
    return mockResponse;
    
  } catch (error) {
    console.error(`Error running ${agentType} prompt:`, error);
    throw error;
  }
};