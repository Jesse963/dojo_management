const { v4: uuidv4 } = require("uuid");
const Attendance = require("../models/attendanceSchema");
const Note = require("../models/notesSchema");
const School = require("../models/schoolSchema");
const Student = require("../models/studentSchema");
const router = require("./api");
const bcrypt = require("bcrypt");

exports.submitStudent = async (req, res) => {
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
  res.location("/");
  res.send(302);
};

exports.getStudents = async (req, res) => {
  let school_id;
  if (req.headers.cookie) {
    school_id = req.headers.cookie.split("school_id=")[1].split("=")[0];
  }
  let students;
  try {
    students = await Student.find({ school: school_id }).sort({ name: 1 });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: `Error getting students from database: ${error}`,
    });
  }
  console.log("found students, returning");
  res.location("/").json({
    result: students,
    message: "Students found",
    success: true,
  });
  // res.location("/");
  // res.send(302);
};

exports.uploadAttendance = async (req, res) => {
  console.log("entered upload attendance");
  console.log(req.body);
  school_id = req.headers.cookie.split("school_id=")[1].split("=")[0];
  try {
    attendance = new Attendance({
      school: school_id,
      date: req.body.date,
      classType: "Standard",
      attendees: req.body.students,
    });
    await attendance.save();
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: "Error uploading attendance to database",
    });
  } //finally
  console.log("Successful Upload");
  res.status(200).json({
    success: true,
  });
};

exports.addNewSchool = async (req, res) => {
  const school_id = uuidv4();
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  console.log(hashedPassword);
  try {
    school = new School({
      name: req.body.school_name,
      password: hashedPassword,
      email: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone: req.body.phone,
      postcode: req.body.postcode,
      schoolID: school_id,
    });
    await school.save();
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: "Error uploading new school to database - ",
      error,
    });
  } //finally
  console.log(`You have added a new school with id: ${school_id}`);
  return res.cookie(`school_id=${school_id}`).location("/").sendStatus(302);
};

exports.login = async (req, res) => {
  let school;
  try {
    school = await School.findOne({
      email: req.body.email,
      // password: req.body.password,
    });
    console.log(school);

    bcrypt.compare(req.body.password, school.password, (err, result) => {
      if (result) {
        console.log("HERE IS YOUR SCHOOL ID:" + school.schoolID);
        res.cookie(`school_id=${school.schoolID}`);
        res.location("/");
        res.send(302);
      } else {
        console.log("Error, incorrect password?");
        res.sendStatus(400);
      }
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

exports.getStudentAttendance = async (req, res) => {
  console.log("Entered get attendance");
  let attendances;
  const school_id = req.body.school;
  const fullName = req.body.name;

  console.log(school_id, fullName);

  try {
    attendances = await Attendance.find({
      school: school_id,
      attendees: fullName,
    });
    console.log(attendances);
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: "Error getting attendance from database - " + error,
    });
  } //finally
  if (req.body.fromServer) {
    return attendances;
  } else {
    return res.status(200).json({
      result: attendances,
      message: "Retrieved Attendance successfully",
      success: true,
    });
  }
};

exports.getFullAttendance = async (req, res) => {
  console.log("Entered get full attendance");
  let attendances;
  const school_id = req.body.school;
  console.log("school_id from getFullAttendance: ", school_id);
  try {
    attendances = await Attendance.find({ school: school_id }).sort({
      date: -1,
    });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: "Error getting attendance from database - " + error,
    });
  } //finally
  if (req.body.fromServer) {
    return attendances;
  } else {
    return res.status(200).json({
      result: attendances,
      message: "Retrieved Attendance successfully",
      success: true,
    });
  }
};

exports.calculateFullAttendancePercentages = async (req, res) => {
  console.log("school ID: ", req.body.students[0].school);
  let attendancePercentages = {};
  let attendances;
  try {
    //Collect total number of classes for the particular school
    const schoolCount = await this.getFullAttendance({
      body: { school: req.body.students[0].school, fromServer: true },
    });
    const totalClasses = schoolCount.length;
    console.log("total classed: ", totalClasses);
    //Collect attendance information for each individual student - student/total = % of classes attended
    await req.body.students.forEach(async (student, i) => {
      attendances = await this.getStudentAttendance({
        body: { school: student.school, name: student.name, fromServer: true },
      });
      console.log("attendances: ", attendances);
      attendancePercentages[student.name] =
        (100 * attendances.length) / totalClasses;

      if (i == req.body.students.length - 1) {
        return res.status(200).json({
          result: attendancePercentages,
          classes: attendances,
          message: "Is this the one?",
          success: true,
        });
      }
    });
    console.log("attendance count: ", attendancePercentages);
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: "Error getting attendance from database - " + error,
    });
  }
};

exports.postNote = async (req, res) => {
  console.log(req.body);
  console.log(req.query);
  try {
    note = new Note({
      content: req.body.content,
      school: req.query.school_id,
      student: req.query.student_id,
    });
    await note.save();
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: "Error uploading note - " + error,
      error,
    });
  } //finally
  res.location("/");
  res.send(302);
};

exports.getNotes = async (req, res) => {
  console.log("Entered get notes");
  const school_id = req.body.student.school;
  const fullName = req.body.student.name;
  let notes;
  try {
    notes = await Note.find({
      school: school_id,
      student: fullName,
    });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: "Error getting attendance from database - " + error,
    });
  } //finally

  return res.status(200).json({
    result: notes,
    message: "Retrieved Attendance successfully",
    success: true,
  });
};

exports.verifySchoolFromEmail = async (req, res) => {
  console.log("Verify School from email - ", req.body);
  let school;
  try {
    school = await School.findOne({ email: req.body.email });
  } catch (error) {
    console.log("errored when retrieving - " + error);
    return res.status(400).json({
      error: true,
      message: "Error getting school from database - " + error,
    });
  } //finally
  return res.status(200).json({
    result: { school: school },
    message: "Retrieved school successfully",
    success: true,
  });
};
