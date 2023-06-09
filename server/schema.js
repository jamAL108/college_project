const mongoose = require('mongoose');

// Define the schema
const studentSchema = new mongoose.Schema({
    rollNumber: {
        type: String,
        required : true,
        trim: true
    },
    fullName: {
        type: String,
        trim: true
    },
    classValue: {
        type: String,
        trim: true
    },
    passedOutYear: {
        type: String,
        trim: true
    },
    postalAddress: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    semester: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
    },
    feeReceiptNumber: {
        type: String,
        trim: true
    },
    amount: {
        type: String,
        trim: true
    },
    areYouPlaced: {
        type: Boolean,
    },
    offerLetter: {
        type: String,
    },
    letterOfJoining: {
        type: String,
    },
    isFilled: {
        type: Boolean,
        default: false
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        default: 'dypatil@123'
    }
});

// Define the model
const Student = mongoose.model('student', studentSchema);


const request = new mongoose.Schema({
    student:{
        type: Schema.Types.ObjectId,
        ref: "student",
    },
    nodes:{
        type:[Boolean]
    },
    alldone:{
        type:Boolean
    }
})

// Define the model
const requests = mongoose.model('request', request);








////// faculty
const faculty = new mongoose.Schema({
    email:{
        type:Stirng,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    index:{
        type:Number,
        required:true
    }
})

const Faculty = mongoose.model('faculty', faculty);



module.exports = requests;
module.exports = Faculty;
module.exports = Student;




