const httpMock = require('node-mocks-http');

const { deleteEmployeeById } = require('../../controllers/employee.controller');
const model = require('../../models/employee.model');
const mockEmployees = require('../mockdata/employees.json');

model.findByIdAndDelete = jest.fn();

let req, res, next;

describe('Delete Employee by ID - Controller', () => {
  beforeEach(() => {
    req = httpMock.createRequest();
    res = httpMock.createResponse();
    next = null;
  });

  afterEach(() => {
    model.findByIdAndDelete.mockClear();
  });

  test('deleteEmployeeById function is defined', () => {
    expect(typeof deleteEmployeeById).toBe('function');
  });

  test('delete an existing employee', async () => {
    req.params.id = mockEmployees[0]._id;
    model.findByIdAndDelete.mockResolvedValue(mockEmployees[0]);
    await deleteEmployeeById(req, res, next);
    expect(model.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(mockEmployees[0]);
  });
});
