const request = require('supertest');

const app = require('../../app');
const mongodb = require('../../mongodb/mongodb.utils');
const mockEmplyeeRequest = require('../mockdata/employeeReqPayload.json');

const contactsURL = '/api/contacts';

describe('Negative Scenarios - Integration Tests', () => {
  beforeAll(async () => {
    await mongodb.connect();
    await mongodb.dropCollection(`Employee_${process.env.NODE_ENV}`);
  });

  afterAll(async () => {
    await mongodb.disconnect(`Employee_${process.env.NODE_ENV}`);
  });

  test('POST /api/contacts with no password', async () => {
    const response = request(app)
      .post(contactsURL)
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com'
      });
    expect(response.statusCode).toBe(400);
  });

  test.only('POST /api/contacts with no email', async () => {
    const response = request(app)
      .post(contactsURL)
      .send({
        name: 'John Doe',
        password: 'password'
      });
    expect(response.statusCode).toBe(400);
  });
});
