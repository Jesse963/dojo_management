const express = require("express");
const router = express.Router();
const {submitStudent, testing, getStudents} = require("./databaseUploads")

router.post("/submit_student", submitStudent)
router.post("/test", testing)
router.get("/getStudents", getStudents)

module.exports = router;