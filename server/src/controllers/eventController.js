import { publishEvent } from '../socket.js';
import { processEvent } from '../orchestrator/AgentOrchestrator.js';

// Handle typing event
export const submitTypingEvent = async (req, res) => {
  try {
    const eventData = {
      type: 'typing',
      timestamp: new Date(),
      payload: req.body
    };

    // Publish event via Socket.IO
    await publishEvent('event_stream', eventData);

    // Process event with orchestrator
    await processEvent(eventData);

    res.status(200).json({ 
      success: true, 
      message: 'Typing event submitted successfully' 
    });
  } catch (error) {
    console.error('Error submitting typing event:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to submit typing event' 
    });
  }
};

// Handle message event
export const submitMessageEvent = async (req, res) => {
  try {
    const eventData = {
      type: 'message',
      timestamp: new Date(),
      payload: req.body
    };

    // Publish event via Socket.IO
    await publishEvent('event_stream', eventData);

    // Process event with orchestrator
    await processEvent(eventData);

    res.status(200).json({ 
      success: true, 
      message: 'Message event submitted successfully' 
    });
  } catch (error) {
    console.error('Error submitting message event:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to submit message event' 
    });
  }
};

// Handle health event
export const submitHealthEvent = async (req, res) => {
  try {
    const eventData = {
      type: 'health',
      timestamp: new Date(),
      payload: req.body
    };

    // Publish event via Socket.IO
    await publishEvent('event_stream', eventData);

    // Process event with orchestrator
    await processEvent(eventData);

    res.status(200).json({ 
      success: true, 
      message: 'Health event submitted successfully' 
    });
  } catch (error) {
    console.error('Error submitting health event:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to submit health event' 
    });
  }
};