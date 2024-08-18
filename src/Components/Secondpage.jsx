import React from 'react'
import imgg from '../assets/b08f403ff43bbe883c702ab13eccb016.png'
import imggg from '../assets/247ade28c862c6b10881b9307e6df568.png'
import { FcGoogle } from "react-icons/fc";
import { IconContext } from "react-icons";

function Secondpage() {
  return (
    <div className='h-screen w-screen bg-[#7A4BC8] overflow-hidden relative'>
        <img className='h-[20vh] absolute -top-[5vh] -right-2' src={imggg} alt="" />
        <h1 className='text-white text-3xl font-semibold flex justify-center pt-[10vh]'>Sign Up</h1>
        <div className='flex flex-col justify-center mt-[3vh] items-center'>
            <button className='text-white bg-black px-8 flex justify-center items-center py-5 rounded-full gap-3'><FcGoogle size={"1.5em"} />Sign up with Google</button>
        </div>
        <div className='flex justify-center mt-2'>
            <h1 className=' capitalize'>Or continue with Email</h1>
        </div>
        <img className='absolute -bottom-[30vh] -left-[11vh] h-[60vh]' src={imgg} alt="" />
            
    </div>
  )
}

export default Secondpage