import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import imgg from '../assets/b08f403ff43bbe883c702ab13eccb016.png';
import imggg from '../assets/247ade28c862c6b10881b9307e6df568.png';
import imgggg from '../assets/iPhone 13/reflecting 1.png';
import { FcGoogle } from "react-icons/fc";
import { auth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from './firebase'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation function (min 6 characters)
  const validatePassword = (password) => {
    return password.length >= 6;
  };

  // Handle Login with Email and Password
  const handleLogin = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!email.trim()) {
      toast.error('Email is required');
      return;
    }
    if (!validateEmail(email)) {
      toast.error('Invalid email format');
      return;
    }
    if (!password.trim()) {
      toast.error('Password is required');
      return;
    }
    if (!validatePassword(password)) {
      toast.error('Password should be at least 6 characters');
      return;
    }

    try {
      console.log("Handle login is triggered");
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
      toast.success('Login successful!');
      navigate('/home'); // Redirect to /home after successful login
    } catch (error) {
      toast.error('Incorrect email or password');
      console.log('Login Error:', error.message);
    }
  };

  // Handle Google Login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('User signed in with Google:', result.user);
      toast.success('Google login successful!');
      navigate('/home'); // Redirect to /home after Google login success
    } catch (error) {
      toast.error(error.message);
      console.log('Google Login Error:', error.message);
    }
  };

  return (
    <div className='h-screen w-screen bg-[#7A4BC8] overflow-hidden relative'>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <img className='h-[20vh] absolute -top-[5vh] -right-2' src={imggg} alt="" />
      <h1 className='text-white text-3xl font-semibold flex justify-center pt-[10vh]'>Log In</h1>
      
      {/* Google Login Button */}
      <div className='flex flex-col justify-center mt-[3vh] items-center'>
        <button onClick={handleGoogleLogin} className='text-white bg-black px-8 flex justify-center items-center py-5 rounded-full gap-3 shadow'>
          <FcGoogle size={"1.5em"} />Log In with Google
        </button>
      </div>
      
      <div className='flex justify-center mt-2'>
        <h1 className='capitalize'>Or log in with Email</h1>
      </div>
      
      {/* Form for Email/Password */}
      <form onSubmit={handleLogin}>
        <div className='flex flex-col gap-5 ml-5 mr-5 justify-center mt-10'>
          <input
            className='py-4 px-7 rounded-full'
            type="text"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required // Making the field required
          />
          <input
            className='py-4 px-7 rounded-full'
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required // Making the field required
          />
          <div className='flex justify-end mr-5 text-white'>
            <a href="#">Forgot?</a>
          </div>
        </div>

        <div className='flex justify-center mt-5'>
          <button type="submit" className='bg-black text-white px-16 py-4 rounded-full shadow'>Log In</button>
        </div>
      </form>
      
      <div className='mt-20 ml-12 absolute z-10'>
        <h1 className='capitalize text-white mb-3'>
          Don't have an account?
        </h1>
        <Link to="/signup">
          <button className='bg-black text-white px-10 py-5 ml-4 rounded-full shadow'>Sign Up</button>
        </Link>
      </div>

      <img className='fixed bottom-0 right-0 h-[35vh]' src={imgggg} alt="" />   
    </div>
  );
}

export default LoginPage;
