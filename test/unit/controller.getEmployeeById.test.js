const { getEmployeeById } = require('../../controllers/employee.controller');
const model = require('../../models/employee.model');

describe('Get Employee By ID - Controller', () => {
  test('getEmployeeById function is defined', () => {
    expect(typeof getEmployeeById).toBe('function');
  });
});
