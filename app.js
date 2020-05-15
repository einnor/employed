const express = require('express');

const apiRoutes = require('./routes');

const PORT = 8080;
const app = express();

app.use(express.json());

apiRoutes.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ data: 'Up and running!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});