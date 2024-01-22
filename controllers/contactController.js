const Contact = require("../models/Contact");

// create contact
const createContact = async (req, res, next) => {
  try {
    const { body: payload } = req;
    const data = await groupService.createContact(payload);
    res.data = data;
    next();
  } catch (error) {
    errorHelper(req, res, error.message, error.statusCode, error);
  }
};
// create contact
const getContact = async (req, res, next) => {
  try {
    const { body: payload } = req;
    const data = await groupService.createContact(payload);
    res.data = data;
    next();
  } catch (error) {
    errorHelper(req, res, error.message, error.statusCode, error);
  }
};

module.exports = {
  createContact,
};
