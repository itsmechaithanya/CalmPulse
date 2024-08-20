import React from 'react'
import imggg from '../assets/247ade28c862c6b10881b9307e6df568.png'

function Details() {
  return (
    <div className='h-screen w-screen bg-[#7A4BC8]'>
        <img className='h-[20vh] absolute -top-[5vh] -right-2' src={imggg} alt="" />
        <div className='flex justify-center pt-[10vh]'>
            <h1 className='text-white text-[3vh] font-semibold'>Users Details Form</h1>
        </div>
        
    </div>
  )
}

export default Details