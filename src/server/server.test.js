const request = require('supertest');
const app = require('./app');

describe('Testing the NodeJS express server', () => {
    test('Server should be healthy', done => {
        request(app)
            .get('/health')
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(JSON.parse(response.text).message).toBe("I'm healthy. How about you?");
                done();
            });
    });
});