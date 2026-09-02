const request = require('supertest');
const app = require('./app');

describe('Ubuntu CI/CD App Tests', () => {
  test('GET / should return app info with Ubuntu platform', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('CI/CD Optimization Demo - Ubuntu Only');
    expect(response.body.platform).toBe('Ubuntu');
    expect(response.body.features).toContain('caching');
  });

  test('GET /health should return Ubuntu health status', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('healthy');
    expect(response.body.platform).toBe('ubuntu');
    expect(response.body.uptime).toBeGreaterThanOrEqual(0);
  });

  test('GET /api/data should return processed data with Ubuntu info', async () => {
    const response = await request(app).get('/api/data');
    expect(response.status).toBe(200);
    expect(response.body.sum).toBe(499500);
    expect(response.body.average).toBe(500);
    expect(response.body.platform).toBe('ubuntu');
  });
});