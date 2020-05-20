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

  test('GET /api/contacts', async () => {
    const response = await request(app)
      .get(contactsURL);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test.only('GET /api/contacts/:id', async () => {
    const responseOfCreate = await request(app)
      .post(contactsURL)
      .send({
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        password: 'password',
      });
    expect(responseOfCreate.statusCode).toBe(201);

    const response = await request(app)
      .get(`${contactsURL}/${responseOfCreate.body._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('name', responseOfCreate.body.name);
    expect(response.body).toHaveProperty('email', responseOfCreate.body.email);
    expect(response.body).toHaveProperty('_id', responseOfCreate.body._id);
    expect(response.body).toHaveProperty('password', responseOfCreate.body.password);
    expect(response.body).toHaveProperty('createdAt', responseOfCreate.body.createdAt);
  });
});
