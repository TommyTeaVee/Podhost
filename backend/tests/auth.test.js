const request= require('supertest');
const app = require('../index');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

describe('Auth Flow', () => {
  const testUser = { email: 'test@example.com', password: 'Password123' };

  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send(testUser);
    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
  });

  it('should login an existing user', async () => {
    const res = await request(app).post('/api/auth/login').send(testUser);
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: testUser.email } });
  });
});
