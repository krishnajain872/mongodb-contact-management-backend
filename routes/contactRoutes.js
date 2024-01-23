var express = require("express");
const contactController = require("../controllers/contactController.js");
const generic_response = require("../helpers/commonHelpers.js");
const fileUploadMiddleware = require("../middlewares.js/fileUploadHandler.js");
var router = express.Router();

router
  .route("/")
  .post(
    fileUploadMiddleware,
    contactController.createContact,
    generic_response.responseHelper
  );
router
  .route("/")
  .get(contactController.getContact, generic_response.responseHelper);

module.exports = router;
