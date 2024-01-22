const Joi = require("joi");
const { validateRequest } = require("../helpers/validation.helper");
const signupSchema = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required().label("Name"),
    phoneNumber: Joi.string()
      .email({ tlds: { allow: false } }) // Disallow top-level domains to allow more email formats
      .lowercase()
      .trim()
      .required()
      .label("Email"),
    mobile: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required()
      .label("Phone Number"),
    password: Joi.string().min(8).required().label("Password"), // Add a minimum length to the password for security
    avatar: Joi.string().uri(), // Validate that the avatar is a URI
  });
  validateRequest(req, res, next, schema, "body");
};

module.exports = {
  signupSchema,
};
