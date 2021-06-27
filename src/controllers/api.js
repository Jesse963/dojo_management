const express = require("express");
const router = express.Router();
const {submitStudent, testing} = require("./databaseUploads")

router.post("/submit_student", submitStudent)
router.post("/test", testing)

module.exports = router;