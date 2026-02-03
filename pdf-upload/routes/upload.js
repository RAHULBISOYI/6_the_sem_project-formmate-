const express = require("express");
const router = express.Router();
const mongooseConnection = require("../db");
const upload = require("../uploadMiddleware");
const { GridFSBucket, ObjectId } = require("mongodb");
const Document = require("../models/Document");

// DELETE PDF by fileId
router.delete("/file/:id", async (req, res) => {
  try {
    const fileId = new ObjectId(req.params.id);

    const bucket = new GridFSBucket(mongooseConnection.db, {
      bucketName: "pdfs",
    });

    // 1️⃣ Delete file from GridFS
    await bucket.delete(fileId);

    // 2️⃣ Delete metadata
    await Document.deleteOne({ fileId });

    res.json({ message: "PDF deleted successfully" });

  } catch (err) {
    console.error("DELETE ERROR:", err.message);
    res.status(500).json({
      error: "Failed to delete PDF",
      details: err.message
    });
  }
});

/* ===============================
   UPLOAD PDF
================================ */
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const bucket = new GridFSBucket(mongooseConnection.db, {
      bucketName: "pdfs",
    });

    const uploadStream = bucket.openUploadStream(
      `${Date.now()}-${req.file.originalname}`
    );

    uploadStream.end(req.file.buffer);

    uploadStream.on("finish", async () => {
      const doc = new Document({
        name: req.body.name || req.file.originalname,
        fileId: uploadStream.id,
      });

      await doc.save();

      res.status(200).json({
        message: "PDF uploaded successfully",
        fileId: uploadStream.id,
      });
    });

    uploadStream.on("error", (err) => {
      res.status(500).json({ error: err.message });
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// LIST ALL DOCUMENTS
router.get("/documents", async (req, res) => {
  try {
    const docs = await Document.find().sort({ createdAt: -1 });
    res.json(docs.map(d => ({ name: d.name, fileId: d.fileId })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===============================
   VIEW / DOWNLOAD PDF
================================ */
router.get("/file/:id", (req, res) => {
  try {
    const bucket = new GridFSBucket(mongooseConnection.db, {
      bucketName: "pdfs",
    });

    const fileId = new ObjectId(req.params.id);

    res.set("Content-Type", "application/pdf");

    bucket.openDownloadStream(fileId).pipe(res);

  } catch (err) {
    res.status(400).json({ error: "Invalid file ID" });
  }
});

module.exports = router;
