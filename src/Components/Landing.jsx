import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'
import mid from '../assets/mid.png'
import FirstPageOne from '../assets/FirstPageOne.png'

function Landing() {
  return (
    <div className='h-screen w-screen overflow-hidden bg-[#7A4BC8] relative'>
        <span className='absolute top-[10%]'>
            <img src={logo} alt="" /> 
        </span> 
       <span className=' absolute top-[27%]'>
            <img src={mid} alt="" />
       </span>
       <Link to="/signup">
  <button className='bg-black text-white px-20 py-4 text-xl rounded-2xl absolute top-[62%] left-[23%]'> Sign Up </button>
  </Link>
       <h1 className=' absolute top-[70%] left-[20%] text-white'>Already have an account?
            <span className='text-black text-xl'>
            <Link to="/login"> Login</Link>
            </span>
        </h1>
        <span className=' absolute bottom-[-18vh]'>
            <img src={FirstPageOne} alt="" />
        </span>
    </div>
  )
}

export default Landing