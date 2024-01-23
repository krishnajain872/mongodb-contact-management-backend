const mongoose = require("mongoose");
require("dotenv").config();

const { DB_URL: url } = process.env;

const connectDB = async () => {
  try {
    const connect = await mongoose
      .connect(url, {
        // authSource: "admin", // if removed then show auth errors
        useUnifiedTopology: true, //new Server Discovery and Monitoring engine
        useNewUrlParser: true, //new MongoDB connection string parser
      })
      .then(() => {
        console.log("Database connected");
      });
  } catch (err) {
    console.log(err + " \nmongodb connection broked !!!");
  }
};

module.exports = {
  connectDB,
};
