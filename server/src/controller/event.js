const { filterAlarmsWithLocation, getAlarmsWithLocation } = require('../services/event');

const getAllEvents = (req, res, next) => {
    try {
        // eslint-disable-next-line camelcase
        const { date_from, date_to, outcome, page } = req.query;
        const result =
            // eslint-disable-next-line camelcase
            (date_from && date_to) || outcome
                ? filterAlarmsWithLocation(date_from, date_to, outcome, page)
                : getAlarmsWithLocation(page);

        return res.status(200).json({
            data: result,
        });
    } catch (err) {
        return next(err);
    }
};

module.exports = { getAllEvents };
