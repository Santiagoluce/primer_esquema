const express = require('express');
const { PORT, requireVars } = require('./src/config');
const expressApp = require('./src/express-app');

const StartServer = async () => {
    requireVars('CUSTOMERS_URL', 'PRODUCTS_URL', 'SHOPPING_URL');

    const app = express();
    await expressApp(app);

    app.listen(PORT, () => {
        console.log(`gateway listening to port ${PORT}`);
    }).on('error', (err) => {
        console.log(err);
        process.exit();
    })
}

StartServer().catch((err) => {
    console.error(`Gateway Failed to start server: ${err.message}`);
    process.exit(1);
});

