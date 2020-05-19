require('dotenv').config();

const app = require('./app');
const mongodb = require('./mongodb/mongodb.utils');

const PORT = 8080;

// Connect to database
mongodb.connect();

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});