import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Landing from './Components/Landing';
import SignUp from './Components/SignUp';
import LoginPage from './Components/LoginPage';
import Details from './Components/Details';
import Home from './Components/Home';
import Questions from './Components/Questions';
import Hometwo from './Components/Hometwo';
import Homethree from './Components/Homethree';
import Homefour from './Components/HomeFour';

import { Link } from 'react-router-dom';

import c1q1 from './assets/Questionsone/selfcare-removebg-preview 1.png';
import c1q2 from './assets/Questionsone/friends-removebg-preview 1.png';
import c1q3 from './assets/Questionsone/file 2.png';
import c1q4 from './assets/Questionsone/laughter-removebg-preview 1.png';
import c1q5 from './assets/Questionsone/irritated-removebg-preview 1.png';
import c1q6 from './assets/Questionsone/C1Q6-removebg-preview.png';
import c1q7 from './assets/Questionsone/C1Q7-removebg-preview.png';
import c1q8 from './assets/Questionsone/C1Q8-removebg-preview.png';
import c1q9 from './assets/Questionsone/C1Q9-removebg-preview.png';
import c1q10 from './assets/Questionsone/C1Q10-removebg-preview.png';
import c1q11 from './assets/Questionsone/C1Q11-removebg-preview.png';
import c1q12 from './assets/Questionsone/C1Q12-removebg-preview.png';
import c1q13 from './assets/Questionsone/C1Q13-removebg-preview.png';

import c2q1 from './assets/Questionstwo/sports-removebg-preview 1.png';
import c2q2 from './assets/Questionstwo/alcohol-removebg-preview 1.png';
import c2q3 from './assets/Questionstwo/money-removebg-preview 1.png';
import c2q4 from './assets/Questionstwo/parent_time_1_-removebg-preview 1.png';
import c2q5 from './assets/Questionstwo/health_issues-removebg-preview 1.png';
import c2q6 from './assets/Questionstwo/C2Q6-removebg-preview.png';
import c2q7 from './assets/Questionstwo/C2Q7-removebg-preview.png';
import c2q8 from './assets/Questionstwo/C2Q8-removebg-preview.png';
import c2q9 from './assets/Questionstwo/C2Q9-removebg-preview.png';
import c2q10 from './assets/Questionstwo/C2Q10-removebg-preview.png';
import c2q11 from './assets/Questionstwo/C2Q11-removebg-preview.png';


import c3q1 from './assets/Questionsthree/studylife-removebg-preview 1.png';
import c3q2 from './assets/Questionsthree/b5d577c99973586884890e1dfa1a3469-removebg-preview 1.png';
import c3q3 from './assets/Questionsthree/class_students-removebg-preview 1.png';
import c3q4 from './assets/Questionsthree/goals-removebg-preview 1.png';
import c3q5 from './assets/Questionsthree/Assignments-removebg-preview 1.png';
import c3q6 from './assets/Questionsthree/C3Q6-removebg-preview.png';
import c3q7 from './assets/Questionsthree/C3Q7-removebg-preview.png';
import c3q8 from './assets/Questionsthree/C3Q8-removebg-preview.png';
import c3q9 from './assets/Questionsthree/C3Q9-removebg-preview.png';
import c3q10 from './assets/Questionsthree/C3Q10-removebg-preview.png';

