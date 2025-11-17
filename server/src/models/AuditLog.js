import mongoose from 'mongoose';

// Define the audit log schema
const auditLogSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    required: true,
    default: Date.now
  },
  agentType: {
    type: String,
    required: true,
    enum: ['phishing', 'stress', 'health']
  },
  severity: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  user: {
    type: String,
    required: true
  },
  eventType: {
    type: String,
    required: true
  },
  explanation: {
    type: String,
    required: true
  },
  actionsTaken: [{
    action: {
      type: String,
      required: true
    },
    target: {
      type: String
    },
    text: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
});

// Create the model
const AuditLog = mongoose.model('AuditLog', auditLogSchema);

// Log an audit event
export const logAuditEvent = async (auditData) => {
  try {
    const auditLog = new AuditLog(auditData);
    await auditLog.save();
    console.log('Audit event logged:', auditData.agentType);
    return auditLog;
  } catch (error) {
    console.error('Error logging audit event:', error);
    throw error;
  }
};

// Get audit logs
export const getAuditLogs = async (limit = 50) => {
  try {
    const logs = await AuditLog.find()
      .sort({ timestamp: -1 })
      .limit(limit);
    return logs;
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    throw error;
  }
};

export default AuditLog;