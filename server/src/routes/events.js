import express from 'express';
import { submitTypingEvent, submitMessageEvent, submitHealthEvent } from '../controllers/eventController.js';

const router = express.Router();

// POST /api/events/typing
router.post('/typing', submitTypingEvent);

// POST /api/events/message
router.post('/message', submitMessageEvent);

// POST /api/events/health
router.post('/health', submitHealthEvent);

export default router;