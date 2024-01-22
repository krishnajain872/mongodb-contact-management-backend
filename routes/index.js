const express = require("express");
const router = express.Router();

router.use("/contact", require("./contactRoutes"));

module.exports = router;
