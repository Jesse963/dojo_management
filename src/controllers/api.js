const express = require("express");
const router = express.Router();
const {
  getSchool,
  submitStudent,
  uploadAttendance,
  getStudents,
  addNewSchool,
  login,
} = require("./databaseUploads");

router.get("/getStudents", getStudents);
router.post("/getSchool", getSchool);
router.post("/login", login);
router.post("/submit_student", submitStudent);
router.post("/uploadAttendance", uploadAttendance);
router.post("/addNewSchool", addNewSchool);

module.exports = router;
