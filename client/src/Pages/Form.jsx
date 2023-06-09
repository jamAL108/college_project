import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Form.css';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
const Form = (props) => {

    const navigate = useNavigate();
    const [formdata , setformdata] =useState({
        fullName:"",
        rollNumber:props.rollno || "",
        classValue:"",
        passedOutYear:"",
        postalAddress:"",
        email:"",
        semester:"",
        phone:"",
        date:new Date(),
        feeReceiptNumber:"",
        amount:"",
        isConfirmed:false,
        areYouPlaced:false,
        offerLetter:null,
        letterOfJoining:null
    });
    // const [fullName, setFullName] = useState('');
    // const [rollNumber, setRollNumber] = useState(props.rollno || '');
    // const [classValue, setClassValue] = useState('');
    // const [passedOutYear, setPassedOutYear] = useState('');
    // const [postalAddress, setPostalAddress] = useState('');
    // const [email, setEmail] = useState('');
    // const [semester, setSemester] = useState('');
    // const [phone, setPhone] = useState('');
    // const [date, setDate] = useState(new Date());
    // const [feeReceiptNumber, setFeeReceiptNumber] = useState('');
    // const [amount, setAmount] = useState('');
    // const [isConfirmed, setIsConfirmed] = useState(false);

    // const [areYouPlaced, setAreYouPlaced] = useState(false);
    // const [offerLetter, setOfferLetter] = useState(null);
    // const [letterOfJoining, setLetterOfJoining] = useState(null);

    // const [DATA, setDATA] = useState({});
    const [DATA , setDATA] = useState({});
    useEffect(() => {
        const storedRollNumber = localStorage.getItem('rollno');
        const storedPassword = localStorage.getItem('password');
        const expirationDate = new Date(localStorage.getItem('expirationDate'));

        if (storedRollNumber && storedPassword && expirationDate > new Date()) {
            setformdata({...formdata , rollNumber:storedRollNumber});
            getStudent(storedRollNumber);
        } else {
            // Clear the stored values if expired or not present
            localStorage.removeItem('rollno');
            localStorage.removeItem('password');
            localStorage.removeItem('expirationDate');
            navigate('/');
        }
        // eslint-disable-next-line 
    }, []);


    const getStudent = async (roll) => {
        const response = await fetch('http://localhost:5000/student/getStudent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ rollNumber: formdata.rollNumber })
        });

        if (response.ok) {
            const student = await response.json();
            setDATA(student);

            // Check if stored password matches fetched student data password
            const storedPassword = localStorage.getItem('password');
            if (storedPassword === student.password) {
                console.log("Good")
            } else {
                navigate('/logout');
                return;
            }
        } else {
            const errorResponse = await response.json();
            console.log(errorResponse);
        }
    };



    const handleSubmit = (e) => {

        const storedRollNumber = localStorage.getItem('rollno');
        const storedPassword = localStorage.getItem('password');
        const expirationDate = new Date(localStorage.getItem('expirationDate'));

        if (storedRollNumber && storedPassword && expirationDate > new Date()) {
            setformdata({...formdata , rollNumber:storedRollNumber});
            console.log(storedRollNumber)



        } else {
            // Clear the stored values if expired or not present
            localStorage.removeItem('rollno');
            localStorage.removeItem('password');
            localStorage.removeItem('expirationDate');

            navigate('/');
        }

        e.preventDefault();
        if (formdata.isConfirmed) {
            // On Submit
        } else {
            setformdata({...formdata , isConfirmed:true});
        }
    };

    const handleEdit = () => {
        setformdata({...formdata , isConfirmed:false});
    };

    const applyform = async()=>{
        const response = await fetch('http://localhost:5000/student/applyform', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formdata)
        });
        console.log(response.message);
    }

    return (
        <>
            <Nav />
            <div className='formpage'>
                <h2 className='form-title'>No Dues Form</h2>
                <form className="studentform" onSubmit={handleSubmit}>
                    {formdata.isConfirmed ? (
                        <>
                            <ConfirmationDetails
                                 {...formdata}
                            />
                            <div className="form-buttons">
                                <button type="button" className="form-button" onClick={handleEdit}>Edit</button>
                                <button type="submit" className="form-button submitBtn" onClick={(e)=>{
                                    e.preventDefault();
                                    applyform();
                                }} >Confirm & Submit</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <label htmlFor="rollNumber" className=".textlabel form-label">
                                Roll Number:
                                <input
                                    type="text"
                                    id="rollNumber"
                                    className="form-input"
                                    value={formdata.rollNumber}
                                    onChange={(e) =>{
                                        setformdata({...formdata , rollNumber:e.target.value})
                                    }}
                                    required
                                />
                            </label>

                            <label htmlFor="fullName" className=".textlabel form-label">
                                Full Name:
                                <input
                                    type="text"
                                    id="fullName"
                                    className="form-input"
                                    value={formdata.fullName}
                                    onChange={(e) =>{
                                        setformdata({...formdata , fullName:e.target.value})
                                    }}
                                    required
                                />
                            </label>


                            <label htmlFor="classValue" className=".textlabel form-label">
                                Class:
                                <input
                                    type="text"
                                    id="classValue"
                                    className="form-input"
                                    value={formdata.classValue}
                                    onChange={(e) =>{
                                        setformdata({...formdata , classValue:e.target.value})
                                    }}
                                    required
                                />
                            </label>

                            <label htmlFor="passedOutYear" className=".textlabel form-label">
                                Passed Out Year:
                                <input
                                    type="text"
                                    id="passedOutYear"
                                    className="form-input"
                                    value={formdata.passedOutYear}
                                    onChange={(e) =>{
                                        setformdata({...formdata , passedOutYear:e.target.value})
                                    }}
                                    required
                                />
                            </label>

                            <label htmlFor="postalAddress" className=".textlabel form-label">
                                Postal Address:
                                <input
                                    type="text"
                                    id="postalAddress"
                                    className="form-input"
                                    value={formdata.postalAddress}
                                    onChange={(e) =>{
                                        setformdata({...formdata , postalAddress:e.target.value})
                                    }}
                                    required
                                />
                            </label>

                            <label htmlFor="email" className=".textlabel form-label">
                                Email ID:
                                <input
                                    type="email"
                                    id="email"
                                    className="form-input"
                                    value={formdata.email}
                                    onChange={(e) =>{
                                        setformdata({...formdata , email:e.target.value})
                                    }}
                                    required
                                />
                            </label>

                            <label htmlFor="semester" className=".textlabel form-label">
                                Semester:
                                <input
                                    type="text"
                                    id="semester"
                                    className="form-input"
                                    value={formdata.semester}
                                    onChange={(e) =>{
                                        setformdata({...formdata , semester:e.target.value})
                                    }}
                                    required
                                />
                            </label>

                            <label htmlFor="phone" className=".textlabel form-label">
                                Phone:
                                <input
                                    type="text"
                                    id="phone"
                                    className="form-input"
                                    value={formdata.phone}
                                    onChange={(e) =>{
                                        setformdata({...formdata , phone:e.target.value})
                                    }}
                                    required
                                />
                            </label>

                            <label htmlFor="date" className=".textlabel form-label">
                                Date:
                                <DatePicker
                                    id="date"
                                    className="form-input"
                                    selected={formdata.date}
                                    onChange={(date) => {
                                        setformdata({...formdata , date:date});
                                    }}
                                    placeholderText="DD/MM/YYYY"
                                    dateFormat="dd/MM/yyyy"
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                />
                            </label>

                            <label htmlFor="feeReceiptNumber" className=".textlabel form-label">
                                Fee Receipt Number:
                                <input
                                    type="text"
                                    id="feeReceiptNumber"
                                    className="form-input"
                                    value={formdata.feeReceiptNumber}
                                    onChange={(e) =>{
                                        setformdata({...formdata , feeReceiptNumber:e.target.value})
                                    }}
                                    required
                                />
                            </label>

                            <label htmlFor="amount" className=".textlabel form-label">
                                Amount:
                                <input
                                    type="text"
                                    id="amount"
                                    className="form-input"
                                    value={formdata.amount}
                                    onChange={(e) =>{
                                        setformdata({...formdata , amount:e.target.value})
                                    }}
                                    required
                                />
                            </label>

                            <label htmlFor="areYouPlaced" className="placed form-label">
                                Are you placed?

                                <label className="checkbox-btn">
                                    <label htmlFor="checkbox"></label>
                                    <input
                                        type="checkbox"
                                        id="areYouPlaced"
                                        checked={formdata.areYouPlaced}
                                        required
                                        onChange={(e) =>{
                                            setformdata({...formdata ,areYouPlaced :e.target.value})
                                        }} />

                                    <span className="checkmark"></span>
                                </label>
                            </label>

                            {formdata.areYouPlaced && (
                                <>
                                    <label htmlFor="offerLetter" className="textlabel form-label">
                                        Offer Letter:
                                        <input
                                            type="file"
                                            id="offerLetter"
                                            className="form-input"
                                            required
                                            onChange={(e) =>{
                                                setformdata({...formdata , offerLetter:e.target.value})
                                            }}
                                        />
                                    </label>

                                    <label htmlFor="letterOfJoining" className="textlabel form-label">
                                        Letter of Joining:
                                        <input
                                            type="file"
                                            id="letterOfJoining"
                                            className="form-input"
                                            required
                                            onChange={(e) =>{
                                                setformdata({...formdata , letterOfJoining:e.target.value})
                                            }}
                                        />
                                    </label>
                                </>
                            )}

                            <button type="button" className="form-button" onClick={handleSubmit}>Next</button>
                        </>
                    )}
                </form>
            </div>
        </>
    );
};

