const express = require("express");
const router = express.Router();
const {
  getSchool,
  submitStudent,
  uploadAttendance,
  getStudents,
  addNewSchool,
  login,
  getStudentAttendance,
  getFullAttendance,
} = require("./databaseUploads");

router.get("/getStudents", getStudents);
router.post("/getSchool", getSchool);
router.post("/login", login);
router.post("/submit_student", submitStudent);
router.post("/uploadAttendance", uploadAttendance);
router.post("/addNewSchool", addNewSchool);
router.post("/getStudentAttendance", getStudentAttendance);
router.post("/getFullAttendance", getFullAttendance);

module.exports = router;
