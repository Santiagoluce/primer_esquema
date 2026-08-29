const express = require('express');
const customer = require('./api/customer');

module.exports = async (app) => {
  app.use(express.json());
  app.use('/customer', customer);
};
