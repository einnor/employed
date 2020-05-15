const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({
    status: 'Api is working',
    message: 'Welcome to the employee api router',
  });
});

module.exports = {
  router,
}