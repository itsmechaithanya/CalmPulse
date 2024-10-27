import React from 'react';
import 'remixicon/fonts/remixicon.css';
import illustration from '../assets/nextlevel.png'; // Replace with your illustration image path
import logo from '../assets/logo-1.png'; // Replace with your logo image path
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Nextlevel() {
  return (
    <div className="h-screen w-screen bg-[#7A4BC8] flex justify-center items-center relative">
      {/* Logo in the top-right corner */}
      <img 
        src={logo}  
        alt="Logo" 
        className="absolute top-0 right-0 w-20 h-20"
      />

      {/* White box containing illustration, text, and button */}
      <div className="bg-white rounded-lg p-6 w-[80vw] max-w-md flex flex-col items-center">
        {/* Illustration */}
        <img src={illustration} alt="Illustration" className="w-64 h-48 mb-4" />

        {/* Description text */}
        <p className="text-center text-black font-medium text-lg mb-8">
          To Know More About What You Feel And Get Some Suggestions If Needed...
        </p>

        {/* Button */}
        <Link to="/homethree">
          <button className="bg-[#9676cd] text-white text-lg font-semibold py-3 px-10 rounded-full shadow-md hover:shadow-lg transition-all">
            Go To Next Level
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Nextlevel;
