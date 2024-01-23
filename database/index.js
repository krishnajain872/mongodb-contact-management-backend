const mongoose = require("mongoose");
require("dotenv").config();

const { DB_URL: url } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      // authSource: "admin", // if removed then show auth errors
      useUnifiedTopology: true, // new Server Discovery and Monitoring engine
      useNewUrlParser: true, // new MongoDB connection string parser
    });
    console.log("Database connected");
  } catch (err) {
    console.error(err + "\nMongoDB connection broke!!!"); // Use console.error for errors
  }
};

module.exports = {
  connectDB,
};
