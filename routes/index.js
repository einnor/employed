const router = require('express').Router();

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

module.exports = router;
