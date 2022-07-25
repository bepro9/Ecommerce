const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URL = process.env.MONGO_URL;

const dbConnection = mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Error connecting to Database", err);
  });

module.exports = dbConnection;
