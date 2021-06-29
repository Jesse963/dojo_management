const { v4: uuidv4 } = require("uuid");
const Attendance = require("../models/attendanceSchema");
const School = require("../models/schoolSchema");
const Student = require("../models/studentSchema");
const router = require("./api");

exports.submitStudent = async (req, res) => {
  console.log("entered submit student");
  try {
    const newStudent = req.body;
    console.log(`New Student: ${newStudent}`);
    const studentEntry = new Student({
      name: newStudent.first_name + " " + newStudent.last_name,
      school: "Mushin Goju Ryu Karate Academy",
      dob: "27/01/1996",
      grade: "White Belt",
      phone: newStudent.phone,
      email: newStudent.email,
      address: newStudent.address,
    });
    await studentEntry.save();
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: `Error adding new student to database: ${error}`,
    });
  }
  return res.redirect(200, "back");
};

exports.getStudents = async (req, res) => {
  const schoolName = "Mushin Goju Ryu Karate Academy";
  console.log("Attempting to get students from: " + schoolName);
  let students;
  try {
    students = await Student.find({ school: schoolName });
    console.log(students);
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: `Error getting students from database: ${error}`,
    });
  }
  res.status(200).json({
    result: students,
    message: "Students found",
    success: true,
  });
};

exports.uploadAttendance = async (req, res) => {
  console.log("entered upload attendance");
  try {
    attendance = new Attendance({
      school: "Mushin Goju Ryu Karate Academy",
      date: new Date(),
      classType: "Standard",
      attendees: req.body,
    });
    await attendance.save();
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: "Error uploading attendance to database",
    });
  } //finally
  console.log("Successful Upload");
  return res.status(200).json({
    message: "Attendance Uploaded successfully",
    success: true,
  });
};

exports.addNewSchool = async (req, res) => {
  console.log("entered new school");
  try {
    school = new School({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      schoolID: uuidv4(),
      //need to add grades/classtypes eventually
    });
    await school.save();
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: "Error uploading new school to database - ",
      error,
    });
  } //finally
  console.log("Successful Upload");
  return res.status(200).json({
    message: "New School Uploaded successfully",
    success: true,
  });
};

exports.login = async (req, res) => {
  let school;
  try {
    school = await School.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (!school) {
      res.status(400).json({
        error: true,
        message: `No School Found`,
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: `Error getting students from database: ${error}`,
    });
  }
  res.cookie(`school_id=${school.schoolID}`);
  res.location("/");
  res.send(302);
  // .json({
  //   message: "School Found - " + school.name,
  //   success: true,
  // })
};

exports.getSchool = async (req, res) => {
  console.log("entered get school");
  let school;
  try {
    school = School.findOne({ schoolID: req.school_id });
    console.log("here is your fucking school", school);
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: "Error getting school from database - " + error,
    });
  } //finally
  console.log("Successful Upload");
  return res.status(200).json({
    result: school,
    message: "Retrieved school successfully",
    success: true,
  });
};

//~~~~~ FIND A COOKIE
//document.cookie.split(";").filter(item => item.trim().startsWith(`${key}=`))
