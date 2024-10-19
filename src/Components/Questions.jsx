import React, { useState, useEffect } from 'react';
import { db } from './firebase'; // Import your Firestore configuration
import { doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

function Questions({ question, selectedOptions, handleQuestion, index, goToPreviousQuestion, canGoBack, goToNextQuestion, image, totalQuestions }) {
  const options = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];

  const [selected, setSelected] = useState(selectedOptions.length > 0 ? selectedOptions[index] : '');
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [progressColor, setProgressColor] = useState('#9676cd');

  useEffect(() => {
    setProgressPercentage((index / totalQuestions) * 100);
  }, [index, totalQuestions]);

  const handleOptionClick = (option) => {
    setSelected(option);
    handleQuestion(index, option);
  };

  const storeResponse = async () => {
    const auth = getAuth();
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
          [`question_${index + 1}`]: selected,
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
    goToNextQuestion();
  };

  return (
    <div className='h-[100vh] w-[100vw] overflow-hidden bg-[#7A4BC8] flex flex-col items-center'>
      {/* Question Frame */}
      <div className='relative h-[85vh] w-[90vw] bg-white rounded-[20px] mt-6 flex flex-col items-center p-6'>
         
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
          <button onClick={handleNext} className='bg-[#6c63ff] text-white px-6 py-3 rounded-xl' disabled={!selected}>
            Next
          </button>
        </div>

      </div>
    </div>
  );
}

export default Questions;