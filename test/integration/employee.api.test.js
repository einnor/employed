const request = require('supertest');

const app = require('../../app');
const mongodb = require('../../mongodb/mongodb.utils');

const endpointURL = '/api';

describe('', () => {
  test('Get /', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual('Up and running!');
  });

  test('Get /api', async () => {
    const response = await request(app).get(endpointURL);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(
      {
        status: 'Api is working',
        message: 'Welcome to the employee api router',
      }
    );
  });
});
