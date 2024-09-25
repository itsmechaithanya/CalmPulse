import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import imgg from '../assets/b08f403ff43bbe883c702ab13eccb016.png';
import imggg from '../assets/247ade28c862c6b10881b9307e6df568.png';
import imgggg from '../assets/iPhone 13/reflecting 1.png';
import { FcGoogle } from "react-icons/fc";
import { auth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from './firebase'; 

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  // Handle Login with Email and Password
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
      navigate('/home', { state: { email: userCredential.user.email } }); // Pass email after login
    } catch (error) {
      setError(error.message);
      console.log('Login Error:', error.message);
    }
  };

  // Handle Google Login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('User signed in with Google:', result.user);
      navigate('/home', { state: { email: result.user.email } }); // Pass email after Google login success
    } catch (error) {
      setError(error.message);
      console.log('Google Login Error:', error.message);
    }
  };

  return (
    <div className='h-[100vh] w-[100vw] bg-[#7A4BC8] overflow-hidden relative'>
      <img className='h-[20vh] absolute -top-[5vh] -right-[0.5vh]' src={imggg} alt="" />
      <h1 className='text-white text-[4vh] font-semibold flex justify-center pt-[10vh]'>Log In</h1>
      
      {/* Google Login Button */}
      <div className='flex flex-col justify-center mt-[3vh] items-center'>
        <button onClick={handleGoogleLogin} className='text-white bg-black px-[4vh] flex justify-center items-center py-[2.5vh] rounded-[5vh] gap-[1.5vh] shadow'>
          <FcGoogle size={"1.5em"} />Log In with Google
        </button>
      </div>
      
      <div className='flex justify-center mt-[1vh]'>
        <h1 className='capitalize'>Or log in with Email</h1>
      </div>
      
      {/* Form for Email/Password */}
      <form onSubmit={handleLogin}>
        <div className='flex flex-col gap-[2.5vh] mx-[2.5vh] justify-center mt-[5vh]'>
          <input
            className='py-[2vh] px-[3.5vh] rounded-[5vh]'
            type="text"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className='py-[2vh] px-[3.5vh] rounded-[5vh]'
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className='flex justify-end mr-[2.5vh] text-white'>
            <a href="#">Forgot?</a>
          </div>
        </div>

        {/* Error Message */}
        {error && <div className='text-red-500 text-center mt-[1vh]'>{error}</div>}

        <div className='flex justify-center mt-[2.5vh]'>
          <button type="submit" className='bg-black text-white px-[8vh] py-[2vh] rounded-[5vh] shadow'>Log In</button>
        </div>
      </form>
      
      <div className='mt-[6vh] ml-[3vh] absolute z-10'>
        <h1 className='capitalize text-white mb-[1.5vh]'>
          Don't have an account?
        </h1>
        <Link to="/signup">
          <button className='bg-black text-white px-[5vh] py-[2.5vh] ml-[2vh] rounded-[5vh] shadow'>Sign Up</button>
        </Link>
      </div>

      <img className='absolute bottom-0 right-0 h-[35vh]' src={imgggg} alt="" />   
    </div>
  );
}

export default LoginPage;
