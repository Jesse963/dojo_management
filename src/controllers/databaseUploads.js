const Student = require("../models/studentSchema");

exports.submitStudent = async (req, res) => {
try {
    const newStudent = req.body;
    console.log(`New Student: ${newStudent}`)
    const studentExists = await Dojo.find({ name: newStudent.name });

    if (newStudent.length > 0) {
      return res.status(422).json({
        errors: true,
        message: "Student with this name already exists in the database",
      });
    }
    // --------Password not required for students at the moment----------
    // const hashPassword = async (password) => {
    //   try {
    //     const salt = await bcrypt.genSalt(10);
    //     return await bcrypt.hash(password, salt);
    //   } catch (error) {
    //     throw new Error("Hashing failed", error);
    //   }
    // };

    // let hash = await hashPassword(dojo.password);

    const studentEntry = new Student({
        name: newStudent.name,
        dob: newStudent.dob,
        grade: newStudent.grade,
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
  return res.status(200).json({
    success: true,
    message: `Add of ${req.body.name} successful`,
  });
}