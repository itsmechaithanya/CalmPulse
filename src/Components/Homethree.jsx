import React, { useState, useEffect } from 'react';
import { db } from './firebase'; // Import Firestore
import { doc, setDoc } from 'firebase/firestore';

function Homethree({ Questions }) {
  const [selectedResponses, setSelectedResponses] = useState(Array(Questions.length).fill(''));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [progressColor, setProgressColor] = useState('blue'); // Initial color

  useEffect(() => {
    setProgressPercentage((currentQuestionIndex / Questions.length) * 100);
  }, [currentQuestionIndex, Questions.length]);

  const handleOptionClick = (option) => {
    const updatedResponses = [...selectedResponses];
    updatedResponses[currentQuestionIndex] = option;
    setSelectedResponses(updatedResponses);
  };

  const storeResponse = async () => {
    const userId = '72pRtYkv1JZXNDzjTVvx762imIi2'; // Replace with dynamic user ID as needed
    if (!userId) {
      console.error("User ID is not defined.");
      return;
    }

    try {
      const userDocRef = doc(db, 'Users', userId);
      await setDoc(userDocRef, {
        responses: {
          [`homethree_question_${currentQuestionIndex + 1}`]: selectedResponses[currentQuestionIndex],
        },
      }, { merge: true });
      console.log("Response stored successfully.");
    } catch (error) {
      console.error("Error storing response:", error);
    }
  };

  const handleNext = async () => {
    await storeResponse();
    setProgressColor('#9676cd'); // Change progress color
    setCurrentQuestionIndex(prev => Math.min(prev + 1, Questions.length - 1));
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className='h-[100vh] w-[100vw] overflow-hidden bg-[#7A4BC8] flex flex-col items-center'>
      {/* Progress Bar */}
      <div className="w-[90vw] h-3 bg-gray-200 mt-12 relative">
        <div
          className="h-full"
          style={{
            width: `${progressPercentage}%`,
            backgroundColor: progressColor,
            transition: 'width 0.3s ease, background-color 0.3s ease',
          }}
        />
      </div>

      {/* Question Frame */}
      <div className='relative h-[75vh] w-[90vw] bg-[#9676cd] rounded-[2vh] mt-14'>
        <h1 className='pt-[5vh] px-[2.5vh] text-white text-[40px] text-left'>
          {Questions[currentQuestionIndex]?.question || 'Loading...'}
        </h1>
        <div className='flex flex-col items-start mt-[4vh] pl-[2.5vh] text-left'>
          {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map((option, i) => (
            <label key={i} className="cursor-pointer flex items-center space-x-3 my-4">
              <input
                type="radio"
                name={`homethree-question-${currentQuestionIndex}`}
                className="h-5 w-5"
                checked={selectedResponses[currentQuestionIndex] === option}
                onChange={() => handleOptionClick(option)}
              />
              <span className={`text-white text-[25px] leading-7 ${selectedResponses[currentQuestionIndex] === option ? 'font-bold' : 'font-light'}`}>
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      {currentQuestionIndex > 0 && (
        <button onClick={handlePrevious} className='bg-gray-500 text-white px-4 py-2 rounded absolute bottom-5 left-5'>
          Previous
        </button>
      )}
      {currentQuestionIndex < Questions.length - 1 && (
        <button onClick={handleNext} className='bg-blue-500 text-white px-4 py-2 rounded absolute bottom-5 right-5'>
          Next
        </button>
      )}
    </div>
  );
}

export default Homethree;