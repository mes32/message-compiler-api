const testServer = require('supertest');
const app = require('../server');

const Company = require('../classes/Company');
const Guest = require('../classes/Guest');
const Template = require('../classes/Template');

test('Route GET / should return status code 200', () => {
    return testServer(app).get('/').then((response) => {
        expect(response.statusCode).toBe(200);
    });
});

test('Route GET /company should return an array of class Company', () => {
    return testServer(app).get('/company').then((response) => {
        expect(response.statusCode).toBe(200);
        const array = response.body;
        expect(Array.isArray(array)).toBe(true);
        expect(array.length > 0).toBe(true);
        expect(Company.loadJSON(array));
    });
});

test('Route GET /guest should return an array of class Guest', () => {
    return testServer(app).get('/guest').then((response) => {
        expect(response.statusCode).toBe(200);
        const array = response.body;
        expect(Array.isArray(array)).toBe(true);
        expect(array.length > 0).toBe(true);
        expect(Guest.loadJSON(array));
    });
});

test('Route GET /template should return an array of class Template', () => {
    return testServer(app).get('/template').then((response) => {
        expect(response.statusCode).toBe(200);
        const array = response.body;
        expect(Array.isArray(array)).toBe(true);
        expect(array.length > 0).toBe(true);
        expect(Template.loadJSON(array));
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