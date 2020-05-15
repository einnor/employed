const express = require('express');

const apiRoutes = require('./routes');
const mongodb = require('./mongodb/mongodb.utils');

const PORT = 8080;
const app = express();

app.use(express.json());

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ data: 'Up and running!' });
});

// Connect to database
mongodb.connect();

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});