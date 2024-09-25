import React from 'react';
import { Link } from 'react-router-dom';
import bgg from '../assets/c3-removebg-preview-2 1.png';

function Homethree() {
  const questionSet = 'Questionsthree';

  return (
    <div className='h-[100vh] w-[100vw] bg-[#7A4BC8]'>
        <div className='py-[8vh] flex text-center px-[5vw] capitalize'>
            <h1 className='text-white text-[3vh] font-light'>Let's get to know your student life</h1>
        </div>
       <div className='pt-[-10vh] w-[100vw] flex justify-center'>
         <img src={bgg} alt="" className='h-[40vh]' />
       </div>
       <div className='mt-[6vh]'>
        <h1 className='capitalize flex text-center text-[2.5vh] font-light text-white px-[4vw]'>You will have to answer a few questions</h1>
       </div>
       <div className='flex justify-center mt-[4vh]'>
        <Link to="/questions" state={{ questionSet }}>
          <button className='bg-white px-[10vw] py-[2vh] text-[2.5vh] rounded-[5vh]'>Ready</button>
        </Link>
       </div>
    </div>
  )
}

export default Homethree;