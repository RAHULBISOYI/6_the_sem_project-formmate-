const express = require("express");
const mongoose = require("mongoose");
require("./db"); // MongoDB connection

const app = express();
app.use(express.static("public"));

app.use(express.json());

// 👇 THIS LINE MUST EXIST
app.use("/api", require("./routes/upload"));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
