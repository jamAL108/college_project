import mongoose from "mongoose";
const studentdetails = mongoose.Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: "Student",
    },
   name:{
    type:String,
    required:true
   },
   email:{
      type:String,
      required:true
   },
   depart:{
    type:String,
    required:true
   },
   address:{
    type:String,
    required:true
   },
    class:{
    type:String,
    required:true
   },
   passedmonth:{
    type:String,
    required:true
   },
   passedyear:{
    type:String,
    required:true
   },
   currentsem:{
   type:Number,
   required:true
   },   
   feereceipt:{
    type:String,
    required:true
   },
   seatno:{
    type:Number,
    required:true
   },
   placed:{
    type:Boolean,
    required:true
   },
    iscompleted:{
    type:Boolean,
    required:true
   },
});

export default mongoose.model("Studentdetails",studentdetails);