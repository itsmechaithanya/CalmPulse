import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import imgg from '../assets/b08f403ff43bbe883c702ab13eccb016.png';
import imggg from '../assets/247ade28c862c6b10881b9307e6df568.png';
import { FcGoogle } from "react-icons/fc";
import { auth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, db } from './firebase';
import { setDoc, doc } from "firebase/firestore";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [error, setError] = useState("");

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
        toast.success("User Registered Successfully!!",{
          position: "top-center",
        });
      }

    } catch (error) {
      setError(error.message);
      console.log("Registration Error: ", error.message);
      toast.success(error.message,{
        position: "bottom-center"
      })
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
    <div className='h-screen w-screen bg-[#7A4BC8] overflow-hidden relative'>
      <img className='h-[20vh] absolute -top-[5vh] -right-2' src={imggg} alt="" />
      <h1 className='text-white text-3xl font-semibold flex justify-center pt-[10vh]'>Sign Up</h1>
      <div className='flex flex-col justify-center mt-[3vh] items-center'>
        <button onClick={handleGoogleSignUp} className='text-white bg-black px-8 flex justify-center items-center py-5 rounded-full gap-3 shadow'>
          <FcGoogle size={"1.5em"} />Sign up with Google
        </button>
      </div>
      <div className='flex justify-center mt-2'>
        <h1 className=' capitalize'>Or continue with Email</h1>
      </div>
      <div className='flex flex-col gap-5 ml-5 mr-5 justify-center mt-10'>
        <input
          className='py-4 px-7 rounded-full'
          type="text"
          placeholder='Enter Your Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className='py-4 px-7 rounded-full'
          type="text"
          placeholder='Enter Your Phone number'
          value={phoneNumber}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          className='py-4 px-7 rounded-full'
          type="email"
          placeholder='Enter Your Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className='py-4 px-7 rounded-full'
          type="password"
          placeholder='Enter Your Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className='flex items-center px-3 mt-5'>
        <input className='h-5 w-5 ml-4 mr-5 bg-red-900 shadow' type="checkbox" />
        <h1 className='text-white capitalize'>I agree with the Terms of Service and Privacy policy</h1>
      </div>
      <div className='flex justify-end mt-5 mr-20 '>
        <button onClick={handleRegister} className='bg-black text-white px-8 py-5 rounded-full shadow absolute right-10 mt-8 z-10'>
          Create Account
        </button>
      </div>
      <div className='absolute right-2 bottom-5 z-10'>
        <Link to="/login">
          <h1 className='text-white capitalize mb-3'>Already have an account?</h1>
          <button className='ml-5 bg-black text-white px-16 py-5 rounded-full shadow'>Log In</button>
        </Link>
      </div>
      <img className='absolute -bottom-[30vh] -left-[11vh] h-[60vh]' src={imgg} alt="" />
    </div>
  );
}

export default SignUp;
