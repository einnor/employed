require('dotenv').config();
const express = require('express');

const apiRoutes = require('./routes');

const app = express();

app.use(express.json());

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.status(200).json('Up and running!');
});

module.exports = app;
