const employeeModel = require('../models/employee.model');
const joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;

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
    const emailExists = await employeeModel.findOne({
      email: req.body.email,
    });
    if (emailExists) {
      return res.status(400).json('The email you provided already exists in our database.');
    }

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const encryptedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = encryptedPassword;
    const employee = await employeeModel.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
};

const getAllEmployees = async (req, res, next) => {
  try {
    const employees = await employeeModel.find({});
    if (employees && employees.length) {
      res.status(200).json(employees);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await employeeModel.findById(req.params.id);
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateEmployeeById = async (req, res, next) => {
  try {
    const employee = await employeeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        useFindAndModify: false,
      },
    );
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(400).send();
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteEmployeeById = async (req, res, next) => {
  try {
    const results = await employeeModel.findByIdAndDelete(req.params.id);
    if (results) {
      res.status(200).json(results);
    } else {
      res.status(404).json('User Not Found');
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const loginEmployee = async (req, res, next) => {
  try {
    const joiCheck = schema.validate(req.body);
    if (joiCheck.error) {
      return res.status(400).json(joiCheck.error);
    }
    const employee = await employeeModel.findOne({
      email: req.body.email,
    });
    if (!employee) {
      return res.status(400).json('The email you provided does not exist in our database.');
    }
    
    const validPassword = await bcrypt.compare(req.body.password, employee.password);
    if (!validPassword) {
      return res.status(400).json('You provided an invalid password.Please try again.');
    }
    const token = await jwt.sign({
      data: employee,
    }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.header('auth-token', token);
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
  loginEmployee,
};
