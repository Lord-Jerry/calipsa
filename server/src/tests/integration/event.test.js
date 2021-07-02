/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-undef */
const request = require('supertest');
const server = require('../../app');
const { checkAlarmDateInRange } = require('../../helpers/index');

console.log = jest.fn();
console.error = jest.fn();
console.warn = jest.fn();
console.info = jest.fn();

test('should return a 401 error status if a token is not sent', async () => {
    await request(server).get('/api/v1/health-check').expect(401);
});

test('should return a 401 error status if token secret is incorrect', async () => {
    await request(server)
        .get('/api/v1/health-check')
        .set('token', Buffer.from('wrong secret').toString('base64'))
        .expect(401);
});

test('should be sucessful if token secret is correct', async () => {
    await request(server)
        .get('/api/v1/health-check')
        .set('token', Buffer.from('hey').toString('base64'))
        .expect(200);
});

test('should fetch 100 alarm events with their location name', async () => {
    await request(server)
        .get('/api/v1/alarm/get-all')
        .set('token', Buffer.from('hey').toString('base64'))
        .expect(200)
        .expect((res) => {
            expect(res.body.data.length).toEqual(100);
            expect(res.body.data[0].locationName).toMatch(/location/);
        });
});

test('should fetch 100 filtered alarm events that match filter', async () => {
    const date_from = '2021-01-01T23:59:56.339Z';
    const date_to = '2021-04-02T23:59:56.339Z';
    const outcome = false;
    await request(server)
        .get('/api/v1/alarm/filter')
        .set('token', Buffer.from('hey').toString('base64'))
        .query({
            date_from,
            date_to,
            outcome,
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.data[0].locationName).toMatch(/location/);
            res.body.data.forEach((value) => {
                const alarmInRange = checkAlarmDateInRange(date_from, date_to, value.timestamp);
                expect(value.outcome).toEqual(outcome);
                expect(alarmInRange).toBeTruthy();
            });
        });
});
