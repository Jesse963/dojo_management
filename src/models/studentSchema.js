const mongoose = require("mongoose");
const { array } = require("yargs");
const Schema = mongoose.schema

let StudentSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    dob:{
        type: String,
        required: true,
    },
    grade:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    }
})

const Student = mongoose.model("students", StudentSchema)
module.exports = Student