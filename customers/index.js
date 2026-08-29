const express = require('express');
const { PORT, requireVars } = require('./src/config');
const { databaseConnection } = require('./src/database');
const expressApp = require('./src/express-app');

const StartServer = async () => {
  try {
    requireVars('DB_URL');
    await databaseConnection();

    const app = express();
    await expressApp(app);

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Customers service running on port ${PORT}`);
    }).on('error', (err) => {
      console.error('❌ Error starting server:', err);
      process.exit(1);
    });
  } catch (err) {
    console.error('❌ Error starting server:', err);
    process.exit(1);
  }
};

StartServer();
