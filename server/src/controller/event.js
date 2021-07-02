const { getAlarmsWithLocation, filterAlarmsWithLocation } = require('../services/event');

const getAllEvents = (req, res, next) => {
    try {
        const { page } = req.query;
        const result = getAlarmsWithLocation(page);

        return res.status(200).json({
            data: result,
        });
    } catch (err) {
        return next(err);
    }
};

const filterEvents = (req, res, next) => {
    try {
        // eslint-disable-next-line camelcase
        const { date_from, date_to, outcome, page } = req.query;
        const result = filterAlarmsWithLocation(date_from, date_to, outcome, page);

        return res.status(200).json({
            data: result,
        });
    } catch (err) {
        return next(err);
    }
};

module.exports = { getAllEvents, filterEvents };
