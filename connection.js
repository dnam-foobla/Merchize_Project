const mongoose = require('mongoose');
require("dotenv").config();

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch((err) => console.error("Could not connect to MongoDB"));

module.exports = mongoose;
