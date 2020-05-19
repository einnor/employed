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

    req.body = { ...mockEmployee};
  });
});
