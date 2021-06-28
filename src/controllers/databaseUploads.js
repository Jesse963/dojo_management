const Student = require("../models/studentSchema");
const router = require("./api");

exports.submitStudent = async (req, res) => {
  console.log("entered submit student")
try {
    const newStudent = req.body;
    console.log(`New Student: ${newStudent}`)
    const studentEntry = new Student({
        name: newStudent.first_name + " " + newStudent.last_name,
        school:"Mushin Goju Ryu Karate Academy",
        dob:"27/01/1996",
        grade: "White Belt",
        phone: newStudent.phone,
        email: newStudent.email,
        address: newStudent.address
    })
    await studentEntry.save()
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: `Error adding new student to database: ${error}`,
    });
  }
  return res.redirect(200,"back")
}

exports.testing = async (req, res) => {

    console.log(req.body);
    
  }


  exports.getStudents = async (req, res) => {
    const schoolName = "Mushin Goju Ryu Karate Academy"
    console.log("Attempting to get students from: " + schoolName)
    let students;
  try {
    students = await Student.find({school : schoolName})
    console.log(students)
    
    } catch (error) {
      return res.status(400).json({
        error: true,
        message: `Error getting students from database: ${error}`,
      });
    }
    res.status(200).json({
      result:students,
      message:" Students found",
      success:true
    })
  }