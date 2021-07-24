const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const Attendance = require("../models/attendanceSchema");
const Note = require("../models/notesSchema");
const School = require("../models/schoolSchema");
const Student = require("../models/studentSchema");
const router = require("./api");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "jesse-jenkins@hotmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.submitStudent = async (req, res) => {
  //accepts jwt containing school_id as query string and submits students to that school after decoding
  console.log("submitting students: ", req.body);
  console.log(req.query);
  const school_id = jwt.verify(
    req.query.school_id,
    process.env.JWT_TOKEN_SECRET
  ).school_id;

  try {
    const newStudent = req.body;
    const studentEntry = new Student({
      first_name: newStudent.first_name,
      last_name: newStudent.last_name,
      school: school_id,
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
  //if cookie recieved, decode jwt into school_id
  let token;
  let school_id;
  if (req.headers.cookie) {
    token = req.headers.cookie.split("school_id=")[1];
    school_id = jwt.verify(token, process.env.JWT_TOKEN_SECRET).school_id;
  }
  let students;
  try {
    students = await Student.find({ school: school_id }).sort({
      first_name: 1,
    });
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
  console.log(new Date(req.body.date));

  const token = req.headers.cookie.split("school_id=")[1];
  const school_id = jwt.verify(token, process.env.JWT_TOKEN_SECRET).school_id;
  try {
    const attendance = new Attendance({
      school: school_id,
      date: new Date(req.body.date),
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
    const school = new School({
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
  //Send Verification email and return success message
  //Create JWT for email verification
  const payload = { school_id: school_id };
  const secret = process.env.JWT_TOKEN_SECRET;
  const token = jwt.sign(payload, secret);

  //set email options
  const emailOptions = {
    from: "jesse-jenkins@hotmail.com",
    to: "jesse-jenkins@hotmail.com",
    subject: "Dojo Management Email Verification",
    text: `Hello, this is an automated email to verify your account.\n\nClick the link below to verify and log in.\n\n${process.env.BASE_URL}/api/verifyNewAccount?token=${token}`,
  };

  //send email
  transporter.sendMail(emailOptions, (err, info) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(info.response);
  });
  return res.location("/").sendStatus(200);
};

exports.login = async (req, res) => {
  let school;
  //find school from email
  try {
    school = await School.findOne({
      email: req.body.email,
    });
    console.log(school);

    if (school.verified !== true) {
      return res
        .cookie("school_id", "Unvalidated_Account")
        .location("/")
        .sendStatus(302);
    }

    //compare user password to hashed DB password
    bcrypt.compare(req.body.password, school.password, (err, result) => {
      const token = jwt.sign(
        { school_id: school.schoolID },
        process.env.JWT_TOKEN_SECRET
      );
      if (result) {
        console.log("HERE IS YOUR SCHOOL ID:" + school.schoolID);
        res.cookie(`school_id`, token);
        res.location("/");
        res.send(302);
      } else {
        console.log("Error, incorrect password?");
        return res
          .location("/")
          .cookie(`school_id`, "failed_login")
          .status(302)
          .send("incorrect password");
      }
    });
    if (!school) {
      res.status(400).json({
        error: true,
        message: `No School Found`,
      });
    }
  } catch (error) {
    return res
      .cookie(`school_id`, "failed_login")
      .status(302)
      .location("/")
      .json({
        error: true,
        message: `Error getting students from database: ${error}`,
      });
  }
};

exports.test = async (req, res) => {
  console.log("entered test");
  res.location("/").send(302);
};

exports.getSchool = async (req, res) => {
  console.log("entered get school");
  console.log(req.body);
  let school;

  try {
    const school_id = jwt.verify(
      req.body.school_id,
      process.env.JWT_TOKEN_SECRET
    ).school_id;
    school = await School.find({ schoolID: school_id });
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
  console.log(req.body);
  const token = jwt.verify(req.body.school, process.env.JWT_TOKEN_SECRET);
  console.log(token);
  // const school_id = req.body.school;
  // const fullName = req.body.name;
  const student_id = req.body._id;
  try {
    attendances = await Attendance.find({
      school: token.school_id,
      attendees: student_id,
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
  console.log("here is hopefully a jwt: ", req.body.school);
  try {
    const token = jwt.verify(req.body.school, process.env.JWT_TOKEN_SECRET);
    console.log("school_id from getFullAttendance: ", token.school_id);
    attendances = await Attendance.find({ school: token.school_id }).sort({
      date: -1,
    });
  } catch (error) {
    console.log("here is the error we caught", error);
    return res.sendStatus(400).json({
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
  console.log(req.body);
  let attendancePercentages = [];
  let attendances;
  const token = jwt.verify(req.body.school, process.env.JWT_TOKEN_SECRET);
  const school_id = token.school_id;
  try {
    const query = { school: req.body.school, fromServer: true };
    //Collect total number of classes for the particular school
    const schoolCount = await this.getFullAttendance({
      body: query,
      // body: { school: school_id },
    });
    const totalClasses = schoolCount.length;
    console.log("total classed: ", totalClasses);
    //Collect attendance information for each individual student - student/total = % of classes attended
    await req.body.students.forEach(async (student, i) => {
      attendances = await this.getStudentAttendance({
        body: { school: req.body.school, _id: student._id, fromServer: true },
      });
      console.log("attendances: ", attendances);
      const studentPercentage = (100 * attendances.length) / totalClasses;
      attendancePercentages.push({
        _id: student._id,
        name: student.first_name + " " + student.last_name,
        attendancePercentage: studentPercentage,
      });

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
  const token = jwt.verify(req.query.school_id, process.env.JWT_TOKEN_SECRET);
  try {
    const note = new Note({
      content: req.body.content,
      school: token.school_id,
      student_id: req.query.student_id,
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
  const student_id = req.body.student._id;
  // const fullName = req.body.student.name;
  console.log(req.body);
  let notes;
  try {
    notes = await Note.find({
      school: school_id,
      student_id: student_id,
    }).sort({ date: -1 });
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

exports.editStudentDetails = async (req, res) => {
  console.log("entered edit student details");
  const student_id = req.query.student_id;
  const query = { _id: student_id };
  console.log("query for update: ", query);

  try {
    await Student.updateOne(query, req.body);
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: `Failed to update user password - ${error}`,
    });
  }
  res.location("/");
  res.sendStatus(302);
};
