import React from 'react'
import imgg from '../assets/b08f403ff43bbe883c702ab13eccb016.png'
import imggg from '../assets/247ade28c862c6b10881b9307e6df568.png'

function Secondpage() {
  return (
    <div className='h-screen w-screen bg-[#7A4BC8] overflow-hidden relative'>
        <img className='h-[20vh] absolute -top-[5vh] -right-2' src={imggg} alt="" />
        <h1 className='text-white text-3xl font-semibold flex justify-center pt-[10vh]'>Sign Up</h1>
        <div className='flex justify-center mt-[3vh]'>
            <button className='text-white bg-black px-10 py-3 rounded-full'>Sign up with Google</button>
        </div>
        <h1>Con</h1>
        <img className='absolute -bottom-[30vh] -left-[11vh] h-[60vh]' src={imgg} alt="" />
    </div>
  )
}

export default Secondpage