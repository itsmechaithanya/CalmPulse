import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import imggg from '../assets/247ade28c862c6b10881b9307e6df568.png';
import { db } from './firebase'; // Firestore instance
import { setDoc, doc } from "firebase/firestore"; // Firestore functions

function Details() {
  const navigate = useNavigate(); 

  // State for form inputs
  const [username, setUsername] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission and store data in Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    
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
      navigate('/home', { state: { userId } }); // Pass the email as userId to Home

    } catch (error) {
      console.error("Error adding details to Firestore: ", error);
    }
  };

  return (
    <div className='h-[100vh] w-[100vw] bg-[#7A4BC8]'>
        <img className='h-[20vh] absolute -top-[5vh] -right-[0.5vw]' src={imggg} alt="" />
        <div className='flex justify-center pt-[15vh]'> {/* Increased padding-top */}
            <h1 className='text-white text-[3vh] font-semibold'>Users Details Form</h1>
        </div>
        <form className='flex flex-col gap-[2vh] mx-[5vw] justify-center mt-[3vh]' onSubmit={handleSubmit}> {/* Decreased margin-top */}
            <input 
              className='py-[2vh] px-[3vw] rounded-[5vh]' 
              type="text" 
              placeholder='Username' 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
            <input 
              className='py-[2vh] px-[3vw] rounded-[5vh] text-[#9CA3AF] uppercase' 
              type="date" 
              placeholder='Date' 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required 
            />
            <div className='flex justify-evenly bg-white rounded-[5vh]'>
                <h1 className='text-[2vh] text-[#9CA3AF] py-[2vh] px-[3vw]'>
                    <input 
                      name='Gender' 
                      type="radio" 
                      value="Male" 
                      onChange={() => setGender("Male")} 
                      required 
                    /> Male
                </h1>
                <h1 className='text-[2vh] text-[#9CA3AF] py-[2vh] px-[3vw]'>
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
              className='py-[2vh] px-[3vw] rounded-[5vh]' 
              type="number" 
              placeholder='Phone Number' 
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required 
            />
            <input 
              className='py-[2vh] px-[3vw] rounded-[5vh]' 
              type="email" 
              placeholder='Email' 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <input 
              className='py-[2vh] px-[3vw] rounded-[5vh]' 
              type="password" 
              placeholder='Password' 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <button className='bg-black text-white px-[5vw] py-[2.5vh] mt-[6vh] rounded-[5vh] shadow' type="submit">Submit</button>
        </form>
    </div>
  );
}

export default Details;
