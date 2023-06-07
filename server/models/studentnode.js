import mongoose from "mongoose";
const studentnode = mongoose.Schema({
    student:{
        type: Schema.Types.ObjectId,
        ref: "Student",
    },
    alldone:{
        type:Boolean,
        default:false
    },
    
});   
export default mongoose.model("Studentnode",studentnode);