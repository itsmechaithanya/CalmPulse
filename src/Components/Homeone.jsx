import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase'; // Import Firestore and Auth
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function Homeone({ Questions }) {
  // Check if Questions is defined and has a length
  const questionCount = Questions && Questions.length ? Questions.length : 0; // Safely get the length
  const [selectedResponses, setSelectedResponses] = useState(Array(questionCount).fill(''));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [userName, setUserName] = useState(''); // State for user's name
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    setProgressPercentage((currentQuestionIndex / questionCount) * 100);
  }, [currentQuestionIndex, questionCount]);

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
    updatedResponses[currentQuestionIndex] = option;
    setSelectedResponses(updatedResponses);
    console.log(`Option selected: ${option}`); // Log the selected option
  };

  const getScore = (option) => {
    // Define the special scoring for specific questions
    const specialQuestions = [1, 2, 5, 8, 11, 15, 16, 19, 20];
    const isSpecialQuestion = specialQuestions.includes(currentQuestionIndex + 1); // Check for 1-based index

    if (isSpecialQuestion) {
      switch (option) {
        case 'Strongly Disagree':
          return 4;
        case 'Disagree':
          return 3;
        case 'Neutral':
          return 0;
        case 'Agree':
          return 2;
        case 'Strongly Agree':
          return 1;
        default:
          return 0;
      }
    } else {
      // Default scoring
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
    }
  };

  const storeResponse = async () => {
    const user = auth.currentUser;

    if (!user) {
      console.error("User is not authenticated.");
      return;
    }

    const userId = user.uid;
    const score = getScore(selectedResponses[currentQuestionIndex]); // Get score based on selected response
    const questionIndex = currentQuestionIndex + 1; // Store 1-based index

    try {
      const userDocRef = doc(db, 'Users', userId);
      await setDoc(userDocRef, {
        responses: {
          [`homeone_question_${questionIndex}`]: {
            option: selectedResponses[currentQuestionIndex],
            score: score,
            index: questionIndex, // Store the question index
          },
        },
      }, { merge: true });
      console.log(`Response stored: Option: ${selectedResponses[currentQuestionIndex]}, Score: ${score}, Index: ${questionIndex}`);
    } catch (error) {
      console.error("Error storing response:", error);
    }
  };

  const handleNext = async () => {
    await storeResponse(); // Store response when moving to the next question
    setCurrentQuestionIndex(prev => Math.min(prev + 1, questionCount - 1));
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    await storeResponse(); // Store the last response
    const totalScore = selectedResponses.reduce((acc, response) => acc + getScore(response), 0); // Calculate total score
    console.log("Total score from Homeone:", totalScore); // Log total score
    await storeTotalScore(totalScore); // Store total score in Firebase
    navigate('/knowmore'); // Navigate to Knowmore page after submitting
  };

  // Function to store total score in Firebase
  const storeTotalScore = async (totalScore) => {
    const user = auth.currentUser;

    if (!user) {
      console.error("User is not authenticated.");
      return;
    }

    const userId = user.uid;

    try {
      const userDocRef = doc(db, 'Users', userId);
      await setDoc(userDocRef, {
        homeoneTotalScore: totalScore, // Store total score from Homeone
      }, { merge: true });
      console.log("Homeone total score stored successfully.");
    } catch (error) {
      console.error("Error storing Homeone total score:", error);
    }
  };

  return (
    <div className='h-[100vh] w-[100vw] overflow-hidden bg-[#7D3D89] flex flex-col items-center'>
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
              backgroundColor: '#9676cd',
              transition: 'width 0.3s ease',
            }}
          />
        </div>

        {/* Inner Frame for Question */}
        <div className='relative h-[25vh] w-[80vw] bg-[#C489CF] rounded-[20px] flex flex-col justify-center items-center p-6'>
          <h1 className='text-white text-[24px] text-center font-bold'>
            {Questions && Questions.length > 0 ? Questions[currentQuestionIndex]?.question : 'Loading...'}
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
                name={`homeone-question-${currentQuestionIndex}`}
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
            <button onClick={handlePrevious} className='bg-[#9676cd] text-white px-6 py-3 rounded-xl'>
              Previous
            </button>
          )}
          {currentQuestionIndex < questionCount - 1 && (
            <button onClick={handleNext} className='bg-[#9676cd] text-white px-6 py-3 rounded-xl' disabled={!selectedResponses[currentQuestionIndex]}>
              Next
            </button>
          )}
          {currentQuestionIndex === questionCount - 1 && (
            <button onClick={handleSubmit} className='bg-[#9676cd] text-white px-6 py-3 rounded-xl'>
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Homeone;