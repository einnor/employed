const employeeModel = require('../models/employee.model');
const joi = require('@hapi/joi');

const schema = joi.object({
  name: joi.string().required(),
  email: joi.string().required().email(),
  password: joi.string().min(6).required(),
  gender: joi.string(),
  phone: joi.string(),
});

const createEmployee = async (req, res, next) => {
  try {
    const joiCheck = schema.validate(req.body);
    if (joiCheck.error) {
      return res.status(400).json(joiCheck.error);
    }
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
