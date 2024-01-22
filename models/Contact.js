const mongoose = require("mongoose");
const contactSchema = require("./schema/contactSchema");

module.exports = mongoose.model("Contact", contactSchema);
