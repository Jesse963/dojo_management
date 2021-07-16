const nodemailer = require("nodemailer");
const fetch = require("node-fetch");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "jesse-jenkins@hotmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

const options = {
  from: "jesse-jenkins@hotmail.com",
  to: "jesse-jenkins@hotmail.com",
  subject: "test email from node",
  text: "Hello has the test worked?",
};

exports.sendTestEmail = async (req, res) => {
  let school;
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
    school = await response.json();
    console.log("this is from email handler ", school.result);
  } catch (error) {
    console.log("errored with - " + error);
  }

  if (school.result.school === null) {
    console.log("NO SCHOOL FOUND");
  } else {
    //READ EMAIL ADDRESS FROM RETURNED SCHOOL
    //VERIFY VALIDITY OF EMAIL ADDRESS
    //SEND EMAIL TO ADDRESS WITH LINK
    // "/API/RETREIVE/HASH(SCHOOL_ID + SECRET_KEY)"
  }

  res.location("/");
  res.sendStatus(302);
  //   transporter.sendMail(options, (err, info) => {
  //     if (err) {
  //       console.log(err);
  //       return;
  //     }
  //     console.log(info.response);
  //   });
};
