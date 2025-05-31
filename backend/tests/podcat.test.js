jest.mock('../middleware/authMiddleware', () => ({
  protect: (req, res, next) => {
    req.user = { id: 'test-user-id' };
    next();
  }
}));

const request = require('supertest');
const app = require('../index');

describe('Podcast Routes', () => {
  it('should create a podcast', async () => {
    const res = await request(app).post('/api/podcasts').send({
      title: 'Test Podcast',
      description: 'A Jest-tested podcast.'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Podcast');
  });

  it('should get all podcasts', async () => {
    const res = await request(app).get('/api/podcasts');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
