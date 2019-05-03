const testServer = require('supertest');
const app = require('../server');

test('Route GET / should return status code 200', () => {
    return testServer(app).get('/').then((response) => {
        expect(response.statusCode).toBe(200);
    });
});

test('Route GET /company should return an array', () => {
    return testServer(app).get('/company').then((response) => {
        expect(response.statusCode).toBe(200);
        const array = response.body;
        expect(Array.isArray(array)).toBe(true);
        expect(array.length > 0).toBe(true);
        // TODO: Could additionally verify that the objects inside this array 
        // actually conform to valid instances of some Company class.
    });
});

test('Route GET /guest should return an array', () => {
    return testServer(app).get('/guest').then((response) => {
        expect(response.statusCode).toBe(200);
        const array = response.body;
        expect(Array.isArray(array)).toBe(true);
        expect(array.length > 0).toBe(true);
    });
});

test('Route GET /template should return an array', () => {
    return testServer(app).get('/template').then((response) => {
        expect(response.statusCode).toBe(200);
        const array = response.body;
        expect(Array.isArray(array)).toBe(true);
        expect(array.length > 0).toBe(true);
    });
});

test('Route GET /message?template=1&company=1&guest=1 should return a message object', () => {
    return testServer(app).get('/message?template=1&company=1&guest=1').then((response) => {
        expect(response.statusCode).toBe(200);
        const obj = response.body;
        expect(typeof obj.timestamp).toBe('string');
        expect(typeof obj.message).toBe('string');
    });
});

test('Route POST /message should return a message object', () => {
    const request = {
        template: '${Time.greeting} ${firstName}',
        companyID: 1,
        guestID: 1
    };
    return testServer(app).post('/message').send(request).then((response) => {
        expect(response.statusCode).toBe(200);
        const obj = response.body;
        expect(typeof obj.timestamp).toBe('string');
        expect(typeof obj.message).toBe('string');
    });
});