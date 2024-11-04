import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import imggg from '../assets/247ade28c862c6b10881b9307e6df568.png';
import { db } from './firebase'; // Firestore instance
import { setDoc, doc } from "firebase/firestore"; // Firestore functions
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Details() {
  const navigate = useNavigate(); 

  // State for form inputs
  const [username, setUsername] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Validation function
  const validateForm = () => {
    let isValid = true;

    if (!username.trim()) {
      toast.error("Username is required");
      isValid = false;
    }

    if (!date) {
      toast.error("Date is required");
      isValid = false;
    }

    if (!gender) {
      toast.error("Gender is required");
      isValid = false;
    }

    if (!phoneNumber.trim()) {
      toast.error("Phone number is required");
      isValid = false;
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      toast.error("Phone number must be 10 digits");
      isValid = false;
    }

    if (!email.trim()) {
      toast.error("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Email is invalid");
      isValid = false;
    }

    if (!password.trim()) {
      toast.error("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      isValid = false;
    }

    return isValid;
  };

  // Handle form submission and store data in Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const userId = email; // Use email as a document ID
      // Save details in the "details" collection
      await setDoc(doc(db, "details", userId), {
        username,
        date,
        gender,
        phoneNumber,
        email,
        password,
      });

      console.log("Details added to Firestore successfully");
      toast.success("Details submitted successfully!");
      navigate('/home', { state: { userId } }); // Pass the email as userId to Home

    } catch (error) {
      console.error("Error adding details to Firestore: ", error);
      toast.error("Error submitting details. Please try again.");
    }
  };

  return (
    <div className='h-screen w-screen bg-[#7D3D89]'>
        <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        <img className='h-[20vh] absolute -top-[5vh] -right-2' src={imggg} alt="" />
        <div className='flex justify-center pt-[10vh]'>
            <h1 className='text-white text-[3vh] font-semibold'>Users Details Form</h1>
        </div>
        <form className='flex flex-col gap-5 ml-5 mr-5 justify-center mt-10' onSubmit={handleSubmit}>
            <input 
              className='py-4 px-7 rounded-full' 
              type="text" 
              placeholder='Username' 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
            <input 
              className='py-4 px-7 rounded-full text-[#9CA3AF] uppercase' 
              type="date" 
              placeholder='Date' 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required 
            />
            <div className='flex justify-evenly bg-white rounded-full'>
                <h1 className='text-md text-[#9CA3AF] py-4 px-7'>
                    <input 
                      name='Gender' 
                      type="radio" 
                      value="Male" 
                      onChange={() => setGender("Male")} 
                      required 
                    /> Male
                </h1>
                <h1 className='text-md text-[#9CA3AF] py-4 px-7'>
                    <input 
                      name='Gender' 
                      type="radio" 
                      value="Female" 
                      onChange={() => setGender("Female")} 
                      required 
                    /> Female
                </h1>
            </div>
            <input 
              className='py-4 px-7 rounded-full' 
              type="tel" 
              placeholder='Phone Number' 
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required 
              pattern="[0-9]{10}"
            />
            <input 
              className='py-4 px-7 rounded-full' 
              type="email" 
              placeholder='Email' 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <input 
              className='py-4 px-7 rounded-full' 
              type="password" 
              placeholder='Password' 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              minLength="6"
            />
            <button 
              className='bg-black text-white px-10 py-5 mt-20 rounded-full shadow' 
              type="submit"
            >
              Submit
            </button>
        </form>
    </div>
  );
}

export default Details;
