import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase'; // Import Firestore and Auth
import { doc, getDoc } from 'firebase/firestore';

function Finalresult() {
  const [combinedScorePercentage, setCombinedScorePercentage] = useState(null); // State for combined score percentage

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
          setCombinedScorePercentage(userData.combinedScorePercentage || 0); // Fetch combined score percentage
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching combined score:", error);
      }
    };

    fetchCombinedScore();
  }, []);

  // Format the combined score percentage to 1 decimal place
  const formattedScorePercentage = combinedScorePercentage !== null ? combinedScorePercentage.toFixed(1) : 'Loading...';

  return (
    <div className="h-screen w-screen bg-[#7D3D89] flex justify-center items-center p-4 overflow-hidden">
      <div className="bg-white rounded-lg p-6 w-[90vw] max-w-md flex flex-col items-center" style={{ height: 'auto' }}>
        
        {/* Header */}
        <h2 className="text-[#7A4BC8] text-[3vh] font-semibold mb-2 text-center">
          CONGRATULATIONS 🎉
        </h2>
        <p className="text-black text-center mb-4 text-[2vh]">
          You have finished your test.
          By analyzing your answers
        </p>

        {/* Stress Effect Circle */}
        <div className="bg-[#CFAAE9] w-full max-w-xs p-6 rounded-lg mb-4 flex flex-col items-center">
          <p className="text-black text-2xl font-semibold mb-2 text-center">
            Your Stress Effect is
          </p>
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-8 border-[#7ED957] flex items-center justify-center">
              <span className="text-4xl font-bold text-black">{formattedScorePercentage !== 'Loading...' ? `${formattedScorePercentage}%` : 'Loading...'}</span>
            </div>
          </div>
        </div>

        {/* Advice */}
        <p className="text-center text-[#7A4BC8] font-semibold mb-4 text-[2.8vh]">
          {formattedScorePercentage !== 'Loading...' ? (
            parseFloat(formattedScorePercentage) <= 30 ? "Your life seems calm and balanced—keep up the steady pace!" :
            parseFloat(formattedScorePercentage) <= 60 ? "You might be feeling a bit stressed. Try incorporating short naps, nutritious meals, and taking breaks to recharge." :
            parseFloat(formattedScorePercentage) <= 90 ? "It looks like you’re experiencing quite a bit of stress. Engaging in enjoyable activities or considering a visit to a therapist could be helpful." :
            "You may need immediate support. Please reach out to a therapist as soon as possible."
          ) : 'Loading...'}
        </p>

        <p className="text-center text-black mb-6 text-[2vh]">
          Hope you get through your thinking or else if you need support you can contact the wellness center.📞
        </p>

        {/* Button */}
        <button className="bg-[#EAEAF0] text-[#7A4BC8] font-medium py-2 px-4 rounded-full shadow-md hover:shadow-lg transition-all text-[2vh]">
          Reach out to the wellness center
        </button>
      </div>
    </div>
  );
}

export default Finalresult;