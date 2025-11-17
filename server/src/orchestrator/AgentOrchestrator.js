import { spawnAgent } from './AgentFactory.js';
import { executeActions } from './ActionExecutor.js';
import { logAuditEvent } from '../models/AuditLog.js';
import { getIO } from '../socket.js';

// Process incoming events and delegate to appropriate agents
export const processEvent = async (event) => {
  try {
    console.log('Processing event:', event.type);
    
    // Determine which agent to spawn based on event type
    let agentType;
    switch (event.type) {
      case 'message':
        agentType = 'phishing';
        break;
      case 'typing':
        agentType = 'stress';
        break;
      case 'health':
        agentType = 'health';
        break;
      default:
        console.warn('Unknown event type:', event.type);
        return;
    }

    // Spawn the appropriate agent
    const agentResponse = await spawnAgent(agentType, event.payload);
    
    // Log the audit event
    await logAuditEvent({
      timestamp: new Date(),
      agentType,
      severity: agentResponse.severity || agentResponse.risk_score,
      user: event.payload.user_profile?.name || 'Anonymous',
      eventType: event.type,
      explanation: agentResponse.explanation,
      actionsTaken: agentResponse.steps
    });

    // Execute actions returned by the agent
    await executeActions(agentResponse.steps, event);

    // Send agent response to frontend via WebSocket
    const io = getIO();
    if (io) {
      io.emit('agent_action', {
        agentType,
        response: agentResponse,
        eventId: event.id
      });
    }

    return agentResponse;
  } catch (error) {
    console.error('Error processing event:', error);
    throw error;
  }
};