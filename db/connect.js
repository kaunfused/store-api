const mongoose = require("mongoose");

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@nodeexpress.isko1mi.mongodb.net/store-api?retryWrites=true&w=majority`;

const connectDB = () => {
  return mongoose.connect(url);
};

module.exports = connectDB;
