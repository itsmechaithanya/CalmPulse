import React from 'react';
import { Link } from 'react-router-dom'; 
import 'remixicon/fonts/remixicon.css';
import white from '../assets/iPhone 14/c1-removebg-preview 1.png';
import { db } from './firebase';
import { doc, getDoc } from "firebase/firestore";

function Home({ name }) { 
  const questionSet = 'QuestionsOne';

  return (
    <div className='h-screen w-screen bg-[#7A4BC8]'>
      <h1 className='text-2xl font-semibold pt-[6vh] pl-[4vh]'>
        Welcome <i className="ri-shake-hands-fill text-[#fce3c7]"></i>
      </h1>
      <h1 className='text-white flex justify-center text-center mt-10 font-light text-2xl px-3'>
        Let's get to know about your feelings
      </h1>
      <div className='flex justify-center'>
        <img src={white} alt="Decorative" />
      </div>
      <h1 className='text-white flex justify-center text-center mt-20 font-light text-2xl capitalize px-3'>
        You will have to answer a few questions
      </h1>
      <div className='h-[20vh] flex justify-center items-center'>
        <Link to="/questions" state={{ questionSet }}> 
          <button className='bg-white text-xl px-20 py-4 rounded-full'>
            Ready
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
