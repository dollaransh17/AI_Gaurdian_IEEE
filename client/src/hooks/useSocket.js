import { useEffect } from 'react';
import io from 'socket.io-client';
import useStore from '../store/useStore';

let socket;

const useSocket = () => {
  const { addAgentAction, addNotification, setConnectionStatus } = useStore();

  useEffect(() => {
    try {
      // Initialize socket connection
      socket = io(process.env.VITE_BACKEND_URL || 'http://localhost:5001');
      
      socket.on('connect', () => {
        console.log('✅ Connected to WebSocket server');
        setConnectionStatus(true);
      });

      socket.on('disconnect', () => {
        console.log('⚠️ Disconnected from WebSocket server');
        setConnectionStatus(false);
      });

      socket.on('connect_error', (error) => {
        console.error('❌ WebSocket connection error:', error);
        setConnectionStatus(false);
      });

      socket.on('error', (error) => {
        console.error('❌ WebSocket error:', error);
      });

      // Listen for agent actions
      socket.on('agent_action', (data) => {
        console.log('🤖 Agent Action:', data);
        addAgentAction({
          ...data,
          timestamp: Date.now()
        });
      });

      // Listen for notifications
      socket.on('notification', (data) => {
        console.log('🔔 Notification:', data);
        addNotification({
          ...data,
          timestamp: Date.now()
        });
      });

      // Listen for event updates
      socket.on('event_update', (data) => {
        console.log('📊 Event Update:', data);
      });

      // Listen for audit logs
      socket.on('audit_log', (data) => {
        console.log('📝 Audit Log:', data);
      });

      // Listen for system status
      socket.on('system_status', (data) => {
        console.log('⚙️ System Status:', data);
      });

      // Cleanup on unmount
      return () => {
        if (socket) {
          socket.disconnect();
        }
      };
    } catch (error) {
      console.error('Socket connection error:', error);
    }
  }, []);

  const emit = (event, data) => {
    if (socket) {
      socket.emit(event, data);
    }
  };

  return { emit };
};

export default useSocket;