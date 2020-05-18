const httpMock = require('node-mocks-http');

const { getEmployeeById } = require('../../controllers/employee.controller');
const model = require('../../models/employee.model');
const mockEmployees = require('../mockdata/employees.json');

model.find = jest.fn();

let req, res, next;

describe('Get All Employees - Controller', () => {
  
});
