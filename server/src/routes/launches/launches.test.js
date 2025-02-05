const request = require('supertest');
const app = require('../../app');

const launchesObjectWithValidDate={
    mission: 'USS Enterprise',
    rocket: 'NCC 1701-D',
    launchDate: 'January 1, 2022',
    destination: 'Kepler-186 f'
}
const launchesObjectWithMissingDate={
    mission: 'USS Enterprise',
    rocket: 'NCC 1701-D',
    destination: 'Kepler-186 f'
}
const launchesObjectWithInvalidDate={
    mission: 'USS Enterprise',
    rocket: 'NCC 1701-D',
    launchDate: 'z',
    destination: 'Kepler-186 f'
}
describe('Test GET/ launches', () => {
    test('It should respond with status 200', async () => {
        const response = await request(app).get('/launches');
        expect(response.statusCode).toBe(200);
    });
    });

describe('Test POST/ launches', () => {
    test('It should respond with status 201', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchesObjectWithValidDate);
        const launchDate = new Date(launchesObjectWithValidDate.launchDate).valueOf();
        const responseLaunchDate = new Date(response.body.launchDate).valueOf();
        expect(responseLaunchDate).toBe(launchDate);
        expect(response.body).toMatchObject(launchesObjectWithMissingDate);
    });
    test('It should respond with status 400', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchesObjectWithMissingDate);
        expect(response.body).toStrictEqual({ error: 'Missing required launch property' });
    });
    test('It should respond with status 400', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchesObjectWithInvalidDate);
        expect(response.body).toStrictEqual({ error: 'Invalid launch date' });
    });
    });