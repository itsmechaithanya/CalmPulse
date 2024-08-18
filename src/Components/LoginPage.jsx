import React from 'react'
import imgg from '../assets/b08f403ff43bbe883c702ab13eccb016.png'
import imggg from '../assets/247ade28c862c6b10881b9307e6df568.png'
import imgggg from '../assets/iPhone 13/reflecting 1.png'
import { FcGoogle } from "react-icons/fc";

function LoginPage() {
  return (
    <div className='h-screen w-screen bg-[#7A4BC8] overflow-hidden relative'>
        <img className='h-[20vh] absolute -top-[5vh] -right-2' src={imggg} alt="" />
        <h1 className='text-white text-3xl font-semibold flex justify-center pt-[10vh]'>Log In </h1>
        <div className='flex flex-col justify-center mt-[3vh] items-center'>
            <button className='text-white bg-black px-8 flex justify-center items-center py-5 rounded-full gap-3 shadow'><FcGoogle size={"1.5em"} />Log In with Google</button>
        </div>
        <div className='flex justify-center mt-2'>
            <h1 className=' capitalize'>Or log in with Email</h1>
        </div>
        <div className='flex flex-col gap-5 ml-5 mr-5 justify-center mt-10'>
          <input className='py-4 px-7 rounded-full' type="text" placeholder='Username or Email' />
          <input className='py-4 px-7 rounded-full' type="text" placeholder='Password' />
          <div className='flex justify-end mr-5 text-white'>
            <a href="">Forgot?</a>
          </div>
        </div>
          <div className='flex justify-center mt-5 '>
            <button className='bg-black text-white px-16 py-4 rounded-full shadow'>Log In</button>
          </div>
          <div className='flex justify-center mt-2 text-white'> 
          </div>
        <div className='mt-20 ml-12'>
            <h1 className=' capitalize text-white mb-3'><a href="">Don't have an account</a></h1>
            <button className='bg-black text-white px-10 py-5 ml-4 rounded-full shadow '>Sign Up</button>
        </div>
        <img className='absolute bottom-0 right-0 h-[35vh]' src={imgggg} alt="" />   
    </div>
  )
}

export default LoginPage