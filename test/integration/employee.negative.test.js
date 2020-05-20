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
    const response = await request(app)
      .post(contactsURL)
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com'
      });
    expect(response.statusCode).toBe(400);
  });

  test('POST /api/contacts with no email', async () => {
    const response = await request(app)
      .post(contactsURL)
      .send({
        name: 'John Doe',
        password: 'password'
      });
    expect(response.statusCode).toBe(400);
  });

  test('POST /api/contacts with no name', async () => {
    const response = await request(app)
      .post(contactsURL)
      .send({
        email: 'john.doe@example.com',
        password: 'password',
      });
    expect(response.statusCode).toBe(400);
  });

  test('GET /api/contacts when collection is empty', async () => {
    const response = await request(app)
      .get(contactsURL);
    expect(response.statusCode).toBe(404);
  });

  test('POST /api/contacts with existing email', async () => {
    let response = await request(app)
      .post(contactsURL)
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password',
      });
    expect(response.statusCode).toBe(201);

    response = await request(app)
      .post(contactsURL)
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password',
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe('The email you provided already exists in our database.');
  });

  test('GET /api/contacts/:id with wrong employee ID', async () => {
    const response = await request(app)
      .get(`${contactsURL}/5ec4f73bef3442e0b62f5410`);
    expect(response.statusCode).toBe(404);
  });

  test('GET /api/contacts/:id with invalid employee ID', async () => {
    const response = await request(app)
      .get(`${contactsURL}/invalid_employee_id`);
    expect(response.statusCode).toBe(500);
  });

  test.skip('PUT /api/contacts/:id with wrong employee ID', async () => {
    const response = await request(app)
      .put(`${contactsURL}/5ec4f73bef3442e0b62f5410`)
      .send({
        gender: 'female',
      });
    expect(response.statusCode).toBe(400);
  });

  test.skip('PUT /api/contacts/:id with invalid employee ID', async () => {
    const response = await request(app)
      .put(`${contactsURL}/invalid_employee_id`)
      .send({
        gender: 'female',
      });
    expect(response.statusCode).toBe(500);
  });

  test.only('DELETE /api/contacts/:id with invalid employee ID', async () => {
    const response = await request(app)
      .delete(`${contactsURL}/invalid_employee_id`);
    expect(response.statusCode).toBe(500);
  });
});
