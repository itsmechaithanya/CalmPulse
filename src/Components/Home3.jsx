import React from 'react';
import illustration from '../assets/home3.png'; 
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Home3() {
  return (
    <div className="h-screen w-screen bg-[#7A4BC8] flex flex-col justify-center items-center">
      
      {/* Title */}
      <h1 className="text-white text-center text-xl font-medium mb-6">
        Let's Get A Clear Picture <br /> About The Reason
      </h1>

      {/* Illustration */}
      <img src={illustration} alt="Illustration" className="w-64 h-64 mb-6" />

      {/* Description */}
      <p className="text-white text-center text-lg mb-10">
        You Will Have To Answer <br /> A Few Questions
      </p>

      {/* Ready Button */}
      <Link to="/homethree">
        <button className="bg-white text-[#7A4BC8] text-lg font-semibold py-3 px-16 rounded-full shadow-md hover:shadow-lg transition-all">
          Ready
        </button>
      </Link>
    </div>
  );
}

export default Home3;
