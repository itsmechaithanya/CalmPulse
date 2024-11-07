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
    <div className="flex flex-col items-center overflow-hidden h-screen bg-[#7A4BC8] px-6 relative "> {/* Adjusted margin-top to move everything upwards */}
      {/* Quote Section */}
      <div className='h-[25vh] w-screen flex justify-center items-center text-center px-[14vw]'><h1 className='text-white text-[3vh] capitalize'>score below depicts your stress level</h1></div>

      {/* Circular Progress */}
      <CircularProgress percentage={totalScore} />

      <div className='mt-[6vh]'><h1 className='text-white text-[2vh]'>And we say that</h1></div>
      
      <div className="bg-white rounded-xl p-6 shadow-md mb-6 w-80 text-center mt-10"> {/* Adjusted margin-top to move everything upwards */}
        <p className="text-gray-700 text-lg font-medium">
          {getMessage(totalScore)} {/* Call the function to get the message based on totalScore */}
        </p>
      </div>

      {/* Illustration */}
      <div className="absolute bottom-0 left-[3vw] w-full mt-10"> {/* Adjusted margin-top to move everything upwards */}
        <img src={illustration} alt="Illustration" className="w-95 h-90" /> {/* Decreased size of the image */}
      </div>
    </div>
  );
};

// Function to get the message based on totalScore
const getMessage = (score) => {
  if (score >= 0 && score < 30) {
    return "You're in great mental health.";
  } else if (score >= 30 && score < 60) {
    return "Consider focusing on self-improvement.";
  } else if (score >= 60 && score < 90) {
    return "It might be helpful to seek some guidance.";
  } else if (score >= 90 && score <= 100) {
    return "It's important to consult a therapist soon.";
  }
  return ""; // Default case if score is out of expected range
};

export default C1result;