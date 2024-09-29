import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import imgg from '../assets/b08f403ff43bbe883c702ab13eccb016.png';
import imggg from '../assets/247ade28c862c6b10881b9307e6df568.png';
import { FcGoogle } from "react-icons/fc";
import { auth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, db } from './firebase';
import { setDoc, doc, getDoc } from "firebase/firestore";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const navigate = useNavigate();

  // Validate form input
  const validateForm = () => {
    let isValid = true;
    if (!name.trim()) {
      toast.error("Name is required");
      isValid = false;
    }
    if (!phoneNumber.trim()) {
      toast.error("Phone number is required");
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
    } else if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      isValid = false;
    }
    if (!termsAccepted) {
      toast.error("You must accept the Terms of Service and Privacy Policy");
      isValid = false;
    }
    return isValid;
  };

  const checkIfEmailExists = async (email) => {
    const userDoc = await getDoc(doc(db, "Users", email));
    return userDoc.exists();
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const emailExists = await checkIfEmailExists(email);
      if (emailExists) {
        toast.error("This email is already in use. Please use a different email.");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        const userKey = user.uid;

        await setDoc(doc(db, "Users", userKey), {
          email: user.email,
          username: name,
          phonenumber: phoneNumber,
        });

        toast.success("Account created successfully!");
        navigate('/login');
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const emailExists = await checkIfEmailExists(user.email);
      if (emailExists) {
        toast.error("This Google account is already registered. Please log in instead.");
        return;
      }

      const userKey = user.uid;

      await setDoc(doc(db, "Users", userKey), {
        email: user.email,
        username: user.displayName || '',
        phonenumber: user.phoneNumber || '',
      });

      toast.success("Signed up with Google successfully!");
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='h-screen w-screen bg-[#7A4BC8] overflow-hidden relative'>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <img className='h-[20vh] fixed -top-[5vh] -right-2' src={imggg} alt="" />
      <h1 className='text-white text-3xl font-semibold flex justify-center pt-[10vh]'>Sign Up</h1>
      <div className='flex flex-col justify-center mt-[3vh] items-center'>
        <button onClick={handleGoogleSignUp} className='text-white bg-black px-8 flex justify-center items-center py-5 rounded-full gap-3 shadow'>
          <FcGoogle size={"1.5em"} />Sign up with Google
        </button>
      </div>
      <div className='flex justify-center mt-2'>
        <h1 className=' capitalize'>Or continue with Email</h1>
      </div>
      <form onSubmit={handleRegister} className='flex flex-col gap-5 ml-5 mr-5 justify-center mt-10'>
        <input className='py-4 px-7 rounded-full w-full' type="text" placeholder='Enter Your Name' value={name} onChange={(e) => setName(e.target.value)} required />
        <input className='py-4 px-7 rounded-full w-full' type="tel" placeholder='Enter Your Phone number' value={phoneNumber} onChange={(e) => setPhone(e.target.value)} required />
        <input className='py-4 px-7 rounded-full w-full' type="email" placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className='py-4 px-7 rounded-full w-full' type="password" placeholder='Enter Your Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        <div className='flex items-center px-3 mt-0'>
          <input className='h-5 w-5 ml-4 mr-5 bg-red-900 shadow' type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} required />
          <h1 className='text-white capitalize'>I agree with the Terms of Service and Privacy policy</h1>
        </div>
        <div className='flex justify-end mt-0 mr-15'>
          <Link to="/details">
          <button type="submit" className='bg-black text-white px-8 py-5 rounded-full shadow'>Create Account</button>
          </Link>
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
      <img className='fixed -bottom-[30vh] -left-[11vh] h-[60vh]' src={imgg} alt="" />
    </div>
  );
}

export default SignUp;
