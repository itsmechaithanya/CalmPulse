import React from 'react';
import { Link } from 'react-router-dom'; 


// Circular Progress component
const CircularProgress = ({ percentage }) => {
  const circleStyle = {
    background: `conic-gradient(#4caf50 ${percentage * 3.6}deg, #e0e0e0 0deg)`,
  };

  return (
    <div className="relative w-36 h-36 rounded-full flex items-center justify-center" style={circleStyle}>
      <span className="absolute text-2xl font-semibold text-gray-800">{percentage}%</span>
    </div>
  );
};

const C1result = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#7A4BC8] px-6 relative">

      {/* Quote Section */}
      <div className="bg-white rounded-xl p-6 shadow-md mb-6 w-80 text-center">
        <p className="text-gray-700 text-lg font-medium">
          "It's okay to feel overwhelmed sometimes. You're doing your best, and that's enough."
        </p>
      </div>

      {/* Circular Progress */}
      <CircularProgress percentage={65} />
    </div>
  );
};

export default C1result;
