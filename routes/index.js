const router = require('express').Router();

const verifyToken = require('./jwt.token.verify');
const controller = require('../controllers/employee.controller');

router.get('/', (req, res) => {
  res.json({
    status: 'Api is working',
    message: 'Welcome to the employee api router',
  });
});

router.post('/contacts', controller.createEmployee);
router.get('/contacts', controller.getAllEmployees);
router.get('/contacts/:id', controller.getEmployeeById);
router.put('/contacts/:id', verifyToken, controller.updateEmployeeById);
router.delete('/contacts/:id', controller.deleteEmployeeById);
router.post('/contacts/login', controller.loginEmployee);

module.exports = router;
