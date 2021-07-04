const mongoose = require("mongoose");

let NotesSchema = mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
      default: "Admin",
    },
    student: {
      type: String,
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: new Date(),
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const Note = mongoose.model("notes", NotesSchema);
module.exports = Note;
