const mongoose = require("mongoose");

let AttendanceSchema = mongoose.Schema({
    school:{
        type:String,
        required:true
    },
    date:{
        type: String,
        required: true,
    },
    classType:{
        type: String,
        required: false,
    },
    attendees:{
        type: Array,
        required: true,
    },
})

const Attendance = mongoose.model("attendances", AttendanceSchema)
module.exports = Attendance