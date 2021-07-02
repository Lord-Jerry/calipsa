const { Router } = require('express');
const { getAllEvents, filterEvents } = require('../controller/event');
const { validateGetAllRoute, validateFilterRoute } = require('../helpers/validations');

const ApiRoutes = () => {
    const route = Router();

    route.get('/health-check', (_req, res) =>
        res.status(200).json({
            message: 'hello fucking world',
        }),
    );

    route.get('/alarm/get-all', validateGetAllRoute, getAllEvents);
    route.get('/alarm/filter', validateFilterRoute, filterEvents);

    return route;
};

module.exports = ApiRoutes;
