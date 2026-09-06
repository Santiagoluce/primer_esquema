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
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('POST /customer/signup', () => {
  it('debería registrar un cliente', async () => {
    const res = await request(app)
      .post('/customer/signup')
      .send({ email: 'test@example.com', password: '123456', phone: '3000000000' });

    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe('test@example.com');
  });
});
