import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';  // Add Link here
import imgg from '../assets/b08f403ff43bbe883c702ab13eccb016.png';
import imggg from '../assets/247ade28c862c6b10881b9307e6df568.png';
import imgggg from '../assets/iPhone 13/reflecting 1.png';
import { FcGoogle } from "react-icons/fc";
import { auth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from './firebase';
import { getDoc, doc } from "firebase/firestore";
import { db } from './firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email.trim()) {
      toast.error("Email is required", { position: "top-center" });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Email is invalid", { position: "top-center" });
      return false;
    }
    if (!password.trim()) {
      toast.error("Password is required", { position: "top-center" });
      return false;
    }
    return true;
  };

  const checkIfEmailSignedUp = async (email) => {
    const userDoc = await getDoc(doc(db, "Users", email));
    return userDoc.exists();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const isSignedUp = await checkIfEmailSignedUp(email);
      if (!isSignedUp) {
        toast.error("This email is not signed up. Please sign up first.", { position: "top-center" });
        return;
      }
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
      navigate('/home', { state: { email: userCredential.user.email } });
    } catch (error) {
      toast.error(error.message, { position: "top-center" });
      console.log('Login Error:', error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('User signed in with Google:', result.user);
      navigate('/home', { state: { email: result.user.email } });
    } catch (error) {
      toast.error(error.message, { position: "top-center" });
      console.log('Google Login Error:', error.message);
    }
  };

  return (
    <div className='h-screen w-screen bg-[#7A4BC8] overflow-hidden relative'>
        <img className='h-[20vh] absolute -top-[5vh] -right-2' src={imggg} alt="" />
        <h1 className='text-white text-3xl font-semibold flex justify-center pt-[10vh]'>Log In </h1>
        <div className='flex flex-col justify-center mt-[3vh] items-center'>
            <button onClick={handleGoogleLogin} className='text-white bg-black px-8 flex justify-center items-center py-5 rounded-full gap-3 shadow'><FcGoogle size={"1.5em"} />Log In with Google</button>
        </div>
        <div className='flex justify-center mt-2'>
            <h1 className=' capitalize'>Or log in with Email</h1>
        </div>
        <form onSubmit={handleLogin} className='flex flex-col gap-5 ml-5 mr-5 justify-center mt-10'>
          <div className='relative'>
            <input 
              className='py-4 px-7 rounded-full w-full' 
              type="email" 
              placeholder='Username or Email' 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className='relative'>
            <input 
              className='py-4 px-7 rounded-full w-full' 
              type="password" 
              placeholder='Password' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <div className='flex justify-end mr-5 text-white'>
            <a href="">Forgot?</a>
          </div>
          <div className='flex justify-center mt-5 '>
            <button type="submit" className='bg-black text-white px-16 py-4 rounded-full shadow'>Log In</button>
          </div>
        </form>
        <div className='flex justify-center mt-2 text-white'> 
        </div>
        <div className='mt-10 ml-5'>
            <h1 className='capitalize text-white mb-3'>Don't have an account?</h1>
            <Link to="/signup">
                <button className='bg-black text-white px-10 py-5 ml-4 rounded-full shadow' onClick={(e) => {e.preventDefault(); window.location.href='/signup';}}>Sign Up</button>
            </Link>
        </div>
        <img className='absolute bottom-0 right-0 h-[35vh]' src={imgggg} alt="" />   
    </div>
  )
}

export default LoginPage;