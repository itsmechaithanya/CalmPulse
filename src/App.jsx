import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './Components/Landing';
import SignUp from './Components/SignUp';
import LoginPage from './Components/LoginPage';
import Details from './Components/Details';
import Home from './Components/Home';
import Questions from './Components/Questions';
import selfCareImage from './assets/iPhone 15/selfcare-removebg-preview 1.png';
import sfd from './assets/iPhone 16/friends-removebg-preview 1.png';
import ygv from './assets/iPhone 17/file 2.png';
import jhwf from './assets/iPhone 18/laughter-removebg-preview 1.png';
import ihb from './assets/iPhone 20/irritated-removebg-preview 1.png';

function App() {
  const [data, setData] = useState([{
    name: 'Vaishnavi',
    date: '20/08/24',
    gender: 'Female',
    phoneNumber: 123456789,
    email: 'vaishnavi@gmail.com',
    password: '123456',
  }]);

  const QuestionsOne = [
    { question: 'Have you seen any change in your self care or stopped doing it?', imgs: selfCareImage, Yes: false, No: false },
    { question: 'Are you feeling difficulty in talking to friends or family or do not feel like to talk with anyone anymore?', imgs: sfd, Yes: false, No: false },
    { question: 'Are you encountering any decrease in your energy levels or feeling lazy or feeling drained?', imgs: ygv, Yes: false, No: false },
    { question: 'Do you observe any increased sense of humor?', imgs: jhwf, Yes: false, No: false },
    { question: 'Are you getting annoyed or irritated easily or more often?', imgs: ihb, Yes: false, No: false },
  ];

  const [questionData, setQuestionData] = useState(QuestionsOne);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleQuestion = (index, answer) => {
    setQuestionData(prev => 
      prev.map((item, i) => 
        i === index 
        ? { ...item, Yes: answer === 'Yes' ? !item.Yes : false, No: answer === 'No' ? !item.No : false }
        : item
      )
    );
    setCurrentQuestionIndex(prev => prev + 1); 
  };

  const goToPreviousQuestion = () => {
    setCurrentQuestionIndex(prev => Math.max(prev - 1, 0)); 
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/details" element={<Details />} />
        <Route 
          path="/home" 
          element={<Home name={data[0].name} />} 
        />
        <Route
          path="/questions"
          element={
            currentQuestionIndex < questionData.length ? (
              <Questions
                index={currentQuestionIndex}
                question={questionData[currentQuestionIndex].question}
                img={questionData[currentQuestionIndex].imgs}
                Yes={questionData[currentQuestionIndex].Yes}
                No={questionData[currentQuestionIndex].No}
                handleQuestion={handleQuestion}
                goToPreviousQuestion={goToPreviousQuestion}
                canGoBack={currentQuestionIndex > 0}
              />
            ) : (
              <div className="h-screen w-screen flex items-center justify-center bg-[#7A4BC8] text-white text-2xl">
                No more questions.
              </div>
            )
          }
        />
      </Routes>
      
    </Router>
  );
}

export default App;