import c4q1 from './assets/Questionsfour/calm-removebg-preview 1.png';
import c4q2 from './assets/Questionsfour/extreme_incident-removebg-preview 1.png';
import c4q3 from './assets/Questionsfour/heartbeat-removebg-preview 1.png';
import c4q4 from './assets/Questionsfour/weight_loss-removebg-preview 1.png';
import c4q5 from './assets/Questionsfour/Harrassment-removebg-preview 1.png';
import c4q6 from './assets/Questionsfour/C4Q6-removebg-preview.png';
import c4q7 from './assets/Questionsfour/C4Q7-removebg-preview.png';
import c4q8 from './assets/Questionsfour/C4Q8-removebg-preview.png';
import c4q9 from './assets/Questionsfour/C4Q9-removebg-preview.png';

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
    { question: 'Are you unable to rest, relax, or let go things?', imgs: c1q6, Yes: false, No: false},
    { question: 'Do you observe any changes like over eating, over sleeping?', imgs: c1q7, Yes: false, No: false},
    { question: 'Do you observe any changes like poor appetite, less sleeping?', imgs: c1q8, Yes: false, No: false},
    { question: 'Did you cry more often these days?', imgs: c1q9, Yes: false, No: false},
    { question: 'Are able to find some personal time for self care, watching something you like?', imgs: c1q10, Yes: false, No: false},
    { question: 'Did you notice any memory problems or forgetfulness recently ?', imgs: c1q11, Yes: false, No: false},
    { question: 'Do you face any difficulty setting priorities or making decisions?', imgs: c1q12, Yes: false, No: false},
    { question: 'Did you notice anything like impatient with your fellow mates or disrespectful to others?', imgs: c1q13, Yes: false, No: false},
  ];

  const Questionstwo = [
    { question: 'Do you play sports often?', imgs: c2q1, Yes: false, No: false },
    { question: 'Did you start using tobacco, alcohol, or drugs recently?', imgs: c2q2, Yes: false, No: false },
    { question: 'Do you get enough pocket money?', imgs: c2q3, Yes: false, No: false },
    { question: 'Do your parents allow time for you?', imgs: c2q4, Yes: false, No: false },
    { question: 'Are any health issues bothering you?', imgs: c2q5, Yes: false, No: false },
    { question: 'Have you started consuming caffeine or sugars, or increased your intake of them?', imgs: c2q6, Yes: false, No: false },
    { question: 'Do you have a separate room in your house, and do you spend time there often?', imgs: c2q7, Yes: false, No: false },
    { question: 'Are any financial issues bothering you?', imgs: c2q8, Yes: false, No: false },
    { question: 'Are any issues with friends or your love life bothering you?', imgs: c2q9, Yes: false, No: false },
    { question: 'Do you have difficulty concentrating, a limited attention span, or a loss of objectivity?', imgs: c2q10, Yes: false, No: false },
    { question: 'Have you experienced any uncomfortable incidents or situations at your workplace or university where you couldnt inform anyone or find a way to deal with it?', imgs: c2q11, Yes: false, No: false },
  ];

  const Questionsthree = [
    { question: 'How is your study life going?', imgs: c3q1, Yes: false, No: false },
    { question: 'Are you comfortable with campus social life?', imgs: c3q2, Yes: false, No: false },
    { question: 'Do you attend classes regularly?', imgs: c3q3, Yes: false, No: false },
    { question: 'Do you get satisfied with your goals and results?', imgs: c3q4, Yes: false, No: false },
    { question: 'Do you wait until the last minute to complete your assignments?', imgs: c3q5, Yes: false, No: false },
    { question: 'Do you start working on your tasks or assignments as soon as they are assigned?', imgs: c3q6, Yes: false, No: false },
    { question: 'Do you compare your results and hard work with your peers?', imgs: c3q7, Yes: false, No: false },
    { question: 'Do you sometimes avoid working on your tasks, studying, or completing assignments?', imgs: c3q8, Yes: false, No: false },
    { question: 'Do you feel pressured by your study workload or grades?', imgs: c3q9, Yes: false, No: false },
    { question: 'Do you find it difficult to balance your study life?', imgs: c3q10, Yes: false, No: false },

  ];

  const Questionsfour = [
    { question: 'Have you tried any personal methods to calm yourself?', imgs: c4q1, Yes: false, No: false },
    { question: 'Have you experienced a recent incident that made you nervous about safety?', imgs: c4q2, Yes: false, No: false },
    { question: 'Have you noticed increased heart rate, respiration, or blood pressure?', imgs: c4q3, Yes: false, No: false },
    { question: 'Have you seen any sudden weight change?', imgs: c4q4, Yes: false, No: false },
    { question: 'Have you started avoiding activities or places that trigger memories?', imgs: c4q5, Yes: false, No: false },
    { question: 'Have you experienced any upset stomach, nausea, or diarrhea right after eating?', imgs: c4q6, Yes: false, No: false },
    { question: 'Recently, do you feel a decreased resistance to cold, flu, infections, flare-ups of allergies, asthma, or arthritis, or have you experienced hair loss?', imgs: c4q7, Yes: false, No: false },
    { question: 'Lately, do you feel uncoordinated, experience headaches, or get easily startled?', imgs: c4q8, Yes: false, No: false },
    { question: 'Have you noticed any sudden increase or loss in your weight?', imgs: c4q9, Yes: false, No: false },
  ];

  return (
    <Router>
      <ToastContainer />
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
  const { questionSet } = location.state || { questionSet: 'QuestionsOne' };

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
    <div className="h-[100vh] w-[100vw] flex items-center justify-center bg-[#7A4BC8] text-white text-[3vh]">
      <Link to='/hometwo'>
      <button className='bg-black text-white px-[10vh] py-[2vh] text-[2.5vh] rounded-[3vh] absolute top-[65%] left-[25%]'> Go to Cluster-2 </button>
      </Link>
    </div>
  );
}

export default App;
