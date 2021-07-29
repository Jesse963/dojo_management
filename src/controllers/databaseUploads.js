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
    user: process.env.SENDER_EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.submitStudent = async (req, res) => {
  //accepts jwt containing school_id as query string and submits students to that school after decoding
  console.log("submitting students: ", req.body);
  console.log(req.query);

  const decoded_token = jwt.verify(
    req.query.school_id,
    process.env.JWT_TOKEN_SECRET
  );

  const school_id = decoded_token.school_id;
  const expiry = new Date(decoded_token.expiry) || "";

  if (typeof expiry === "object" && expiry < new Date()) {
    console.log("token has expired");
    return res.json({
      success: false,
      message:
        "Token has expired, contact your school admin to generate another",
    });
  }

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
  //check for existing school before creating a new one
  const emailExists = await School.findOne({ email: req.body.email });
  if (emailExists) {
    console.log("email already exists");
    return res
      .status(400)
      .json({ result: "An account already exists with this email address" });
  }

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
      school_id: school_id,
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
    from: process.env.SENDER_EMAIL,
    to: process.env.SENDER_EMAIL,
    subject: "Dojo Management Email Verification",
    text: `Hello, this is an automated email to verify your account.\n\nClick the link below to verify and log in.
    \n\n${process.env.BASE_URL}/api/verifyNewAccount?token=${token}`,
  };

  //send email
  transporter.sendMail(emailOptions, (err, info) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(info.response);
  });
  return res.location("/").send(302);
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
        { school_id: school.school_id },
        process.env.JWT_TOKEN_SECRET
      );
      if (result) {
        console.log("HERE IS YOUR SCHOOL ID:" + school.school_id);
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

exports.getSchool = async (req, res) => {
  console.log("entered get school");
  console.log(req.body);
  let school;

  try {
    const school_id = jwt.verify(
      req.body.school_id,
      process.env.JWT_TOKEN_SECRET
    ).school_id;
    school = await School.find({ school_id: school_id });
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
  console.log("this is the impotant one", req.body);
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
  const studentArray = req.body.students;
  const token = jwt.verify(req.body.school, process.env.JWT_TOKEN_SECRET);
  const school_id = token.school_id;
  let attendancePercentages = [];

  try {
    const schoolClassCount = await Attendance.countDocuments({
      school: school_id,
    });
    console.log(schoolClassCount);
    await studentArray.forEach(async (student, i) => {
      const studentClassCount = await Attendance.countDocuments({
        attendees: student._id,
      });
      const studentAttendancePercentage =
        (studentClassCount / schoolClassCount) * 100;
      attendancePercentages.push({
        _id: student._id,
        name: student.first_name + " " + student.last_name,
        attendancePercentage: studentAttendancePercentage,
      });
      console.log(student.first_name, studentAttendancePercentage);

      if (attendancePercentages.length === req.body.students.length) {
        return res.status(200).json({
          result: attendancePercentages,
          message: "Is this the one?",
          success: true,
        });
      }
    });
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

exports.generateNewStudentLink = async (req, res) => {
  const cookie_token = req.headers.cookie.split("school_id=")[1];
  const school_id = jwt.verify(
    cookie_token,
    process.env.JWT_TOKEN_SECRET
  ).school_id;
  const expiry = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  const token = jwt.sign(
    { school_id: school_id, expiry: expiry },
    process.env.JWT_TOKEN_SECRET
  );
  const link = `${process.env.BASE_URL}/api/addStudentFromLink?token=${token}`;
  console.log(link);
  return res.json({ success: true, result: link });
};

exports.editNote = async (req, res) => {
  console.log(req.body);
  try {
    await Note.updateOne({ _id: req.body._id }, { content: req.body.note });
  } catch (error) {
    console.log("Failed to update note - " + error);
    return res.json({ result: "fail", error: error }).send(400);
  }
  return res.send(200);
};

exports.deleteNote = async (req, res) => {
  console.log(req.query.note);
  try {
    await Note.deleteOne({ _id: req.query.note });
  } catch (error) {
    console.log("Failed to delete note - " + error);
    return res.json({ result: "fail", error: error }).send(400);
  }
  return res.json({ result: "successfully deleted note" });
};

exports.test = async (req, res) => {
  const attendanceCount = await Attendance.count({
    attendees: "60fcbb273e2fbf2de80e2237",
  });
  res.json({ result: attendanceCount });
};
