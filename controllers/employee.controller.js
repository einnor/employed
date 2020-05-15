const employeeModel = require('../models/employee.model');

const createEmployee = async (req, res, next) => {
  try {
    const newEmployee = await employeeModel.create(req.body);
    res.status(201).json(newEmployee);
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
};

module.exports = {
  createEmployee,
};
