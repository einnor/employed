const mongoose = require('mongoose');

// Setup the schema
let contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    required: true,
    min: 6,
  },
  gender: {
    type: String,
  }, // Optional
  phone: {
    type: String,
  }, // Optional
  createdAt: {
    type: Date,
    default: Date.now,
  }, // Optional
});

mongoose.pluralize(null);
const employeeModel = mongoose.model(`Employee_${process.env.NODE_ENV}`, contactSchema);

module.exports = employeeModel;
