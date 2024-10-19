import React, { useState } from 'react';
import { db } from './firebase'; // Import Firestore
import { doc, setDoc } from 'firebase/firestore';

function Questions({ userId, goToPreviousQuestion, goToNextQuestion }) {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const storeResponse = async () => {
    if (!userId) {
      console.error("User ID is not defined.");
      return; // Early return if userId is not defined
    }

    try {
      const userDocRef = doc(db, 'Users', userId); // Reference to the user's document
      await setDoc(userDocRef, {
        responses: {
          question: selectedOption, // Store the response under the question key
        },
      }, { merge: true }); // Merge with existing data
      console.log("Response stored successfully.");
    } catch (error) {
      console.error("Error storing response:", error);
    }
  };

  const handleNext = async () => {
    await storeResponse();
    goToNextQuestion(); 
  };

  return (
    <div className="bg-purple-700 w-[375px] h-[667px] mx-auto rounded-3xl p-6 shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-white text-lg font-bold">Hi, Vaishnavi</h1>
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <span className="text-xs text-purple-700 font-bold">P</span>
        </div>
      </div>

      {/* Question Box */}
      <div className="bg-purple-400 text-white text-center p-6 rounded-xl mb-6">
        <p className="text-2xl font-bold">I Feel Calm</p>
      </div>

      {/* Options */}
      <div className="space-y-4">
        {['A', 'B', 'C', 'D', 'E'].map((option) => (
          <label key={option} className={`flex items-center p-4 rounded-lg cursor-pointer ${selectedOption === option ? 'bg-green-300' : 'bg-purple-200'}`}>
            <input
              type="radio"
              name="response"
              value={option}
              className="mr-4"
              checked={selectedOption === option}
              onChange={handleOptionChange}
            />
            {option === 'A' ? 'Strongly Disagree' : option === 'B' ? 'Disagree' : option === 'C' ? 'Neutral' : option === 'D' ? 'Agree' : 'Strongly Agree'}
          </label>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button onClick={goToPreviousQuestion} className="bg-purple-800 text-white py-2 px-6 rounded-xl hover:bg-purple-900">
          Previous
        </button>
        <button onClick={handleNext} className="bg-purple-800 text-white py-2 px-6 rounded-xl hover:bg-purple-900" disabled={!selectedOption}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Questions;
