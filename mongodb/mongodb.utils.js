const mongoose = require('mongoose');

const URL = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0-sl3oo.mongodb.net/test?retryWrites=true&w=majority`;

const connect = async () => {
  try {
    await mongoose.connect(URL);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

