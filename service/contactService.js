var csv = require("csvtojson");
const Contact = require("../models/Contact");

const createContact = async (payload) => {
  try {
    const data = await Contact.insertMany(army);
    if (data) return true;
  } catch (error) {
    throw error;
  }
};
const getContact = async (payload) => {
  const contact = await Contact.find()
    .limit(payload.limit * 1)
    .skip((payload.page - 1) * payload.limit)
    .exec();
  // const count = await Contact.count();
  return {
    contact,
  };
};

module.exports = {
  createContact,
  getContact,
};
