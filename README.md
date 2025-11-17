# AI Guardian

AI Guardian is a multi-agent AI system for cybersecurity, mental wellness, and health micro-anomalies detection.

## Architecture Diagram

```
┌─────────────────┐    ┌──────────────────┐    ┌────────────────────┐
│   Frontend      │    │   Backend        │    │   Agents           │
│   (React)       │◄──►│   (Node.js)      │◄──►│   (LLM-powered)    │
└─────────────────┘    └──────────────────┘    └────────────────────┘
                              │                         │
                       ┌──────▼──────┐         ┌────────▼────────┐
                       │   Redis     │◄───────►│ OpenAI API      │
                       │ (Pub/Sub)   │         │                 │
                       └─────────────┘         └─────────────────┘
                              │
                       ┌──────▼──────┐
                       │  Database   │
                       │ (MongoDB)   │
                       └─────────────┘
```

## Features

- **Cybersecurity**: Detects phishing/suspicious messages
- **Mental Wellness**: Detects stress via sentiment + typing patterns
- **Health Micro-Anomalies**: Finds sleep/step irregularities
- **Agentic AI**: Spawns dynamic sub-agents to respond to events

## API Endpoints

### Event Collection
- `POST /api/events/typing` - Submit typing metrics
- `POST /api/events/message` - Submit message content
- `POST /api/events/health` - Submit health data
- `POST /api/simulate/phishing` - Simulate phishing event

## WebSocket Events

- `agent_action` - Agent has taken an action
- `event_update` - New event received
- `notification` - System notifications

## Agent Lifecycle

1. Event received by backend
2. Orchestrator determines which agent to spawn
3. Agent processes event using LLM
4. Agent returns structured JSON response
5. Actions are executed and sent to frontend
6. Audit log is created

## Demo Scripts

### Demo 1 - Phishing Detection
1. Click "Trigger Phishing Event" in simulator
2. Phishing Investigator Agent analyzes the message
3. Agent detects suspicious content and returns severity
4. Actions are executed (notify user, block URLs)
5. Results displayed in dashboard

### Demo 2 - Stress Detection
1. Click "Trigger Stress Event" in simulator
2. Stress/Mood Agent analyzes typing patterns and messages
3. Agent detects stress indicators and returns severity
4. Micro-intervention is suggested to user
5. Results displayed in dashboard

### Demo 3 - Health Anomaly Detection
1. Click "Trigger Health Anomaly" in simulator
2. Health Pattern Agent analyzes sleep and step data
3. Agent detects anomalies and returns risk score
4. Health advice is provided to user
5. Results displayed in dashboard

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   cd server && npm install
   cd ../client && npm install
   ```
3. Set up environment variables (copy .env.example to .env and fill in values)
4. Start services with Docker Compose:
   ```
   docker-compose up
   ```
5. Access the application at http://localhost:3000

## Demo Video

Check out our demo video on YouTube: [AI Guardian Demo](https://youtu.be/OgY9T1N5S_A)