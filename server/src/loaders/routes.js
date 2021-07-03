const { Router } = require('express');
const { getAllEvents } = require('../controller/event');
const { validateGetAllRoute } = require('../helpers/validations');

const ApiRoutes = () => {
    const route = Router();

    route.get('/health-check', (_req, res) =>
        res.status(200).json({
            message: 'hello fucking world',
        }),
    );

    route.get('/alarm/get-all', validateGetAllRoute, getAllEvents);

    return route;
};

module.exports = ApiRoutes;
