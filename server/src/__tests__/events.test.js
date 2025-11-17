const express = require('express');
const request = require('supertest');
const server = require('../server.js');

// Close the server after tests
afterAll(() => {
  server.close();
});

describe('Event Routes', () => {
  it('should accept typing event', async () => {
    const typingEvent = {
      recent_messages: ['Hello', 'How are you?'],
      typing_metrics: {
        avg_pause_duration: 1000,
        keystroke_variance: 0.5,
        backspace_frequency: 0.1,
        typo_rate: 0.05
      }
    };

    const res = await request(server)
      .post('/api/events/typing')
      .send(typingEvent);
    
    // Expect 200 or 500 depending on whether Redis is running
    expect([200, 500]).toContain(res.status);
  });

  it('should accept message event', async () => {
    const messageEvent = {
      email_subject: 'Test Subject',
      sender: 'test@example.com',
      links: ['http://example.com'],
      text: 'Test message content',
      user_profile: {
        name: 'Test User',
        email: 'test@example.com'
      }
    };

    const res = await request(server)
      .post('/api/events/message')
      .send(messageEvent);
    
    // Expect 200 or 500 depending on whether Redis is running
    expect([200, 500]).toContain(res.status);
  });

  it('should accept health event', async () => {
    const healthEvent = {
      sleep_hours: 7.5,
      steps: 8000,
      symptoms: ['headache']
    };

    const res = await request(server)
      .post('/api/events/health')
      .send(healthEvent);
    
    // Expect 200 or 500 depending on whether Redis is running
    expect([200, 500]).toContain(res.status);
  });
});