import Student from "../models/student.js";
import bcrypt from "bcryptjs";
import Studentdetails from '../models/studentdetails,js';
export const Login = async(req,res)=>{
     const errors = {passwordError:String , backendError:String};
     try{
        const data = req.body;
        const check = await Student.findOne({rollno:data.rollno});
        if(!check){
            // ?? dont have enough details
        }else{
             /// check with password......
            /// and proceed ahead
            const passwordcorrect = await bcrypt.compare(password , data.password);
            if(!passwordcorrect){
                errors.passwordError="Invalid credentials";
                return res.status(404).send({error:errors});
            }
            const userdata = await Studentdetails.findOne({student:check._id});
            return res.status(200).send({message:"success" , userdata});

        }
     }catch(err){
        errors.backendError=err;
        console.log(err);
        return res.status(404).send({error:errors});
     }
}


export const Formapply = async(req,res)=>{
    const errors = {nodata:String , backendError:String};
    try{ 
        const data = req.body;
        if(!data){
            errors.nodata="form data missing";
            return res.status(404).send({error:errors});
        }
        const newform = new Studentdetails(data);
        await newform.save();
        //// generate nodes for the student
        return res.status(200).send({message:"form submitted"});
    }catch(err){
        errors.backendError=err;
        console.log(err);
        return res.status(404).send({error:errors});
    }
};