/* eslint-disable no-undef */
const { validateAuth, checkAlarmDateInRange, isBoolean } = require('../../helpers');

// validateAuthcheck
test('`validateAuthcheck` should return `true` if the correct secret is used', () => {
    const token = Buffer.from('hey').toString('base64');
    expect(validateAuth(token)).toBeTruthy();
});
test('`validateAuthcheck` should return `false` if the correct secret is used', () => {
    const token = Buffer.from('wrong secret key').toString('base64');
    expect(validateAuth(token)).toBeFalsy();
});

// isBoolean
test('`isBoolean` should return `true` if value is a boolean value', () => {
    expect(isBoolean(true)).toBeTruthy();
    expect(isBoolean(false)).toBeTruthy();
});
test('`isBoolean` should return `false` if value is not a boolean value', () => {
    expect(isBoolean(undefined)).toBeFalsy();
    expect(isBoolean(null)).toBeFalsy();
    expect(isBoolean('hello')).toBeFalsy();
    expect(isBoolean(12345)).toBeFalsy();
});

// checkAlarmDateInRange
test('`checkAlarmDateInRange` should return `true` date is in range', () => {
    const startDate = '2021-01-02T00:47:52.991Z';
    const endDate = '2021-01-02T00:57:52.991Z';
    const alarmDate = '2021-01-02T00:50:52.991Z';
    expect(checkAlarmDateInRange(startDate, endDate, alarmDate)).toBeTruthy();
});

test('`checkAlarmDateInRange` should return `false` date is out of range', () => {
    const startDate = '2021-01-02T00:47:52.991Z';
    const endDate = '2021-01-02T00:57:52.991Z';
    const alarmDate = '2021-10-02T00:50:52.991Z';
    expect(checkAlarmDateInRange(startDate, endDate, alarmDate)).toBeFalsy();
});
