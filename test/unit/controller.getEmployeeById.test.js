const httpMock = require('node-mocks-http');

const { getEmployeeById } = require('../../controllers/employee.controller');
const model = require('../../models/employee.model');
const mockEmployees = require('../mockdata/employees.json');

model.findById = jest.fn();

describe('Get Employee By ID - Controller', () => {
  test('getEmployeeById function is defined', () => {
    expect(typeof getEmployeeById).toBe('function');
  });

  test('return an employee by id', () => {
  });
});
