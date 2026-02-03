const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  name: String,
  fileId: mongoose.Schema.Types.ObjectId,
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Document", DocumentSchema);
const express = require("express");