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
  });

  afterEach(() => {
    model.create.mockClear();
    model.findOne.mockClear();
    bcrypt.compare.mockClear();
    jwt.sign.mockClear();

    req.body = { ...mockEmployee };
  });

  test('loginEmployee function is defined', () => {
    expect(typeof loginEmployee).toBe('function');
  });

  test('login an new employee', async () => {
    model.findOne.mockReturnValue(mockEmployee);
    bcrypt.compare.mockReturnValue(true);
    jwt.sign.mockReturnValue('fakejwttoken');
    await loginEmployee(req, res, next);
    // expect(model.findOne).toHaveBeenCalledWith(req.body);
    // expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toStrictEqual(mockEmployee);
  });
});
