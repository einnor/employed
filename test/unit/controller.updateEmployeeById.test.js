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
    model.findByIdAndUpdate.mockClear();
  });

  test('updateEmployeeById function is defined', () => {
    expect(typeof updateEmployeeById).toBe('function');
  });

  test('update an existing employee with phone number', async () => {
    req.params.id = mockEmployees[0]._id;
    const toUpdate = { ...mockEmployees[0], phone: '123456789' };
    req.body = { ...toUpdate };
    model.findByIdAndUpdate.mockReturnValue(toUpdate);
    await updateEmployeeById(req, res, next);
    expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
      req.params.id,
      req.body,
      {
        useFindAndModify: false,
      }
    );
    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toStrictEqual(toUpdate);
  });

  test('return 400 when id is not found', async () => {
    model.findByIdAndUpdate.mockReturnValue(null);
    await updateEmployeeById(req, res, next);
    expect(res.statusCode).toBe(400);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual({});
  });

  test('return 500 findByIdAndUpdate throws an exception', async () => {
    model.findByIdAndUpdate.mockRejectedValue('Error');
    await updateEmployeeById(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual('Error');
  });
});
