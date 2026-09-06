const request = require('supertest');
const express = require('express');
const expressApp = require('../src/express-app');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let app, mongoServer, user;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  app = express();
  await expressApp(app);

  await request(app)
    .post('/customer/signup')
    .send({ email: 'addr@test.com', password: '123456', phone: '3000000000' });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('POST /customer/address', () => {
  it('debería agregar una dirección válida', async () => {
    const login = await request(app)
      .post('/customer/login')
      .send({ email: 'addr@test.com', password: '123456' });

    const res = await request(app)
      .post('/customer/address')
      .set('Authorization', `Bearer ${login.body.token}`)
      .send({ street: 'Calle 123', city: 'Manizales', country: 'Colombia', postalCode: '170001' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject({
      street: 'Calle 123',
      city: 'Manizales',
      country: 'Colombia',
      postalCode: '170001',
    });
  });
});
