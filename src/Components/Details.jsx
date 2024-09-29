import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  // State for specific error messages
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};
    if (password.length < 8) {
      formErrors.password = "Password must be at least 8 characters long";
    }
    if (!termsAccepted) {
      formErrors.termsAccepted = "You must accept the Terms of Service and Privacy Policy";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          username: name,
          phonenumber: phoneNumber,
        });
        navigate('/login');
      }

    } catch (error) {
      console.log("Registration Error: ", error.message);
      setErrors((prevErrors) => ({ ...prevErrors, firebase: error.message }));
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log("User signed up with Google!");
    } catch (error) {
      console.log("Google Sign-up Error: ", error.message);
      setErrors((prevErrors) => ({ ...prevErrors, firebase: error.message }));
    }
  };

  return (
    <div className='h-screen w-screen bg-[#7A4BC8] overflow-hidden relative'>
        <img className='h-[20vh] absolute -top-[5vh] -right-2' src={imggg} alt="" />
        <h1 className='text-white text-3xl font-semibold flex justify-center pt-[10vh]'>Sign Up</h1>
        <div className='flex flex-col justify-center mt-[3vh] items-center'>
            <button onClick={handleGoogleSignUp} className='text-white bg-black px-8 flex justify-center items-center py-5 rounded-full gap-3 shadow'><FcGoogle size={"1.5em"} />Sign up with Google</button>
        </div>
        <div className='flex justify-center mt-2'>
            <h1 className=' capitalize'>Or continue with Email</h1>
        </div>
        <form onSubmit={handleRegister} className='flex flex-col gap-5 ml-5 mr-5 justify-center mt-10' noValidate>
          <div className='relative'>
            <input 
              className='py-4 px-7 rounded-full w-full' 
              type="text" 
              placeholder='Enter Your Name' 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
          <div className='relative'>
            <input 
              className='py-4 px-7 rounded-full w-full' 
              type="text" 
              placeholder='Enter Your Phone number' 
              value={phoneNumber} 
              onChange={(e) => setPhone(e.target.value)} 
              required 
            />
          </div>
          <div className='relative'>
            <input 
              className='py-4 px-7 rounded-full w-full' 
              type="email" 
              placeholder='Enter Your Email' 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className='relative'>
            <input 
              className='py-4 px-7 rounded-full w-full' 
              type="password" 
              placeholder='Enter Your Password' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              minLength="8" // This will trigger "Please lengthen this text"
            />
            {errors.password && <p className="text-red-500 mt-1">{errors.password}</p>}
          </div>
          <div className='flex items-center px-3 mt-3 relative'>
            <input 
              className='h-5 w-5 ml-4 mr-5 bg-red-900 shadow' 
              type="checkbox" 
              checked={termsAccepted} 
              onChange={(e) => setTermsAccepted(e.target.checked)} 
              required 
            />
            <h1 className='text-white capitalize'>I agree with the Terms of Service and Privacy policy</h1>
          </div>
          {errors.termsAccepted && <p className="text-red-500 mt-1 ml-10">{errors.termsAccepted}</p>}
          
          <div className='relative'>
            <input 
              className='py-4 px-7 rounded-full w-full' 
              type="password" 
              placeholder='Enter Your Password' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              minLength="8" // This will trigger "Please lengthen this text"
            />
            {errors.password && <p className="text-red-500 mt-1">{errors.password}</p>}
          </div>
          
          <div className='flex justify-end mt-5 mr-10'>
            <button type="submit" className='bg-black text-white px-8 py-5 rounded-full shadow'>Create Account</button>
          </div>
        </form>
        <div className='flex justify-end mt-10 mr-5 text-white'> 
          <h1 className=' capitalize'><a href="">Already have an account?</a></h1>
        </div>
        <div className='flex justify-end mt-2 mr-5 '>
          <Link to="/login">
          <button className='bg-black text-white px-16 py-5 rounded-full shadow'>Log In</button>
          </Link>
        </div>
        <img className='absolute -bottom-[30vh] -left-[11vh] h-[60vh]' src={imgg} alt="" />
    </div>
  );
}

export default SignUp;
