import React from 'react'
import 'remixicon/fonts/remixicon.css'
import white from '../assets/iPhone 14/c1-removebg-preview 1.png'

function Home({name}) {
  return (
    <div className='h-screen w-screen bg-[#7A4BC8]'>
        <h1 className='text-2xl font-semibold pt-[6vh] pl-[4vh]'>Welcome, {name} <i class="ri-shake-hands-fill text-[#fce3c7]"></i></h1>
        <h1 className='text-white flex justify-center text-center mt-10 font-light text-2xl px-3'>Lets get to know about your feelings </h1>
        <div className='flex justify-center '>
            <img src={white} alt="" />
        </div>
        <h1 className=' text-white flex justify-center text-center mt-20 font-light text-2xl capitalize px-3'>you will have to answer a few questions</h1>
        <div className=' h-[20vh] flex justify-center items-center'>
            <button className='bg-white text-xl px-20 py-4 rounded-full'>Ready</button>
        </div>
    </div>
  )
}

export default Home