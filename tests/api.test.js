const request = require('supertest');
const app = require('../src/server');

describe('API Tests', () => {
    describe('GET /', () => {
        it('should return a 200 OK response', async () => {
            const response = await request(app).get('/');
            expect(response.status).toBe(200);
        });
    });

    describe('POST /transaction/init', () => {
        it('should return a 401 Unauthorized response without authentication', async () => {
            const response = await request(app).post('/transaction/init');
            expect(response.status).toBe(401);
        });

        it('should return a 200 OK response with valid authentication', async () => {
            const token = 'your_valid_token_here';
            const response = await request(app)
                .post('/transaction/init')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        });
    });

    describe('POST /merchant/token/create', () => {
        it('should return a 401 Unauthorized response without authentication', async () => {
            const response = await request(app).post('/merchant/token/create');
            expect(response.status).toBe(401);
        });

        it('should return a 200 OK response with valid authentication', async () => {
            const token = 'your_valid_token_here';
            const response = await request(app)
                .post('/merchant/token/create')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        });
    });
});