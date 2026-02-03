const mongoose = require("mongoose");
const { GridFSBucket, ObjectId } = require("mongodb");
const fs = require("fs");

const MONGO_URI = "mongodb://localhost:27017/documentDB";

mongoose.connect(MONGO_URI);

mongoose.connection.once("open", () => {
  const bucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: "pdfs",
  });

  bucket
    .openDownloadStream(new ObjectId("697f73145b87d1575b1605d1"))
    .pipe(fs.createWriteStream("myfile.pdf"))
    .on("finish", () => {
      console.log("PDF downloaded as myfile.pdf");
      process.exit();
    });
});
