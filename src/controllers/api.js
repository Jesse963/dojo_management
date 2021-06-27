const express = require("express")
const router = express.Router()
const submitStudent = require("../controllers/databaseUploads.js")

router.post("/submit_student", submitStudent)