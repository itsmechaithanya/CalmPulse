import React from 'react'
import bgg from '../assets/c4_1_-removebg-preview 1.png'

function Hometwo() {
  return (
    <div className='h-screen w-screen bg-[#7A4BC8]'>
        <div className='py-[8vh] flex text-center px-20 capitalize '>
            <h1 className='text-white text-2xl font-light' >have you noticed extreme changes  </h1>
        </div>
       <div className='pt-5 w-screen flex justify-center'>
         <img src={bgg} alt="" />
       </div>
       <div className='mt-[6vh]'>
        <h1 className=' capitalize  flex text-center text-2xl font-light text-white'>you will have to answer a few questions</h1>
       </div>
       <div className='flex justify-center mt-9'>
        <button className='bg-white px-20 py-3 text-xl rounded-full'>Ready</button>
       </div>
    </div>
  )
}

export default Hometwo