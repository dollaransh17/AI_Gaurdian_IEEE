import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectToRedis, initializeSocket } from './socket.js';
import connectDB from './utils/db.js';

// Create Express app
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to database
connectDB();

// Routes
import eventRoutes from './routes/events.js';
import simulateRoutes from './routes/simulate.js';
import logsRoutes from './routes/logs.js';

app.use('/api/events', eventRoutes);
app.use('/api/simulate', simulateRoutes);
app.use('/api/logs', logsRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'AI Guardian Backend is running' });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`AI Guardian Backend listening on port ${PORT}`);
});

// Initialize Socket.IO after server starts
initializeSocket(server);

// Export server for socket.io
export default server;