import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Link } from 'react-router-dom';
import Landing from './Components/Landing';
import SignUp from './Components/SignUp';
import LoginPage from './Components/LoginPage';
import Details from './Components/Details';
import Home from './Components/Home';
import Questions from './Components/Questions';
import Homethree from './Components/Homethree';
import Homefour from './Components/HomeFour';
import Knowmore from './Components/Knowmore';
import Nextlevel from './Components/Nextlevel';
import C1result from './Components/C1result';
import Home3 from './Components/Home3';
import Home4 from './Components/Home4';
import Finalresult from './Components/Finalresult';

function App() {
  const [QuestionsOne, setQuestionsOne] = useState([
    { question: 'I feel calm ', selectedOptions: [] },
    { question: 'I feel secure ', selectedOptions: [] }, 
    { question: 'I feel tense ', selectedOptions: [] }, 
    { question: 'I feel strained ', selectedOptions: [] }, 
    { question: 'I feel at ease ', selectedOptions: [] }, 
    { question: 'I feel upset ', selectedOptions: [] }, 
    { question: 'I am presently worrying over possible misfortunes ', selectedOptions: [] }, 
    { question: 'I feel satisfied ', selectedOptions: [] }, 
    { question: 'I feel frightened ', selectedOptions: [] }, 
    { question: 'I feel uncomfortable ', selectedOptions: [] }, 
    { question: 'I feel self confident ', selectedOptions: [] }, 
    { question: 'I feel nervous ', selectedOptions: [] }, 
    { question: 'I feel jittery ', selectedOptions: [] },
    { question: 'I feel indecisive ', selectedOptions: [] },
    { question: 'I am relaxed ', selectedOptions: [] },
    { question: 'I feel content ', selectedOptions: [] },
    { question: 'I am worried ', selectedOptions: [] },
    { question: 'I feel confused ', selectedOptions: [] },
    { question: 'I feel steady ', selectedOptions: [] },
    { question: 'I feel pleasant ', selectedOptions: [] },
   
    // Add more questions as needed
  ]);

  const [Questionsthree, setQuestionsthree] = useState([
    { question: 'Teachers make too many extra demands on students.', selectedOptions: [] },
    { question: 'Lack of concentration during study hours.', selectedOptions: [] },
    { question: 'Difficulty in remembering all that is studied.', selectedOptions: [] },
    { question: 'Worrying about the examinations.', selectedOptions: [] },
    { question: 'Conflict with friends/college authorities.', selectedOptions: [] },
    { question: 'Worry about results after examinations.', selectedOptions: [] },
    { question: 'Hesitate to ask the teacher for detailed explanation.', selectedOptions: [] },
    { question: 'Not knowing how to prepare for the examinations.', selectedOptions: [] },
    { question: 'Lack of assertiveness (confidence) in the class.', selectedOptions: [] },
    { question: 'Slow in getting along with the curriculum.', selectedOptions: [] },
    { question: 'Unable to complete the assignment in time.', selectedOptions: [] },
    { question: 'Lack of mutual help among classmates.', selectedOptions: [] },
    { question: 'Lack of fluency while speaking the language other than the mother tongue.', selectedOptions: [] },
    { question: 'Difficulty in adjusting with opposite gender.', selectedOptions: [] },
    { question: 'Eleventh hour preparation for the examinations.', selectedOptions: [] },
    { question: 'Unable to discuss Academic failures with parents.', selectedOptions: [] },
    { question: 'Change in relation with others.', selectedOptions: [] },
    { question: 'Roommate conflict.', selectedOptions: [] },
    // Add more questions as needed
  ]);

  const [Questionsfour, setQuestionsfour] = useState([
    { question: 'I have recently experienced an accident of some kind?', selectedOptions: [] }, 
    { question: 'I feel nervous about my safety after the accident?', selectedOptions: [] },
    { question: 'I feel anxious about my surrounding environment after the accident?', selectedOptions: [] },
    { question: 'I have noticed changes in myself recently?', selectedOptions: [] }, 
    { question: 'I avoid certain activities that trigger memories?', selectedOptions: [] }, 
    { question: 'I avoid certain places that remind me of past events?', selectedOptions: [] }, 
    { question: 'I have been fighting with my boyfriend/ Girlfriend?', selectedOptions: [] }, 
    // Add more questions as needed
  ]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/knowmore" element={<Knowmore />} />
        <Route path="/nextlevel" element={<Nextlevel />} />
        <Route path="/c1result" element={<C1result />} />
        <Route path="/home3" element={<Home3 />} />
        <Route path="/home4" element={<Home4 />} />
        <Route path="/details" element={<Details />} />
        <Route path="/finalresult" element={<Finalresult />} />
        <Route path="/home" element={<Home />} />
        <Route path="/homethree" element={
  <Homethree Questions={Questionsthree} />
} />

<Route path="/homefour" element={
  <Homefour Questions={Questionsfour} />
} />

        <Route path="/questions" element={
          <QuestionsWrapper
            QuestionsOne={QuestionsOne}
            Questionsthree={Questionsthree}
            Questionsfour={Questionsfour}
          />
        } />
      </Routes>
    </Router>
  );
}

function QuestionsWrapper({ QuestionsOne, Questionstwo, Questionsthree, Questionsfour }) {
  const location = useLocation();
  const { questionSet } = location.state || { questionSet: 'QuestionsOne' };

  const [questionData, setQuestionData] = useState(() => {
    if (questionSet === 'QuestionsOne') return QuestionsOne;
    if (questionSet === 'Questionsthree') return Questionsthree;
    if (questionSet === 'Questionsfour') return Questionsfour;
    return QuestionsOne;
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleQuestion = (index, selectedOption) => {
    console.log(`Selected option for question ${index}: ${selectedOption}`);

    setQuestionData(prev =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              selectedOptions: [selectedOption], // Only one option is selected at a time
            }
          : item
      )
    );
  };

  const goToPreviousQuestion = () => {
    setCurrentQuestionIndex(prev => Math.max(prev - 1, 0));
  };

  const goToNextQuestion = () => {
    setCurrentQuestionIndex(prev => Math.min(prev + 1, questionData.length - 1));
  };

  return currentQuestionIndex < questionData.length ? (
    <Questions
      index={currentQuestionIndex}
      question={questionData[currentQuestionIndex].question}
      selectedOptions={questionData[currentQuestionIndex].selectedOptions}
      handleQuestion={handleQuestion}
      goToPreviousQuestion={goToPreviousQuestion}
      canGoBack={currentQuestionIndex > 0}
      goToNextQuestion={goToNextQuestion}
    />
  ) : (
    <div className="h-screen w-screen flex items-center justify-center bg-[#7A4BC8] text-white text-2xl">
      <Link to='/homethree'>
        <button className='bg-black text-white px-20 py-4 text-xl rounded-2xl absolute top-[62%] left-[23%]'> Go to Cluster-2 </button>
      </Link>
    </div>
  );
}

export default App;