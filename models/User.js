// IMPORT MONGOOSE
const mongoose = require("mongoose");

// CREATE USER MODEL
const User = mongoose.Schema({
  lastname: String,
  firstname: String,
  phone: String,
  email: String,
  password: String,
});

// EXPORT USER MODEL
module.exports = mongoose.model("User", User);
