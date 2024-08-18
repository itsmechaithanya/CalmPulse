import React from 'react'
import imgg from '../assets/b08f403ff43bbe883c702ab13eccb016.png'
import imggg from '../assets/247ade28c862c6b10881b9307e6df568.png'
import { FcGoogle } from "react-icons/fc";

function Secondpage() {
  return (
    <div className='h-screen w-screen bg-[#7A4BC8] overflow-hidden relative'>
        <img className='h-[20vh] absolute -top-[5vh] -right-2' src={imggg} alt="" />
        <h1 className='text-white text-3xl font-semibold flex justify-center pt-[10vh]'>Sign Up</h1>
        <div className='flex flex-col justify-center mt-[3vh] items-center'>
            <button className='text-white bg-black px-8 flex justify-center items-center py-5 rounded-full gap-3 shadow'><FcGoogle size={"1.5em"} />Sign up with Google</button>
        </div>
        <div className='flex justify-center mt-2'>
            <h1 className=' capitalize'>Or continue with Email</h1>
        </div>
        <div className='flex flex-col gap-5 ml-5 mr-5 justify-center mt-10'>
          <input className='py-4 px-7 rounded-full' type="text" placeholder='Enter Your Name ' />
          <input className='py-4 px-7 rounded-full' type="text" placeholder='Enter Your Phone number ' />
          <input className='py-4 px-7 rounded-full' type="text" placeholder='Enter Your Email' />
          <input className='py-4 px-7 rounded-full' type="text" placeholder='Enter Your Password ' />
        </div>
        <div className='flex items-center px-3 mt-5'>
          <input className='h-5 w-5 ml-4 mr-5 bg-red-900 shadow' type="checkbox" />
          <h1 className='text-white capitalize'>I agree with the Terms of Service and Privacy policy</h1>
        </div>
          <div className='flex justify-end mt-5 mr-20 '>
            <button className='bg-black text-white  px-8 py-5 rounded-full shadow'>Create Account</button>
          </div>
          <div className='flex justify-end mt-10 mr-5 text-white'> 
            <h1 className=' capitalize'><a href="">Already have an account?</a></h1>
          </div>
          <div className='flex justify-end mt-2 mr-5 '>
            <button className='bg-black text-white px-16 py-5 rounded-full shadow'>Log In</button>
          </div>
        <img className='absolute -bottom-[30vh] -left-[11vh] h-[60vh]' src={imgg} alt="" />
            
    </div>
  )
}

export default Secondpage