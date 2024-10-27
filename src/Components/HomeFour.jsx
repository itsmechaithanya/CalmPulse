import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase'; // Import Firestore and Auth
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

function Homefour({ Questions }) {
  const [selectedResponses, setSelectedResponses] = useState(Array(Questions.length).fill(''));
  const [selectedScores, setSelectedScores] = useState(Array(Questions.length).fill(0)); // State for selected scores
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [progressColor, setProgressColor] = useState('#9676cd');
  const [userName, setUserName] = useState(''); // State for user's name
  const [userId, setUserId] = useState(null); // State for user ID

  useEffect(() => {
    setProgressPercentage((currentQuestionIndex / Questions.length) * 100);
  }, [currentQuestionIndex, Questions.length]);

  // Fetch the user's name from Firestore
  useEffect(() => {
    const fetchUserData = async (uid) => {
      try {
        const userDocRef = doc(db, 'Users', uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUserName(userData.username); // Assuming 'username' field exists
        } else {
          console.log("No such user document exists!");
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // Set user ID
        fetchUserData(user.uid); // Fetch user data from Firestore
      } else {
        console.log("No user is logged in");
      }
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  const handleOptionClick = (option) => {
    const updatedResponses = [...selectedResponses];
    const updatedScores = [...selectedScores];
    updatedResponses[currentQuestionIndex] = option;
    updatedScores[currentQuestionIndex] = getScore(option); // Get score based on option
    setSelectedResponses(updatedResponses);
    setSelectedScores(updatedScores);
    console.log(`Option selected: ${option}, Score: ${getScore(option)}`); // Log the selected option and score
  };

  const getScore = (option) => {
    switch (option) {
      case 'Strongly Disagree':
        return 1;
      case 'Disagree':
        return 2;
      case 'Neutral':
        return 0;
      case 'Agree':
        return 3;
      case 'Strongly Agree':
        return 4;
      default:
        return 0;
    }
  };

  const storeResponse = async () => {
    const user = auth.currentUser;

    if (!user) {
      console.error("User is not authenticated.");
      return;
    }

    const userId = user.uid;

    try {
      const userDocRef = doc(db, 'Users', userId);
      await setDoc(userDocRef, {
        responses: {
          [`homefour_question_${currentQuestionIndex + 1}`]: {
            option: selectedResponses[currentQuestionIndex],
            score: selectedScores[currentQuestionIndex],
          },
        },
      }, { merge: true });
      console.log("Response stored successfully.");
    } catch (error) {
      console.error("Error storing response:", error);
    }
  };

  const handleNext = async () => {
    await storeResponse();
    setProgressColor('#9676cd');
    setCurrentQuestionIndex(prev => Math.min(prev + 1, Questions.length - 1));
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className='h-[100vh] w-[100vw] overflow-hidden bg-[#7A4BC8] flex flex-col items-center'>
      {/* Hi, message for user */}
      <h1 className='text-white text-[24px] mt-4'>
        Hi, {userName ? userName : 'Guest'}
      </h1>

      {/* Question Frame */}
      <div className='relative h-[85vh] w-[90vw] bg-white rounded-[20px] mt-6 flex flex-col items-center p-6'>
        
        {/* Progress Bar */}
        <div className="w-full h-3 bg-gray-200 mb-4 relative">
          <div
            className="h-full"
            style={{
              width: `${progressPercentage}%`,
              backgroundColor: progressColor,
              transition: 'width 0.3s ease, background-color 0.3s ease',
            }}
          />
        </div>

        {/* Inner Frame for Question */}
        <div className='relative h-[25vh] w-[80vw] bg-[#C489CF] rounded-[20px] flex flex-col justify-center items-center p-6'>
          <h1 className='text-white text-[24px] text-center font-bold'>
            {Questions[currentQuestionIndex]?.question || 'Loading...'}
          </h1>
        </div>

        {/* Options placed below the question frame */}
        <div className='flex flex-col w-[80vw] mt-6 space-y-4'>
          {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map((option, i) => (
            <label key={i} className={`cursor-pointer flex items-center justify-between w-full px-5 py-3 rounded-lg text-lg 
                ${selectedResponses[currentQuestionIndex] === option ? 'bg-[#d8f2a1] text-black font-semibold' : 'bg-[#F5F5F5] text-gray-800'}`}>
              <span>{String.fromCharCode(65 + i)}. {option}</span>
              <input
                type="radio"
                name={`homefour-question-${currentQuestionIndex}`}
                className="h-5 w-5"
                checked={selectedResponses[currentQuestionIndex] === option}
                onChange={() => handleOptionClick(option)}
              />
            </label>
          ))}
        </div>

        {/* Navigation Buttons at the bottom of the white frame */}
        <div className="flex justify-between w-full mt-auto pt-6 pb-4">
          {currentQuestionIndex > 0 && (
            <button onClick={handlePrevious} className='bg-[#6c63ff] text-white px-6 py-3 rounded-xl'>
              Previous
            </button>
          )}
          {currentQuestionIndex < Questions.length - 1 && (
            <button onClick={handleNext} className='bg-[#6c63ff] text-white px-6 py-3 rounded-xl' disabled={!selectedResponses[currentQuestionIndex]}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Homefour;