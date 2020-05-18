const httpMock = require('node-mocks-http');

const { updateEmployeeById } = require('../../controllers/employee.controller');
const model = require('../../models/employee.model');
const mockEmployees = require('../mockdata/employees.json');

model.findByIdAndUpdate = jest.fn();

let req, res, next;

describe('Update Employee by ID - Controller', () => {
  beforeEach(() => {
    req = httpMock.createRequest();
    res = httpMock.createResponse();
    next = null;
  });

  afterEach(() => {
    model.findByIdAndDelete.mockClear();
  });
});
