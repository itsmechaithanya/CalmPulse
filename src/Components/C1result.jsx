import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase'; // Import Firestore configuration
import { doc, getDoc } from 'firebase/firestore'; // To fetch data from Firestore
import illustration from '../assets/C1result.png';  
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
  const [totalScore, setTotalScore] = useState(0); // State to store the total score
  const [userId, setUserId] = useState(null); // State to store the user ID

  useEffect(() => {
    const fetchTotalScore = async () => {
      const user = auth.currentUser;
      if (user) {
        setUserId(user.uid); // Set the user ID
        try {
          const userDocRef = doc(db, 'Users', user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setTotalScore(userData.totalScore || 0); // Get the total score from Firestore
          } else {
            console.log('No such user document!');
          }
        } catch (error) {
          console.error('Error fetching total score: ', error);
        }
      } else {
        console.log('User is not logged in');
      }
    };

    fetchTotalScore();
  }, []); // Empty dependency array, so it runs only once when the component mounts

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#7A4BC8] px-6 relative mt-10"> {/* Adjusted margin-top to move everything upwards */}
      {/* Quote Section */}
      <div className="bg-white rounded-xl p-6 shadow-md mb-6 w-80 text-center mt-10"> {/* Adjusted margin-top to move everything upwards */}
        <p className="text-gray-700 text-lg font-medium">
          "It's okay to feel overwhelmed sometimes. You're doing your best, and that's enough."
        </p>
      </div>

      {/* Circular Progress */}
      <CircularProgress percentage={totalScore} />

      {/* Optionally, display the total score */}
      <div className="text-white text-xl mt-4">
      </div>

      {/* Illustration */}
      <div className="absolute bottom-20 w-full mt-10"> {/* Adjusted margin-top to move everything upwards */}
        <img src={illustration} alt="Illustration" className="w-95 h-90" /> {/* Decreased size of the image */}
      </div>
    </div>
  );
};

export default C1result;