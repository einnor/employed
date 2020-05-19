const httpMock = require('node-mocks-http');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { loginEmployee } = require('../../controllers/employee.controller');
const model = require('../../models/employee.model');
const mockEmployee = require('../mockdata/employeeReqPayload.json');

model.create = jest.fn();
model.findOne = jest.fn();
bcrypt.compare = jest.fn();
jwt.sign = jest.fn();

let req, res, next;

describe('Login Employee - Controller', () => {
  beforeEach(() => {
    req = httpMock.createRequest();
    res = httpMock.createResponse();
    next = null;

    req.body = { ...mockEmployee };
  });

  afterEach(() => {
    model.create.mockClear();
    model.findOne.mockClear();
    bcrypt.compare.mockClear();
    jwt.sign.mockClear();
  });

  test('loginEmployee function is defined', () => {
    expect(typeof loginEmployee).toBe('function');
  });

  test('login an new employee', async () => {
    model.findOne.mockReturnValue(mockEmployee);
    bcrypt.compare.mockReturnValue(true);
    jwt.sign.mockReturnValue('fakejwttoken');
    await loginEmployee(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toStrictEqual(mockEmployee);
    expect(res._getHeaders()['auth-token']).toBe('fakejwttoken');
  });

  test('throw 500 if jwt.sign fails', async () => {
    model.findOne.mockReturnValue(mockEmployee);
    bcrypt.compare.mockReturnValue(true);
    jwt.sign.mockRejectedValue('Error');
    await loginEmployee(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual('Error');
    expect(res._getHeaders()['auth-token']).toBeUndefined();
  });

  test('throw 500 if bcrypt.compare fails', async () => {
    model.findOne.mockReturnValue(mockEmployee);
    bcrypt.compare.mockRejectedValue('Error');
    await loginEmployee(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual('Error');
    expect(res._getHeaders()['auth-token']).toBeUndefined();
  });

  test('throw 400 if employee does with provided email does not exist', async () => {
    model.findOne.mockReturnValue(null);
    bcrypt.compare.mockReturnValue(true);
    jwt.sign.mockReturnValue('fakejwttoken');
    await loginEmployee(req, res, next);
    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toStrictEqual('The email you provided does not exist in our database.');
    expect(res._getHeaders()['auth-token']).toBeUndefined();
  });
});
