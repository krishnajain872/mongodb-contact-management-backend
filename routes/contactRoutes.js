var express = require("express");

// const c = require("../controllers/contactController.js");
const { handleFileUpload } = require("../middlewares.js/fileUploadHandler.js");

var router = express.Router();

router.route("/").post(handleFileUpload,);

module.exports = router;
