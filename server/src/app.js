const app = require('express')();
const apiLoader = require('./loaders/api');
const logger = require('./helpers/logger');
const { port } = require('./config');

const startServer = () => {
    apiLoader(app);
    app.listen(port, () => {
        logger.info(`
        ################################################
        🛡️  Server listening on port: ${port} 🛡️
        ################################################
      `);
    }).on('error', (err) => {
        logger.error(err);
        process.exit(1);
    });
};

startServer();

module.exports = app;
