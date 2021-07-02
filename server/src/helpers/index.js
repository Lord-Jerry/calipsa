/**
 * decode token and ensure that the secret is correct
 * @param{ string } token
 * @return{boolean}
 */
const validateAuth = (token) => {
    const secret = Buffer.from(token || '', 'base64').toString();

    if (secret === 'hey') {
        return true;
    }

    return false;
};

/**
 * check that alarm range is within specified range
 * @param{ string } from - timestamp of the date range we are starting from
 * @param{ string } to - timestamp of the date range we are checking up to.
 * @param{ string } date - timestamp of date we are checking
 * @return{boolean}
 */
const checkAlarmDateInRange = (from, to, date) => {
    const dateFrom = new Date(from);
    const dateTo = new Date(to);
    const alarmDate = new Date(date);

    return alarmDate >= dateFrom && alarmDate <= dateTo;
};

const isBoolean = (val) => typeof val === 'boolean';

module.exports = { validateAuth, checkAlarmDateInRange, isBoolean };
