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

  test('return all employees', async () => {
    model.find.mockReturnValue(mockEmployees);
    await getAllEmployees(req, res, next);
    expect(model.find).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(mockEmployees);
  });

  test('return 404 when collection is empty', async () => {
    model.find.mockReturnValue(null);
    await getAllEmployees(req, res, next);
    expect(model.find).toHaveBeenCalled();
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });
});