const ConfirmationDetails = (props) => {
    const data = props;
    console.log(data);
    return (
        <div className="confirmation-details">
            <h2>Please review your details:</h2>
            <p>Full Name: <strong>{data.fullName}</strong></p>
            <p>Roll Number: <strong>{data.rollNumber}</strong></p>
            <p>Class: <strong>{data.classValue}</strong></p>
            <p>Passed Out Year: <strong>{data.passedOutYear}</strong></p>
            <p>Postal Address: <strong>{data.postalAddress}</strong></p>
            <p>Email ID: <strong>{data.email}</strong></p>
            <p>Semester: <strong>{data.semester}</strong></p>
            <p>Phone: <strong>{data.phone}</strong></p>
            {/* <p>Date: <strong>{data.date.toLocaleDateString()}</strong></p> */}
            <p>Fee Receipt Number: <strong>{data.feeReceiptNumber}</strong></p>
            <p>Amount: <strong>{data.amount}</strong></p>
            <p>Are you placed? <strong>{data.areYouPlaced ? 'Yes' : 'No'}</strong></p> {/* Display the value of areYouPlaced */}
            {data.areYouPlaced && (
                <>
                    <p>
                        Offer Letter: <strong>{data.offerLetter ? data.offerLetter.name : ''}</strong>
                    </p>
                    <p>
                        Letter of Joining:{' '}
                        <strong>{data.letterOfJoining ? data.letterOfJoining.name : ''}</strong>
                    </p>
                </>
            )}
        </div>
    );
};

export default Form;