const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    res.status(400).json('Token not provided in auth-token header.');
  }

  try {
    const tokenData = jwt.verify(token, 'secret');
    req.user = tokenData;
  } catch (error) {
    res.status(400).json('Remember we have security in place. Go away. Wrong token.');
  }
  next();
};

module.exports = verifyToken;