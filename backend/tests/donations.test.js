const request = require('supertest');
const app = require('../index');

jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => ({
    paymentIntents: {
      create: jest.fn().mockResolvedValue({ client_secret: 'test_secret' })
    }
  }));
});

describe('Donation API', () => {
  it('should create a payment intent', async () => {
    const res = await request(app).post('/api/donations').send({
      amount: 500,
      podcastId: 'mock-podcast-id'
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.clientSecret).toBeDefined();
  });
});