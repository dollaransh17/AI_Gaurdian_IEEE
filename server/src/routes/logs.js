import express from 'express';
import { getAuditLogs } from '../models/AuditLog.js';

const router = express.Router();

// GET /api/logs
router.get('/', async (req, res) => {
  try {
    const logs = await getAuditLogs();
    res.status(200).json(logs);
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch audit logs' 
    });
  }
});

export default router;