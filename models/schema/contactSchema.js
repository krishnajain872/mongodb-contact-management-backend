const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      min: 10,
      max: 10,
    },

    isDeleted: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
    tag: [
      {
        type: String,
        required: false,
      },
    ],
    source: { type: String, enum: ["api", "other"], default: "other" },
  },
  {
    timestamps: true,
  }
);

module.exports = contactSchema;
