const router = require("./api");

exports.loginTest = (req, res) => {
    console.log("test")
}
// exports.login =  (req, res) => {
//     console.log("fuck this")
// }
    // console.log(`Logging in using ${req.email}, and ${req.password}`)
//   try {
//     console.log(students)
    
//     } catch (error) {
//       return res.status(400).json({
//         error: true,
//         message: `Error getting students from database: ${error}`,
//       });
//     }
//     return res.status(200).json({
//       message:"Students found",
//       success:true
//     })
// }