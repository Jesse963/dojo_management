const mongoose = require("mongoose");

let SchoolSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    classTypes: {
      type: Array,
      required: false,
    },
    grades: {
      type: Array,
      required: false,
    },
    school_id: {
      type: String,
      required: true,
    },
    postcode: {
      type: Number,
      required: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const School = mongoose.model("Schools", SchoolSchema);
module.exports = School;
