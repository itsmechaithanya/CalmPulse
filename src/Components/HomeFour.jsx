import React from 'react';
import { Link } from 'react-router-dom';
import bgg from '../assets/c4_1_-removebg-preview 1.png';

function Homefour() {
  const questionSet = 'Questionsfour';

  return (
    <div className='h-[100vh] w-[100vw] bg-[#7A4BC8]'>
        <div className='py-[8vh] flex text-center px-[5vw] capitalize'>
            <h1 className='text-white text-[3vh] font-light'>Have you noticed extreme changes?</h1>
        </div>
       <div className='pt-[-10vh] w-[100vw] flex justify-center'>
         <img src={bgg} alt="" className='h-[45vh]' />
       </div>
       <div className='mt-[4vh]'>
        <h1 className='capitalize flex text-center text-[2.5vh] font-light text-white px-[4vw]'>You will have to answer a few questions</h1>
       </div>
       <div className='flex justify-center mt-[2vh]'>
        <Link to="/questions" state={{ questionSet }}>
          <button className='bg-white px-[10vw] py-[2vh] text-[2.5vh] rounded-[5vh]'>Ready</button>
        </Link>
       </div>
    </div>
  )
}

export default Homefour;