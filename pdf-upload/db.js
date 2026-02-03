const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/documentDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

module.exports = mongoose.connection;
