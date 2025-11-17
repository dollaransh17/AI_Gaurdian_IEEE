const express = require('express');
const request = require('supertest');
const server = require('../server.js');

// Close the server after tests
afterAll(() => {
  server.close();
});

describe('Health Check', () => {
  it('should return OK status', async () => {
    const res = await request(server).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('OK');
  });
});