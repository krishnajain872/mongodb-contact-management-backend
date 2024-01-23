var csv = require("csvtojson");
const Contact = require("../models/Contact");
const createContact = async (payload) => {
  try {
    console.log("Service called");
    const data = await Contact.insertMany(payload);
    console.log("Successfully inserted", data.length, "documents");
    return data;
  } catch (error) {
    console.error("Error in createContact service:", error.message);
    throw error;
  }
};

const getContact = async (payload) => {
  try {
    console.log("Service called");
    const contacts = await Contact.find()
      .limit(payload.limit * 1)
      .skip((payload.page - 1) * payload.limit)
      .exec();
    const count = await Contact.countDocuments(); // Use countDocuments instead of count

    // Calculate total pages
    const totalPages = Math.ceil(count / payload.limit);

    return {
      contacts,
      totalContacts: count,
      totalPages,
      currentPage: payload.page,
      offset: payload.page - 1,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createContact,
  getContact,
};
