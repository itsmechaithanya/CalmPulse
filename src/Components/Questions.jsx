import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase'; // Import your Firestore configuration
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation

function Questions({ question, selectedOptions, handleQuestion, index, goToPreviousQuestion, canGoBack, goToNextQuestion, totalQuestions }) {
  const options = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];
  const optionScores = { 'Strongly Disagree': 1, 'Disagree': 2, 'Neutral': 0, 'Agree': 3, 'Strongly Agree': 4 };

  const [selected, setSelected] = useState(selectedOptions.length > 0 ? selectedOptions[index] : '');
  const [progressColor, setProgressColor] = useState('#D9D9D9'); // Initial progress bar color
  const [userName, setUserName] = useState(''); // State for user's name
  const [userId, setUserId] = useState(null); // State for user ID
  const [totalScore, setTotalScore] = useState(0); // State to keep track of total score
  const navigate = useNavigate(); // Initialize useNavigate hook

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
    setSelected(option);
    handleQuestion(index, option);
    setTotalScore(prevScore => prevScore + optionScores[option]); // Update total score
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
          [`question_${index + 1}`]: {
            option: selected,
            score: optionScores[selected],
          },
        },
      }, { merge: true });
      console.log("Response stored successfully. Score: ", optionScores[selected]);
    } catch (error) {
      console.error("Error storing response:", error);
    }
  };

  const storeTotalScore = async () => {
    const user = auth.currentUser;

    if (!user) {
      console.error("User is not authenticated.");
      return;
    }

    const userId = user.uid;

    try {
      const userDocRef = doc(db, 'Users', userId);
      await setDoc(userDocRef, {
        totalScore: totalScore,
      }, { merge: true });
      console.log("Total score stored successfully: ", totalScore);
    } catch (error) {
      console.error("Error storing total score:", error);
    }
  };

  const handleNext = async () => {
    await storeResponse();
    if (index + 1 < totalQuestions) {
      goToNextQuestion();
    } else {
      await handleSubmit(); // Call handleSubmit if it's the last question
    }
    setProgressColor('#6149A9'); // Change progress bar color on next click
    if (index + 1 === totalQuestions) {
      console.log("Total Score: ", totalScore); // Log the total score after all questions are answered
      await storeTotalScore(); // Store the total score in Firestore
      navigate('/knowmore'); // Navigate to Knowmore page after last question
    }
  };
  return (
    <div className='h-[100vh] w-[100vw] overflow-hidden bg-[#7A4BC8] flex flex-col items-center'>
      {/* Hi, message for user */}
      <h1 className='text-white text-[24px] mt-4 ml-0'>
        Hi, {userName ? userName : 'Guest'}
      </h1>

      {/* Question Frame */}
      <div className='relative h-[85vh] w-[90vw] bg-white rounded-[20px] mt-6 flex flex-col items-center p-6'>
        {/* Progress Bar */}
        <div className='w-full mb-4'>
          <div className='bg-gray-200 rounded-full h-2.5 dark:bg-gray-700'>
            <div className={`bg-[${progressColor}] h-2.5 rounded-full`} style={{ width: `${(index + 1) / totalQuestions * 100}%` }}></div>
          </div>
        </div>

        {/* Inner Frame for Question */}
        <div className='relative h-[25vh] w-[80vw] bg-[#C489CF] rounded-[20px] flex flex-col justify-center items-center p-6'>
          <h1 className='text-white text-[24px] text-center font-bold'>
            {question || 'Loading...'}
          </h1>
        </div>

        {/* Options placed below the question frame */}
        <div className='flex flex-col w-[80vw] mt-6 space-y-4'>
          {options.map((option, i) => (
            <label key={i} className={`cursor-pointer flex items-center justify-between w-full px-5 py-3 rounded-lg text-lg 
                ${selected === option ? 'bg-[#d8f2a1] text-black font-semibold' : 'bg-[#F5F5F5] text-gray-800'}`}>
              <span>{String.fromCharCode(65 + i)}. {option}</span>
              <input
                type="radio"
                name={`question-${index}`}
                className="h-5 w-5"
                checked={selected === option}
                onChange={() => handleOptionClick(option)}
              />
            </label>
          ))}
        </div>

        {/* Navigation Buttons at the bottom of the white frame */} 
        <div className="flex justify-between w-full mt-auto pt-6 pb-4">
          {canGoBack && (
            <button onClick={goToPreviousQuestion} className='bg-[#6c63ff] text-white px-6 py-3 rounded-xl'>
              Previous
            </button>
          )}
          {index + 1 === totalQuestions ? (
            <button onClick={handleSubmit} className='bg-[#6c63ff] text-white px-6 py-3 rounded-xl' disabled={!selected}>
              Submit
            </button>
          ) : (
            <button onClick={handleNext} className='bg-[#6c63ff] text-white px-6 py-3 rounded-xl' disabled={!selected}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Questions;