const multer = require("multer");
const csvParser = require("csv-parser");
const xlsx = require("xlsx");

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, fileFilter: fileFilter });

// File filter function to accept only CSV and Excel files
function fileFilter(req, file, cb) {
  if (!file.originalname.match(/\.(csv|xlsx)$/)) {
    return cb(new Error("Only CSV and Excel files are allowed!"), false);
  }
  cb(null, true);
}

// Function to handle both CSV and Excel files
const handleFile = (fileBuffer, fileName) => {
  if (fileName.endsWith(".csv")) {
    // Parse CSV data using csv-parser
    const csvData = fileBuffer.toString("utf8");
    const results = [];
    return new Promise((resolve, reject) => {
      csvParser({ separator: "," })
        .on("data", (data) => results.push(data))
        .on("end", () => resolve(results))
        .on("error", (error) => reject(error))
        .write(csvData);
    });
  } else if (fileName.endsWith(".xlsx")) {
    // Parse Excel data using xlsx
    const workbook = xlsx.read(fileBuffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    return Promise.resolve(excelData);
  } else {
    return Promise.reject(new Error("Unsupported file format"));
  }
};

// Function to handle file upload and parsing for CSV and Excel
const handleFileUpload = (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: "File upload error" });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file provided" });
    }

    // Access the uploaded file from req.file.buffer
    const fileBuffer = req.file.buffer;
    const fileName = req.file.originalname;

    // Use the helper function to handle the file
    handleFile(fileBuffer, fileName)
      .then((parsedData) => {
        // Attach the parsed data to the request object for further processing
        req.parsedData = parsedData;
        next();
      })
      .catch((error) => {
        res.status(400).json({ error: error.message });
      });
  });
};

module.exports = { handleFileUpload };
