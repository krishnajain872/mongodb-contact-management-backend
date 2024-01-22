const createContact = async (payload) => {
  const userData = await User.findByPk(response.data, {
    attributes: ["first_name", "last_name", "id", "mobile", "email"],
  });
  if (!userData) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  userData.status = "verified";
  await userData.save();
  return userData.dataValues;
};

module.exports = {
  createContact,
};
