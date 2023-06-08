import mongoose from "mongoose";
const student = mongoose.Schema({
    rollno:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

export default mongoose.model("Student",student);