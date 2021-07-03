const fs = require('fs');
const path = require('path');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const config = require('../config');
const logger = require('../helpers/logger');
const { validateAuth } = require('../helpers');
const routes = require('./routes');

const accessLogStream = fs.createWriteStream(path.join(__dirname, '../../access.log'), {
    flags: 'a',
});

const apiLoader = (app) => {
    app.enable('trust proxy');
    app.use(cors());
    app.use(express.json());
    app.use(morgan('combined', { stream: accessLogStream }));

    app.use((req, _, next) => {
        const { token } = req.headers;

        if (validateAuth(token)) {
            return next();
        }

        const err = new Error();
        err.message = 'Not authenticated';
        err.status = 401;
        return next(err);
    });

    app.use(config.api.prefix, routes());

    // catch 404 errors
    app.use((_req, _res, next) => {
        const err = new Error();
        err.status = 404;
        err.message = 'Enpoint not found';
        next(err);
    });

    // custom error handler
    // eslint-disable-next-line no-unused-vars
    app.use((err, _req, res, _next) => {
        const status = err.status || 500;
        const message = err.status ? err.message : 'Internal server error';

        logger.error(!err.status ? err.stack : err);

        return res.status(status).json({
            message,
            status,
        });
    });
};

module.exports = apiLoader;
