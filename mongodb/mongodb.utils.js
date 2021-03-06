const mongoose = require('mongoose');

const URL = process.env.MONGO_URL;

const connect = async () => {
  try {
    await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const disconnect = async () => {
  try {
    await mongoose.disconnect(URL);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// Delete a database
const dropCollection = async (collectionName) => {
  try {
    await mongoose.connection.collection(collectionName).drop();
  } catch (error) {
    if (error.code === 26) {
      console.log(`Namespace ${collectionName} was not found`);
    } else {
      console.log(error);
      throw new Error(error);
    }
  }
};

module.exports = {
  connect,
  disconnect,
  dropCollection,
};
