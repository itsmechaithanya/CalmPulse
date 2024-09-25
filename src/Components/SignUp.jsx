import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import imgg from '../assets/b08f403ff43bbe883c702ab13eccb016.png';
import imggg from '../assets/247ade28c862c6b10881b9307e6df568.png';
import { FcGoogle } from "react-icons/fc";
import { auth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, db } from './firebase';
import { setDoc, doc } from "firebase/firestore";
import { toast } from 'react-toastify'; // Assuming you're using toast for success messages

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Use navigate to redirect

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Register user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        console.log('User object:', user); 

        // Add user to Firestore database
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          username: name,  
          phonenumber: phoneNumber, 
        });

        console.log("User registered successfully with Firestore:", { name, phoneNumber, email });

        // Redirect to login page after successful registration
        navigate('/login');
      }

    } catch (error) {
      setError(error.message);
      console.log("Registration Error: ", error.message);
      toast.error(error.message, {
        position: "bottom-center"
      });
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      // Sign up user with Google
      await signInWithPopup(auth, provider);
      console.log("User signed up with Google!");
    } catch (error) {
      setError(error.message);
      console.log("Google Sign-up Error: ", error.message);
    }
  };

  return (
    <div className='h-[100vh] w-[100vw] bg-[#7A4BC8] overflow-hidden relative'>
      <img className='h-[20vh] absolute -top-[5vh] -right-[1vh]' src={imggg} alt="" />
      <h1 className='text-white text-[4vh] font-semibold flex justify-center pt-[5vh]'>Sign Up</h1>
      <div className='flex flex-col justify-center mt-[2vh] items-center'>
        <button onClick={handleGoogleSignUp} className='text-white bg-black px-[4vh] flex justify-center items-center py-[2.5vh] rounded-[5vh] gap-[1.5vh] shadow'>
          <FcGoogle size={"4vh"} />Sign up with Google
        </button>
      </div>
      <div className='flex justify-center mt-[1vh]'>
        <h1 className='capitalize text-[2vh]'>Or continue with Email</h1>
      </div>
      <div className='flex flex-col gap-[2vh] mx-[2.5vh] justify-center mt-[3vh]'>
        <input
          className='py-[2vh] px-[3.5vh] rounded-[5vh] text-[2vh]'
          type="text"
          placeholder='Enter Your Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className='py-[2vh] px-[3.5vh] rounded-[5vh] text-[2vh]'
          type="text"
          placeholder='Enter Your Phone number'
          value={phoneNumber}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          className='py-[2vh] px-[3.5vh] rounded-[5vh] text-[2vh]'
          type="email"
          placeholder='Enter Your Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className='py-[2vh] px-[3.5vh] rounded-[5vh] text-[2vh]'
          type="password"
          placeholder='Enter Your Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className='flex items-center px-[1.5vh] mt-[2vh]'>
        <input className='h-[2.5vh] w-[2.5vh] ml-[2vh] mr-[2.5vh] bg-red-900 shadow' type="checkbox" />
        <h1 className='text-white capitalize text-[1.8vh]'>I agree with the Terms of Service and Privacy policy</h1>
      </div>
      <div className='flex justify-end mt-[2vh] mr-[10vh]'>
        <button onClick={handleRegister} className='bg-black text-white px-[4vh] py-[2.5vh] rounded-[5vh] shadow absolute right-[2vh] mt-[-1.5vh] z-10 text-[2vh]'>
          Create Account
        </button>
      </div>
      <div className='absolute right-[1vh] bottom-[5vh] z-10'>
        <Link to="/login">
          <h1 className='text-white capitalize mb-[-5.5vh] text-[2vh]'>Already have an account?</h1>
          <button className='ml-[3vh] mt-[6vh] bg-black text-white px-[8vh] py-[2.5vh] rounded-[5vh] shadow text-[2vh]'>Log In</button>
        </Link>
      </div>
      <img className='absolute -bottom-[10vh] -left-[9.5vh] h-[37vh]' src={imgg} alt="" />
    </div>
  );
}

export default SignUp;
