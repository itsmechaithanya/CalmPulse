import React from 'react'
import 'remixicon/fonts/remixicon.css'
import white from '../assets/iPhone 14/c1-removebg-preview 1.png'

function Home({name}) {
  return (
    <div className='h-screen w-screen bg-[#7A4BC8]'>
        <h1 className='text-2xl font-bold pt-[6vh] pl-[3vh]'>Welcome, {name} <i class="ri-shake-hands-fill text-[#fce3c7]"></i></h1>
        <h1 className='text-white flex justify-center text-center mt-5 font-light text-2xl'>Lets get to know about your feelings </h1>
        <div className='flex justify-center '>
            <img src={white} alt="" />
        </div>
    </div>
  )
}

export default Home