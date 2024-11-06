import React from 'react';
import 'remixicon/fonts/remixicon.css';
import illustration from '../assets/Knowmore.png';  
import logo from '../assets/logo-1.png';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Knowmore() {
  return (
    <div className="h-screen w-screen bg-[#7D3D89] flex justify-center items-center relative">
      {/* Logo in the top-right corner */}
      <img 
        src={logo} 
        alt="Logo" 
        className="absolute top-0 right-0 w-20 h-20"
      />

      <div className="bg-white rounded-lg p-8 w-[80vw] h-[80vh] max-w-sm flex flex-col items-center">
        {/* Illustration */}
        <div className="flex flex-col items-center justify-center h-full">
          <img src={illustration} alt="Illustration" className="mb-8 w-60 h-60" /> {/* Decreased size of the image */}
          <Link to="/nextlevel">
            <button className="bg-[#9676cd] text-white text-lg font-semibold py-4 px-6 rounded-full mb-4 shadow-md hover:shadow-lg transition-all">
              Want To Know More?
            </button>
          </Link>
          <Link to="/c1result">
            <button className="bg-[#c28bcf] text-black text-lg font-semibold py-4 px-6 rounded-full shadow-md hover:shadow-lg transition-all">
              Get Result
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Knowmore;
