import { Server } from 'socket.io';

// Socket.io server
let io;

// Initialize Socket.IO
export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected to WebSocket');
    
    socket.on('disconnect', () => {
      console.log('User disconnected from WebSocket');
    });
  });

  console.log('Socket.IO initialized');
};

// Get Socket.IO instance
export const getIO = () => {
  return io;
};

// Publish event via Socket.IO (no Redis needed)
export const publishEvent = async (channel, message) => {
  if (io) {
    io.emit(channel, message);
  }
};

// Placeholder for compatibility
export const subscribeToChannel = async (channel, callback) => {
  // Not needed - using Socket.IO direct emit
};

// Placeholder for compatibility
export const connectToRedis = async () => {
  console.log('Skipping Redis - using Socket.IO only');
};

// Placeholder for compatibility
export const getRedisClient = () => {
  return null;
};