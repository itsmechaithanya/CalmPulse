import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'
import mid from '../assets/mid.png'
import FirstPageOne from '../assets/FirstPageOne.png'

function Landing() {
  return (
    <div className='h-[100vh] w-[100vw] overflow-hidden bg-[#7A4BC8] relative'>
        <span className='absolute top-[10vh]'>
            <img src={logo} alt="" /> 
        </span> 
       <span className='absolute top-[27vh]'>
            <img src={mid} alt="" />
       </span>
       <Link to="/signup">
  <button className='bg-black text-white px-[6.5vw] py-[1.8vh] text-[2.2vh] rounded-[1.8vh] absolute top-[62vh] left-[35vw]'> Sign Up </button>
  </Link>
       <h1 className='absolute top-[70vh] left-[20vw] text-white'>Already have an account?
            <span className='text-black text-[2.2vh]'>
            <Link to="/login"> Login</Link>
            </span>
        </h1>
        <span className='absolute bottom-[-18vh]'>
            <img src={FirstPageOne} alt="" />
        </span>
    </div>
  )
}

export default Landing
