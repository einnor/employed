const httpMock = require('node-mocks-http');

const { getEmployeeById } = require('../../controllers/employee.controller');
const model = require('../../models/employee.model');
const mockEmployees = require('../mockdata/employees.json');

model.findById = jest.fn();

let req, res, next;
req = httpMock.createRequest();
res = httpMock.createResponse();
next = null;

describe('Get Employee By ID - Controller', () => {
  test('getEmployeeById function is defined', () => {
    expect(typeof getEmployeeById).toBe('function');
  });

  test('return an employee by id', (req, res, next) => {
    req.params.id = mockEmployees[0]._id;
    model.findById.mockReturnValue(mockEmployees[0]);
  });
});
