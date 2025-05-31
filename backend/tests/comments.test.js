const request = require('supertest');
const app = require('../index');

jest.mock('../middleware/authMiddleware', () => ({
  protect: (req, res, next) => {
    req.user = { id: 'mock-user' };
    next();
  }
}));

describe('Comments API', () => {
  it('should allow commenting on an episode', async () => {
    const res = await request(app).post('/api/comments').send({
      episodeId: 'mock-episode-id',
      text: 'Nice episode!'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.comment).toBeDefined();
  });
});
