import { getIO } from '../socket.js';

// Execute actions returned by agents
export const executeActions = async (actions, event) => {
  try {
    console.log('Executing actions:', actions);
    
    // Get Socket.IO instance
    const io = getIO();
    
    // Execute each action
    for (const action of actions) {
      switch (action.action) {
        case 'notify_user':
          // Send notification to frontend via WebSocket
          if (io) {
            io.emit('notification', {
              type: 'alert',
              message: action.text,
              eventId: event.id
            });
          }
          console.log('Notified user:', action.text);
          break;
          
        case 'block_url':
          // In a real implementation, this would integrate with a firewall or proxy
          console.log('Blocked URL:', action.target);
          break;
          
        case 'draft_reply':
          // In a real implementation, this would create a draft response
          console.log('Drafted reply:', action.text);
          break;
          
        case 'micro_intervention':
          // Send micro-intervention to frontend
          if (io) {
            io.emit('notification', {
              type: 'intervention',
              message: action.text,
              eventId: event.id
            });
          }
          console.log('Provided micro-intervention:', action.text);
          break;
          
        case 'advice':
          // Send health advice to frontend
          if (io) {
            io.emit('notification', {
              type: 'advice',
              message: action.text,
              eventId: event.id
            });
          }
          console.log('Provided advice:', action.text);
          break;
          
        case 'schedule_reminder':
          // In a real implementation, this would schedule a reminder
          console.log('Scheduled reminder:', action.text);
          break;
          
        default:
          console.warn('Unknown action type:', action.action);
      }
    }
  } catch (error) {
    console.error('Error executing actions:', error);
    throw error;
  }
};