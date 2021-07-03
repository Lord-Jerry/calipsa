const fs = require('fs');
const path = require('path');
const { checkAlarmDateInRange, isBoolean } = require('../helpers');

const storage = (() => {
    try {
        return JSON.parse(
            fs.readFileSync(path.join(__dirname, '../data/data.1625221755.json'), 'utf8'),
        );
    } catch {
        throw new Error('could not get data');
    }
})();

const getAlarmsWithLocation = (page = 1, interval = 100) => {
    const offset = page * interval - interval;
    const limit = offset + interval;

    const alarms = storage.alarms.slice(offset, limit);
    return alarms.map((alarm) => {
        const { location } = alarm;
        const locationValue = storage.locations.find(({ id }) => id === location) || {};
        return { ...alarm, locationName: locationValue.name };
    });
};

const filterAlarmsWithLocation = (from, to, outcome, page = 1) => {
    let filteredAlarms = [];
    let paginate = Number(page);

    while (filteredAlarms.length <= 100 && paginate * 100 <= storage.alarms.length) {
        const alarms = getAlarmsWithLocation(paginate);
        if (alarms.length === 0) break;
        const filteredResult = alarms.filter((alarm) => {
            // filter by outcome alone
            if (isBoolean(outcome) && !from && !to) return alarm.outcome === outcome;
            // filter by date range alone
            if (!isBoolean(outcome) && from && to)
                return checkAlarmDateInRange(from, to, alarm.timestamp);

            // filter with bothe outcome and date range
            return checkAlarmDateInRange(from, to, alarm.timestamp) && alarm.outcome === outcome;
        });

        filteredAlarms = filteredAlarms.concat(filteredResult);

        paginate += 1;
    }

    return filteredAlarms;
};

module.exports = { filterAlarmsWithLocation, getAlarmsWithLocation };
