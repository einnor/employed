const httpMock = require('node-mocks-http');

const { getAllEmployees } = require('../../controllers/employee.controller');
const model = require('../../models/employee.model');
const mockEmployees = require('../mockdata/employees.json');

model.find = jest.fn();

let req, res, next;

describe('Get All Employees - Controller', () => {
  beforeEach(() => {
    req = httpMock.createRequest();
    res = httpMock.createResponse();
    next = null;
  });

  afterEach(() => {
    model.find.mockClear();
  });

  test('getAllEmployees function is defined', () => {
    expect(typeof getAllEmployees).toBe('function');
  });
});
