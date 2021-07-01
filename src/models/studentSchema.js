const mongoose = require("mongoose");

let StudentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    grade: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const Student = mongoose.model("students", StudentSchema);
module.exports = Student;
