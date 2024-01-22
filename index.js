const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const api_routes = require("./routes");
const connection = require("./database");

const app = express();

const { SERVER_PORT: port } = process.env;

//middlewares
app.use(router);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(api_routes);
require("dotenv").config();

//default api
app.get("/", (req, res) => {
  res.status(200).send("contact management systems A API with mongoose-orm");
});

//server configuratoin
app.listen(port, async () => {
  try {
    await connection.connectDB();
    console.log("server connection successfull");
  } catch (err) {
    console.log(err + "internal server error connection failed !!!");
  }
});
