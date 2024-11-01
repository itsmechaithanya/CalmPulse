import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase'; // Import Firestore and Auth
import { doc, getDoc } from 'firebase/firestore';

function Finalresult() {
  const [combinedTotalScore, setCombinedTotalScore] = useState(null);

  useEffect(() => {
    const fetchCombinedScore = async () => {
      const user = auth.currentUser;

      if (!user) {
        console.error("User is not authenticated.");
        return;
      }

      const userId = user.uid;
      const userDocRef = doc(db, 'Users', userId);

      try {
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setCombinedTotalScore(userData.combinedTotalScore || 0);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching combined score:", error);
      }
    };

    fetchCombinedScore();
  }, []);

  return (
    <div className="h-screen w-screen bg-[#7A4BC8] flex justify-center items-center p-4">
      <div className="bg-white rounded-lg p-6 w-[90vw] max-w-md flex flex-col items-center" style={{ height: 'auto' }}>
        
        {/* Header */}
        <h2 className="text-[#7A4BC8] text-4xl font-semibold mb-2 text-center">
          CONGRATULATIONS 🎉
        </h2>
        <p className="text-black text-center mb-4 text-xl">
          You have finished your test.
          By analysing your answers
        </p>

        {/* Stress Effect Circle */}
        <div className="bg-[#CFAAE9] w-full max-w-xs p-6 rounded-lg mb-4 flex flex-col items-center">
          <p className="text-black text-2xl font-semibold mb-2">
            Your Stress Effect Score is
          </p>
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-8 border-[#7ED957] flex items-center justify-center">
              <span className="text-4xl font-bold text-black">{combinedTotalScore !== null ? `${combinedTotalScore}%` : 'Loading...'}</span>
            </div>
          </div>
        </div>

        {/* Advice */}
        <p className="text-center text-[#7A4BC8] font-semibold mb-4 text-2xl">
          “Take a break, Talk about what you feel to people or write it down and delete or it away”💪
        </p>
        <p className="text-center text-black mb-6 text-2xl">
          Hope you get through your thinking or else if you need support you can contact wellness center.📞
        </p>

        {/* Button */}
        <button className="bg-[#EAEAF0] text-[#7A4BC8] font-medium py-2 px-4 rounded-full shadow-md hover:shadow-lg transition-all text-2xl">
          Reach out to wellness center
        </button>
      </div>
    </div>
  );
}

export default Finalresult;