const httpMock = require('node-mocks-http');

const { getEmployeeById } = require('../../controllers/employee.controller');
const model = require('../../models/employee.model');
const mockEmployees = require('../mockdata/employees.json');

model.findById = jest.fn();

let req, res, next;

describe('Get Employee By ID - Controller', () => {
  beforeEach(() => {
    req = httpMock.createRequest();
    res = httpMock.createResponse();
    next = null;
  });

  afterEach(() => {
    model.findById.mockClear();
  });

  test('getEmployeeById function is defined', () => {
    expect(typeof getEmployeeById).toBe('function');
  });

  test('return an employee by id', async () => {
    req.params.id = mockEmployees[0]._id;
    model.findById.mockReturnValue(mockEmployees[0]);
    await getEmployeeById(req, res, next);
    expect(model.findById).toHaveBeenCalledWith(req.params.id);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(mockEmployees[0]);
  });

  test('return 404 when id not found', async () => {
    req.params.id = mockEmployees[0]._id;
    model.findById.mockReturnValue(null);
    await getEmployeeById(req, res, next);
    expect(model.findById).toHaveBeenCalledWith(req.params.id);
    expect(res.statusCode).toBe(404);
  });

  test('return 500 when model.findById throws an exception', async () => {
    req.params.id = mockEmployees[0]._id;
    model.findById.mockRejectedValue('Fake exception from findById');
    await getEmployeeById(req, res, next);
    expect(model.findById).toHaveBeenCalledWith(req.params.id);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual('Fake exception from findById');
  });
});
