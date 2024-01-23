const Contact = require("../models/Contact");
const csv = require("csvtojson");
const contactService = require("./../service/contactService");
const { errorHelper } = require("../helpers/commonHelpers");

const createContact = async (req, res, next) => {
  try {
    console.log("POST API CALLED");

    if (!req.file) {
      return res.status(400).json({ message: "CSV file is required." });
    }

    // Use the buffer from req.file instead of the entire req.file object
    const jsonObj = await csv().fromString(req.file.buffer.toString("utf8"));
    // console.log(jsonObj);
    const contacts = jsonObj.map((item) => ({
      name: item["name"],
      phoneNumber: item["phoneNumber"],
      tag: item["tag"],
      source: item["source"],
    }));
    const data = await contactService.createContact(contacts);
    res.data = data;
    next();
  } catch (error) {
    console.log("THIS IS ERROR1", error);
    res.status(500).send({
      message: "Failure",
      error: error.message,
    });
  }
};

// get contact
const getContact = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const payload = {
      page,
      limit,
    };
    const data = await contactService.getContact(payload);
    res.data = data;
    next();
  } catch (error) {
    errorHelper(req, res, error.message, error.statusCode, error);
  }
};

module.exports = {
  createContact,
  getContact,
};
