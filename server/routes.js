const express = require("express");
// const mongoose = require("mongoose");
const router = express.Router();
const cors = require("cors");
const Faculty = require("./schema");
const Student = require('./schema');
const Request = require("./schema");
router.use(cors());
router.post('/student/login', async (req, res) => {
    try {
        const { rollNumber, password } = req.body;

        // Check if user exists
        const student = await Student.findOne({ rollNumber });

        if (!student) {
            // Roll number does not exist, create a new student record with the default password and empty fields
            const newStudent = new Student({
                rollNumber,
                password: 'dypatil@123',
                fullName: '',
                classValue: '',
                passedOutYear: '',
                postalAddress: '',
                email: '',
                semester: '',
                phone: '',
                date: null,
                feeReceiptNumber: '',
                amount: '',
                areYouPlaced: false,
                offerLetter: '',
                letterOfJoining: '',
                isFilled: false,
                isCompleted: false
            });

            await newStudent.save();
            res.json({ authenticated: true, created: true }); // Authentication successful and a new student record is created
        } else {
            // Roll number exists, check the password
            if (student.password === password) {
                res.json({ authenticated: true, created: false }); // Authentication successful
            } else {
                res.json({ authenticated: false }); // Authentication failed
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/student/getStudent',async (req, res) => {
    const { rollNumber } = req.body;

    const student = await Student.findOne({ rollNumber });

    if(!student) res.status(401).json({ message : "Student not found"})
    else res.status(200).json(student);
    
})

router.post('/student/applyform', async (req, res) => {
    try {
      const data = req.body;
  
      const student = await Student.findOne({rollNumber:data.rollNumber});
  
      if (!student) {
        res.status(404).json({ message: 'Student not found' });
        return;
      }
  
      student.fullName = data.fullName;
      student.classValue = data.classValue;
      student.passedOutYear = data.passedOutYear;
      student.postalAddress = data.postalAddress;
      student.email = data.email;
      student.semester = data.semester;
      student.phone = data.phone;
      student.date = data.date;
      student.feeReceiptNumber = data.feeReceiptNumber;
      student.amount = data.amount;
      student.areYouPlaced = data.areYouPlaced;
      student.offerLetter = data.offerLetter;
      student.letterOfJoining = data.letterOfJoining;
      student.isFilled = true;
      let array = new Array(21).fill(false);   //ignore zero index
      console.log(array);
      const newrequest = new Request({
        student:student._id,
        nodes:array,
        alldone:false
      })
      await newrequest.save();
      console.log(student);
      res.status(200).json({ message: 'Form submitted successfully' , newrequest , student });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });



  router.post("/student/check" , async(req,res)=>{
    try{
       const data = req.body;
       const request = await Request.findOne({student:data._id});
       let done =false;
       for(var i=1;i<request.nodes.length;i++){
            if(request.nodes[i]===false){
                done=true;
                break;
            }
       }
       if(done===false){
          request.alldone=true;
       }
       await request.save();
       return res.status(200).json({message:"take nodes" , request});
    }catch(err){
      console.log(err);
      res.status(404).json({ error: 'Internal server error' });
    }
  });





































  ///// faculty

  router.post("/faculty/login" , async(req,res)=>{
     try{
        const {email,password} = req.body;
        const user = await Faculty.findOne({email});
        if(!user){
            return res.status(404).json({error:"email doesn't exists"});
        }
        if(user.password !== password){
            return res.status(404).json({error:"invalid credentials"});
        }
        return res.status(200).json({message:"login success" , user})
     }catch(err){
        console.log(err);
        return res.status(404).json({error:"internal server error"})
     }
  });
  
  router.post("/faculty/getrequest" , async(req,res)=>{
    try{
       const data = req.body;
       const students = await Student.find({});
       let request =[];
       if(students.length!==0){
       for(var i=0;i<students.length;i++){
            const node = await Request.findOne({student:students[i]._id});
          if(students[i].nodes[data.index]===false){
              const stud ={
                  _id:students[i]._id,
                  rollNumber:students[i].rollNumber,
                  fullName:students[i].fullName,
                  status:node.nodes[data.index]
              }
              request.push(stud);
          }
       }
    }
       return res.status(200).json({message:"take request" , request});
    }catch(err){
        console.log(err);
        return res.status(404).json({error:"internal server error"})
    }
  });

  router.post("/faculty/update" , async(req,res)=>{
     try{
        const data = req.body;
        const update = await Request.findOne({student:data._id});
        update.nodes[data.index]=data.status;
        await update.save();
        return res.status(200).json({message:"updated"});
     }catch(err){
        console.log(err);
        return res.status(404).json({error:"internal server error"})
     }
  });



module.exports = router;
