const nodemailer = require("nodemailer");
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const School = require("../models/schoolSchema");
const router = require("./api");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.sendTestEmail = async (req, res) => {
  let school;
  let jsonResponse;
  const options = {
    protocol: "http",
    method: "POST",
    body: JSON.stringify(req.body),
    headers: { "Content-Type": "application/json" },
  };
  try {
    const response = await fetch(
      process.env.BASE_URL + "/api/verifySchoolFromEmail",
      options
    );
    jsonResponse = await response.json();
  } catch (error) {
    console.log("errored with - " + error);
  }
  school = jsonResponse.result.school;
  if (school === null) {
    console.log("NO SCHOOL FOUND");
  } else {
    const email = school.email;
    const tokenData = {
      school_id: school.school_id,
      updatedAt: school.updatedAt,
    };
    const secret = process.env.JWT_TOKEN_SECRET;
    console.log(tokenData, "/", secret);
    const token = jwt.sign(tokenData, secret);

    const emailOptions = {
      from: process.env.SENDER_EMAIL,
      to: process.env.SENDER_EMAIL,
      subject: "Password reset",
      text: `Hello, this is an automated email to reset your password.\n\n
      If you did not request this email please ignore it.\n\n
      Click the link below to be taken to the password reset portal\n\n${process.env.BASE_URL}/api/resetPassword?token=${token}`,
    };

    transporter.sendMail(emailOptions, (err, info) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(info.response);
    });
  }
  res.location("/");
  res.sendStatus(302);
};

exports.resetPassword = async (req, res) => {
  console.log("entered reset password");
  console.log(req.body.token);
  res.location("/");
  res.sendStatus(302);
};

exports.updateUserPassword = async (req, res) => {
  console.log("entered update user pass");
  const token = req.query.token;
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
  console.log("decoded token", decodedToken);

  const school = await School.findOne({ school_id: decodedToken.school_id });

  const dbDate = "" + new Date(school.updatedAt);
  const tokenDate = "" + new Date(decodedToken.updatedAt);

  if (dbDate !== tokenDate) {
    return res.status(400).location("/").json({
      error: true,
      message: `Password reset token has expired`,
    });
  }

  const query = { school_id: decodedToken.school_id };
  console.log("query for update one: ", query);

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    await School.updateOne(query, { password: hashedPassword });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: `Failed to update user password - ${error}`,
    });
  }
  res.location("/");
  res.sendStatus(302);
};

exports.sendVerificationEmail = async (req, res) => {
  //Create JWT for email verification
  const payload = { school_id: "025b2680-58d4-4a10-a003-dbf1a733869d" };
  const secret = process.env.JWT_TOKEN_SECRET;
  const token = jwt.sign(payload, secret);

  //set email options
  const emailOptions = {
    from: process.env.SENDER_EMAIL,
    to: process.env.SENDER_EMAIL,
    subject: "Password reset",
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

  return res.json(token);
  // .sendStatus(200);
};

//Handle verification email responses
exports.verifyNewAccount = async (req, res) => {
  console.log("Entered email verification");
  const token = req.query.token;
  let decodedToken;
  let school_id;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    school_id = decodedToken.school_id;
    await School.updateOne({ school_id: school_id }, { verified: true });
  } catch (error) {
    console.log(
      "failed to update school or somethin gin the try im looking at"
    );
    return res.status(400).json({
      error: true,
      message: `Failed to verify new account - ${error}`,
    });
  }
  console.log(`successfully verified account ${school_id} with token ${token}`);
  return res.cookie("school_id", token).location("/").sendStatus(302);
};
