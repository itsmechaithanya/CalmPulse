import React from 'react'


function Questions({question,img,Yes,No}) {
  return (
    <div className=' h-screen w-screen bg-[#7A4BC8] overflow-hidden'>
      <div className='flex flex-col items-center justify-center mt-[10vh]'>
      <div className='h-[80vh] w-[90vw] bg-[#9676cd] rounded-2xl'>
      <h1 className='pt-[5vh] px-5 text-white text-2xl font-light'>{question}</h1>
      <img className='pt-[5vh]' src={img} alt="" />
        <div className='flex justify-between pt-[5vh] px-[9vw]'>
          <button onClick={()=>{}} className={`${Yes ? "bg-red-300" : "bg-[#7A4BC8]" } px-8 py-3 rounded-full text-white text-2xl`}>Yes</button>
          <button onClick={()=>{}} className={`${No ? "bg-red-300" : "bg-[#7A4BC8]" } px-8 py-3 rounded-full text-white text-2xl`}>No</button>
        </div>
      </div>
      </div>
      <div className=' flex pt-[2vh] pl-[5vw]'>
        <button><i class=" border-4 border-black rounded-full text-5xl ri-arrow-left-line"></i></button>
      </div>
    </div>
  )
}

export default Questions
