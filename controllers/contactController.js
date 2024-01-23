const Contact = require("../models/Contact");
const csv = require("csvtojson");
const contactService = require("./../service/contactService");
const { errorHelper } = require("../helpers/commonHelpers");

const createContact = async (req, res, next) => {
  try {
    const jsonObj = await csv().fromFile(req.file.path);
    const army = jsonObj.map((item) => ({
      name: item["name"],
      phoneNumber: item["phoneNumber"],
      tag: item["tag"],
      source: item["source"],
    }));
    console.log(army);
    await contactService.createContact(army);
    next();
  } catch (error) {
    res.status(500).send({
      message: "Failure",
      error: error.message,
    });
  }
};
// create contact
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
