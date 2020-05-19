const express = require('express');

const apiRoutes = require('./routes');

const app = express();

app.use(express.json());

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ data: 'Up and running!' });
});

module.exports = app;
