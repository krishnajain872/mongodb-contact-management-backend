const multer = require("multer");

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, fileFilter: fileFilter });

// File filter function to accept only CSV files
function fileFilter(req, file, cb) {
  if (!file.originalname.match(/\.(csv)$/)) {
    return cb(new Error("Only CSV files are allowed!"), false);
  }
  cb(null, true);
}

const fileUploadMiddleware = upload.single("file");

module.exports = fileUploadMiddleware;
