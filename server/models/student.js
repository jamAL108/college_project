import mongoose from "mongoose";
const student = mongoose.Schema({
    rollno:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    }
});

export default mongoose.model("Student",student);