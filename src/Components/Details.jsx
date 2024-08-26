import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import imggg from '../assets/247ade28c862c6b10881b9307e6df568.png';

function Details() {
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/home'); 
  };

  return (
    <div className='h-screen w-screen bg-[#7A4BC8]'>
        <img className='h-[20vh] absolute -top-[5vh] -right-2' src={imggg} alt="" />
        <div className='flex justify-center pt-[10vh]'>
            <h1 className='text-white text-[3vh] font-semibold'>Users Details Form</h1>
        </div>
        <form className='flex flex-col gap-5 ml-5 mr-5 justify-center mt-10' onSubmit={handleSubmit}>
            <input className='py-4 px-7 rounded-full' type="text" placeholder='Username' required />
            <input className='py-4 px-7 rounded-full text-[#9CA3AF] uppercase' type="date" placeholder='Date' required />
            <div className='flex justify-evenly bg-white rounded-full'>
                <h1 className='text-md text-[#9CA3AF] py-4 px-7'>
                    <input name='Gender' type="radio" value="Male" required /> Male
                </h1>
                <h1 className='text-md text-[#9CA3AF] py-4 px-7'>
                    <input name='Gender' type="radio" value="Female" required /> Female
                </h1>
            </div>
            <input className='py-4 px-7 rounded-full' type="number" placeholder='Phone Number' required />
            <input className='py-4 px-7 rounded-full' type="email" placeholder='Email' required />
            <input className='py-4 px-7 rounded-full' type="password" placeholder='Password' required />
            <button className='bg-black text-white px-10 py-5 mt-20 rounded-full shadow' type="submit">Submit</button>
        </form>
    </div>
  );
}

export default Details;
