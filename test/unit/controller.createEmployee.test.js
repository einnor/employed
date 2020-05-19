const httpMock = require('node-mocks-http');
const bcrypt = require('bcrypt');

const { createEmployee } = require('../../controllers/employee.controller');
const model = require('../../models/employee.model');
const mockEmployees = require('../mockdata/employees.json');
const reqPayload = require('../mockdata/employeeReqPayload.json');

model.create = jest.fn();
model.findOne = jest.fn();
bcrypt.hash = jest.fn();
bcrypt.genSalt = jest.fn();

let req, res, next;

describe('Create Employee - Controller', () => {
  beforeEach(() => {
    req = httpMock.createRequest();
    res = httpMock.createResponse();
    next = null;
  });

  afterEach(() => {
    model.create.mockClear();
    model.findOne.mockClear();
    bcrypt.hash.mockClear();
    bcrypt.genSalt.mockClear();
  });

  test('createEmployee function is defined', () => {
    expect(typeof createEmployee).toBe('function');
  });
});
