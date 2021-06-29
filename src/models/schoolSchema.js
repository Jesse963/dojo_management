const mongoose = require("mongoose");

let SchoolSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required: true,
    },
    classTypes:{
        type: Array,
        required: false,
    },
    grades:{
        type: Array,
        required: false,
    },
    schoolID:{
        type:String,
        required:true
    }
},
    {
        timestamps: {
          createdAt: "createdAt",
          updatedAt: "updatedAt",
        },
      }
)

const School = mongoose.model("Schools", SchoolSchema)
module.exports = School