const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

const storage = new GridFsStorage({
  url: "mongodb://localhost:27017/documentDB",
  options: { useUnifiedTopology: true },

  file: (req, file) => {
    return new Promise((resolve, reject) => {
      if (file.mimetype !== "application/pdf") {
        return reject(new Error("Only PDF files are allowed"));
      }

      resolve({
        filename: Date.now() + "-" + file.originalname,
        bucketName: "pdfs",
      });
    });
  },
});

module.exports = multer({ storage });
