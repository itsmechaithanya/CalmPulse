import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Landing from './Components/Landing';
import SignUp from './Components/SignUp';
import LoginPage from './Components/LoginPage';
import Details from './Components/Details';
import Home from './Components/Home';
import Questions from './Components/Questions';
import Hometwo from './Components/Hometwo';
import Homethree from './Components/Homethree';
import Homefour from './Components/HomeFour';

import c1q1 from './assets/Questionsone/selfcare-removebg-preview 1.png';
import c1q2 from './assets/Questionsone/friends-removebg-preview 1.png';
import c1q3 from './assets/Questionsone/file 2.png';
import c1q4 from './assets/Questionsone/laughter-removebg-preview 1.png';
import c1q5 from './assets/Questionsone/irritated-removebg-preview 1.png';

import c2q1 from './assets/Questionstwo/sports-removebg-preview 1.png';
import c2q2 from './assets/Questionstwo/alcohol-removebg-preview 1.png';
import c2q3 from './assets/Questionstwo/money-removebg-preview 1.png';
import c2q4 from './assets/Questionstwo/parent_time_1_-removebg-preview 1.png';
import c2q5 from './assets/Questionstwo/health_issues-removebg-preview 1.png';

import c3q1 from './assets/Questionsthree/studylife-removebg-preview 1.png';
import c3q2 from './assets/Questionsthree/b5d577c99973586884890e1dfa1a3469-removebg-preview 1.png';
import c3q3 from './assets/Questionsthree/class_students-removebg-preview 1.png';
import c3q4 from './assets/Questionsthree/goals-removebg-preview 1.png';
import c3q5 from './assets/Questionsthree/Assignments-removebg-preview 1.png';

import c4q1 from './assets/Questionsfour/calm-removebg-preview 1.png';
import c4q2 from './assets/Questionsfour/extreme_incident-removebg-preview 1.png';
import c4q3 from './assets/Questionsfour/heartbeat-removebg-preview 1.png';
import c4q4 from './assets/Questionsfour/weight_loss-removebg-preview 1.png';
import c4q5 from './assets/Questionsfour/Harrassment-removebg-preview 1.png';

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
    { question: 'Have you seen any change in your self care or stopped doing it?', imgs: c1q1, Yes: false, No: false },
    { question: 'Are you feeling difficulty in talking to friends or family or do not feel like to talk with anyone anymore?', imgs: c1q2, Yes: false, No: false },
    { question: 'Are you encountering any decrease in your energy levels or feeling lazy or feeling drained?', imgs: c1q3, Yes: false, No: false },
    { question: 'Do you observe any increased sense of humor?', imgs: c1q4, Yes: false, No: false },
    { question: 'Are you getting annoyed or irritated easily or more often?', imgs: c1q5, Yes: false, No: false },
  ];

  const Questionstwo = [
    { question: 'Do you play sports often?', imgs: c2q1, Yes: false, No: false },
    { question: 'Did you start using tobacco, alcohol, or drugs recently?', imgs: c2q2, Yes: false, No: false },
    { question: 'Do you get enough pocket money?', imgs: c2q3, Yes: false, No: false },
    { question: 'Do your parents allow time for you?', imgs: c2q4, Yes: false, No: false },
    { question: 'Are any health issues bothering you?', imgs: c2q5, Yes: false, No: false },
  ];

  const Questionsthree = [
    { question: 'How is your study life going?', imgs: c3q1, Yes: false, No: false },
    { question: 'Are you comfortable with campus social life?', imgs: c3q2, Yes: false, No: false },
    { question: 'Do you attend classes regularly?', imgs: c3q3, Yes: false, No: false },
    { question: 'Do you get satisfied with your goals and results?', imgs: c3q4, Yes: false, No: false },
    { question: 'Do you wait until the last minute to complete your assignments?', imgs: c3q5, Yes: false, No: false },
  ];

  const Questionsfour = [
    { question: 'Have you tried any personal methods to calm yourself?', imgs: c4q1, Yes: false, No: false },
    { question: 'Have you experienced a recent incident that made you nervous about safety?', imgs: c4q2, Yes: false, No: false },
    { question: 'Have you noticed increased heart rate, respiration, or blood pressure?', imgs: c4q3, Yes: false, No: false },
    { question: 'Have you seen any sudden weight change?', imgs: c4q4, Yes: false, No: false },
    { question: 'Have you started avoiding activities or places that trigger memories?', imgs: c4q5, Yes: false, No: false },
  ];

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/details" element={<Details />} />
        <Route path="/home" element={<Home name={data[0].name} />} />
        <Route path="/hometwo" element={<Hometwo />} />
        <Route path="/homethree" element={<Homethree />} />
        <Route path="/homefour" element={<Homefour />} />

        <Route path="/questions" element={<QuestionsWrapper
          QuestionsOne={QuestionsOne}
          Questionstwo={Questionstwo}
          Questionsthree={Questionsthree}
          Questionsfour={Questionsfour}
        />} />
      </Routes>
    </Router>
  );
}


function QuestionsWrapper({ QuestionsOne, Questionstwo, Questionsthree, Questionsfour }) {
  const location = useLocation();
  const { questionSet } = location.state || { questionSet: QuestionsOne };

  const [questionData, setQuestionData] = useState(() => {

    if (questionSet === 'QuestionsOne') return QuestionsOne;
    if (questionSet === 'Questionstwo') return Questionstwo;
    if (questionSet === 'Questionsthree') return Questionsthree;
    if (questionSet === 'Questionsfour') return Questionsfour;
    return QuestionsOne; 
  });
  
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

  return currentQuestionIndex < questionData.length ? (
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
  );
}

export default App;