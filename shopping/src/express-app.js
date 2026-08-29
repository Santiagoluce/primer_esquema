const express = require('express');
const cors = require('cors');
const shoppingRoutes = require('./api/shopping');
const HandleErrors = require('./utils/error-handler');

module.exports = async (app) => {
    app.use(express.json({ limit: '1mb' }));
    app.use(express.urlencoded({ extended: true, limit: '1mb' }));
    app.use(cors());

    app.use(shoppingRoutes);
    app.use('/shopping', shoppingRoutes);

    app.use(HandleErrors);
};
