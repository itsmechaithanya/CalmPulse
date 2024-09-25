import React from 'react';

function Questions({ question, img, Yes, No, handleQuestion, index, goToPreviousQuestion, canGoBack }) {

  return (
    <div className='h-[100vh] w-[100vw] overflow-hidden bg-[#7A4BC8]'>
      <div className='flex flex-col items-center justify-center mt-[10vh]'>
        <div className='relative h-[80vh] w-[90vw] bg-[#9676cd] rounded-[2vh] mt-[-5vh]'>
          <h1 className='pt-[5vh] px-[2.5vh] text-white text-[3vh] font-light'>{question}</h1>
          
          <div className='flex items-center justify-center h-[46vh] w-[41.6vh]'>
            <img className='pt-[2vh] h-full w-full object-cover overflow-hidden' src={img} alt="" />
          </div>
          <div className='absolute bottom-[6.25vh] left-0 right-0 flex justify-center gap-[5vh]'>
            <button
              onClick={() => handleQuestion(index, 'Yes')}
              className={`${Yes ? "bg-[#309b47] font-medium" : "bg-[#7A4BC8]"} w-[16.25vh] h-[6.25vh] rounded-full text-white font-medium text-[3vh]`}
            >
              Yes
            </button>
            <button
              onClick={() => handleQuestion(index, 'No')}
              className={`${No ? "bg-[#cd3b3b] font-medium" : "bg-[#7A4BC8]"} w-[16.25vh] h-[6.25vh] rounded-full text-white text-[3vh]`}
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
            <i className="border-[0.5vh] border-black rounded-full text-[6.25vh] ri-arrow-left-line"></i>
          </button>
        )}
      </div>
    </div>
  );
}

export default Questions;
