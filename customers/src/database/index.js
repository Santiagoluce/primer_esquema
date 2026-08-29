const mongoose = require('mongoose');
const { DB_URL } = require('../config');

module.exports = {
  databaseConnection: async () => {
    try {
      await mongoose.connect(DB_URL);
      console.log('✅ Database connected');
    } catch (err) {
      console.error('❌ Database connection error:', err.message);
      throw err;
    }
  },
  CustomerRepository: require('./repository/customer-repository')
};
