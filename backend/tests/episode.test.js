const request = require('supertest');
const app = require('../index');

jest.mock('../middleware/authMiddleware', () => ({
  protect: (req, res, next) => {
    req.user = { id: 'mock-user-id' };
    next();
  },
  isAdmin: (req, res, next) => next()
}));

describe('Episode API', () => {
  it('should create an episode', async () => {
    const res = await request(app)
      .post('/api/episodes')
      .send({ title: 'Test Episode', podcastId: 'mock-podcast-id' });

    expect(res.statusCode).toBe(201);
  });
});