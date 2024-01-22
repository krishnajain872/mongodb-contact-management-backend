const csvParser = require("csv-parser");
const xlsx = require("xlsx");

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

module.exports = { handleFile };
