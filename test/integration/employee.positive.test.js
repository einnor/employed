const request = require('supertest');

const app = require('../../app');
const mongodb = require('../../mongodb/mongodb.utils');
const mockEmplyeeRequest = require('../mockdata/employeeReqPayload.json');

const contactsURL = '/api/contacts';

describe('Positive Scenarios - Integration Tests', () => {
  beforeAll(async () => {
    await mongodb.connect();
    await mongodb.dropCollection(`Employee_${process.env.NODE_ENV}`);
  });

  afterAll(async () => {});

  test('POST /api/contacts', async () => {
    const response = await request(app)
      .post(contactsURL)
      .send(mockEmplyeeRequest);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('name', mockEmplyeeRequest.name);
    expect(response.body).toHaveProperty('email', mockEmplyeeRequest.email);
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('password');
    expect(response.body).toHaveProperty('createdAt');
  });
});
