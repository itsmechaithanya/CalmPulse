import React from 'react';

function Questions({ question, img, Yes, No, handleQuestion, index, goToPreviousQuestion, canGoBack }) {

  return (
    <div className='h-screen w-screen overflow-hidden bg-[#7A4BC8]'>
      <div className='flex flex-col items-center justify-center mt-[10vh]'>
        <div className='relative h-[80vh] w-[90vw] bg-[#9676cd] rounded-2xl'>
          <h1 className='pt-[5vh] px-5 text-white text-2xl font-light'>{question}</h1>
          
          {/* Image in the center */}
          <div className='flex items-center justify-center'>
            <img className='pt-[5vh] h-[368px] w-[361px]' src={img} alt="" />
          </div>

          {/* Yes and No buttons centered below the image */}
          <div className='absolute bottom-[50px] left-0 right-0 flex justify-center gap-10'>
            <button
              onClick={() => handleQuestion(index, 'Yes')}
              className={`${Yes ? "bg-[#309b47] font-medium" : "bg-[#7A4BC8]"} w-[130px] h-[50px] rounded-full text-white font-medium text-2xl`}
            >
              Yes
            </button>
            <button
              onClick={() => handleQuestion(index, 'No')}
              className={`${No ? "bg-[#cd3b3b] font-medium" : "bg-[#7A4BC8]"} w-[130px] h-[50px] rounded-full text-white text-2xl`}
            >
              No
            </button>
          </div>
        </div>
      </div>

      {/* Go Back Button */}
      <div className='flex pt-[2vh] pl-[5vw]'>
        {canGoBack && (
          <button onClick={goToPreviousQuestion}>
            <i className="border-4 border-black rounded-full text-5xl ri-arrow-left-line"></i>
          </button>
        )}
      </div>
    </div>
  );
}

export default Questions;
