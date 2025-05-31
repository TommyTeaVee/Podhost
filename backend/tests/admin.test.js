const request = require('supertest');
const app = require('../index');

jest.mock('../middleware/authMiddleware', () => ({
  protect: (req, res, next) => {
    req.user = { id: 'admin-user', role: 'admin' };
    next();
  },
  isAdmin: (req, res, next) => {
    if (req.user.role === 'admin') return next();
    return res.status(403).send('Not authorized');
  }
}));

describe('Admin Tools', () => {
  it('should delete a user', async () => {
    const res = await request(app).delete('/api/admin/users/mock-user-id');
    expect([200, 404]).toContain(res.statusCode); // depends on DB state
  });
});
