const { v4: uuidv4 } = require("uuid");
const Attendance = require("../models/attendanceSchema");
const School = require("../models/schoolSchema");
const Student = require("../models/studentSchema");
const querystring = require("querystring");
const router = require("./api");

exports.submitStudent = async (req, res) => {
  console.log("entered submit student");

  console.log(req.query);

  try {
    const newStudent = req.body;
    const studentEntry = new Student({
      name: newStudent.first_name + " " + newStudent.last_name,
      school: req.query.school_id,
      dob: newStudent.dob,
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
  const school_id = req.headers.cookie.split("=")[1];
  console.log(school_id);
  let students;
  try {
    students = await Student.find({ school: school_id });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: `Error getting students from database: ${error}`,
    });
  }
  console.log("found students, returning");
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
  const school_id = uuidv4();
  try {
    school = new School({
      name: req.body.school_name,
      password: req.body.password,
      email: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone: req.body.phone,
      postcode: req.body.postcode,
      schoolID: school_id,
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
  res.cookie(`school_id=${school_id}`);
  res.location("/");
  res.send(302);
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
  console.log("HERE IS YOUR SCHOOL ID:" + school.schoolID);
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
    school = await School.find({ schoolID: req.body.school_id });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: "Error getting school from database - " + error,
    });
  } //finally
  console.log("School found, ", school);
  return res.status(200).json({
    result: school,
    message: "Retrieved school successfully",
    success: true,
  });
};

//~~~~~ FIND A COOKIE
//document.cookie.split(";").filter(item => item.trim().startsWith(`${key}=`))
