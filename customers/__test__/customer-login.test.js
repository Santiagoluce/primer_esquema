const request = require('supertest');
const express = require('express');
const expressApp = require('../src/express-app');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let app, mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  app = express();
  await expressApp(app);

  await request(app)
    .post('/customer/signup')
    .send({ email: 'login@test.com', password: '123456', phone: '3000000000' });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('POST /customer/login', () => {
  it('debería permitir login con credenciales válidas', async () => {
    const res = await request(app)
      .post('/customer/login')
      .send({ email: 'login@test.com', password: '123456' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('email', 'login@test.com');
  });
});
