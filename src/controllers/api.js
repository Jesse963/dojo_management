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
  calculateFullAttendancePercentages,
  postNote,
  getNotes,
} = require("./databaseUploads");

router.get("/getStudents", getStudents);
router.post("/getSchool", getSchool);
router.post("/login", login);
router.post("/submit_student", submitStudent);
router.post("/uploadAttendance", uploadAttendance);
router.post("/addNewSchool", addNewSchool);
router.post("/getStudentAttendance", getStudentAttendance);
router.post("/getFullAttendance", getFullAttendance);
router.post(
  "/calculateFullAttendancePercentages",
  calculateFullAttendancePercentages
);
router.post("/postNote", postNote);
router.post("/getNotes", getNotes);

module.exports = router;
