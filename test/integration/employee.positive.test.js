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

  test('GET /api/contacts/:id', async () => {
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

  test('DELETE /api/contacts/:id', async () => {
    const responseOfCreate = await request(app)
      .post(contactsURL)
      .send({
        name: 'Judy Doe',
        email: 'judy.doe@example.com',
        password: 'password',
      });
    expect(responseOfCreate.statusCode).toBe(201);

    const responseOfDelete = await request(app)
      .delete(`${contactsURL}/${responseOfCreate.body._id}`);
    expect(responseOfDelete.statusCode).toBe(200);
    
    const responseOfGetById = await request(app)
      .get(`${contactsURL}/${responseOfCreate.body._id}`);
    expect(responseOfGetById.statusCode).toBe(404);

    const responseOfAnotherDelete = await request(app)
      .delete(`${contactsURL}/${responseOfCreate.body._id}`);
    expect(responseOfAnotherDelete.statusCode).toBe(404);
  });

  test('POST /api/contacts/login', async () => {
    const responseOfCreate = await request(app)
      .post(contactsURL)
      .send({
        name: 'Ronnie Doe',
        email: 'ronnie.doe@example.com',
        password: 'password',
      });
    expect(responseOfCreate.statusCode).toBe(201);

    const responseOfLogin = await request(app)
      .post(`${contactsURL}/login`)
      .send({
        name: 'Ronnie Doe',
        email: 'ronnie.doe@example.com',
        password: 'password',
      });
    expect(responseOfLogin.statusCode).toBe(201);
    expect(responseOfLogin.header['auth-token']).toBeTruthy();
  });

  test.only('PUT /api/contacts/:id', async () => {
    const responseOfCreate = await request(app)
      .post(contactsURL)
      .send({
        name: 'Peggy Doe',
        email: 'peggy.doe@example.com',
        password: 'password',
        gender: 'male',
      });
    expect(responseOfCreate.statusCode).toBe(201);
    expect(responseOfCreate.body).toHaveProperty('gender', 'male');

    const responseOfLogin = await request(app)
      .post(`${contactsURL}/login`)
      .send({
        name: 'Peggy Doe',
        email: 'peggy.doe@example.com',
        password: 'password',
      });
    expect(responseOfLogin.statusCode).toBe(201);
    expect(responseOfLogin.header['auth-token']).toBeTruthy();

    const responseOfUpdate = await request(app)
      .put(`${contactsURL}/${responseOfCreate.body._id}`)
      .send({
        gender: 'female',
      })
      .set({
        'auth-token': responseOfLogin.header['auth-token'],
      });
    expect(responseOfUpdate.statusCode).toBe(201);
    
    const responseOfGetById = await request(app)
      .get(`${contactsURL}/${responseOfCreate.body._id}`);
    expect(responseOfGetById.statusCode).toBe(200);
    expect(responseOfGetById.body).toHaveProperty('gender', 'female');
  });
});
