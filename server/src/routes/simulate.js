import express from 'express';
import { simulatePhishingEvent, simulateStressEvent, simulateHealthAnomalyEvent } from '../controllers/simulationController.js';

const router = express.Router();

// POST /api/simulate/phishing
router.post('/phishing', simulatePhishingEvent);

// POST /api/simulate/stress
router.post('/stress', simulateStressEvent);

// POST /api/simulate/health-anomaly
router.post('/health-anomaly', simulateHealthAnomalyEvent);

export default router;