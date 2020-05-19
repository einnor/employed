const httpMock = require('node-mocks-http');
const bcrypt = require('bcrypt');

const { createEmployee } = require('../../controllers/employee.controller');
const model = require('../../models/employee.model');
const mockEmployees = require('../mockdata/employees.json');
const mockEmployee = require('../mockdata/employeeReqPayload.json');

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

    req.body = { ...mockEmployee };
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

  test('create an new employee', async () => {
    model.create.mockReturnValue(mockEmployee);
    model.findOne.mockReturnValue(false);
    bcrypt.hash.mockReturnValue('fakehash');
    bcrypt.genSalt.mockReturnValue(10);
    await createEmployee(req, res, next);
    expect(model.create).toHaveBeenCalledWith(req.body);
    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toStrictEqual(mockEmployee);
  });

  test('throw an exception when creating an employee that already exists', async () => {
    model.create.mockReturnValue(mockEmployee);
    model.findOne.mockReturnValue(true);
    await createEmployee(req, res, next);
    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toStrictEqual('The email you provided already exists in our database.');
  });

  test('it returns 500 if password hashing fails', async () => {
    model.create.mockRejectedValue('Error');
    model.findOne.mockReturnValue(false);
    bcrypt.hash.mockReturnValue('fakehash');
    await createEmployee(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual('Error');
  });
});
