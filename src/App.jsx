import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './Components/Landing';
import SignUp from './Components/SignUp';
import LoginPage from './Components/LoginPage';
import Details from './Components/Details';
import Home from './Components/Home';
import Questions from './Components/Questions'
import selfCareImage from './assets/iPhone 15/selfcare-removebg-preview 1.png';
import sfd from './assets/iPhone 16/friends-removebg-preview 1.png'
import ygv from './assets/iPhone 17/file 2.png'
import jhwf from './assets/iPhone 18/laughter-removebg-preview 1.png'
import ihb from './assets/iPhone 20/irritated-removebg-preview 1.png'

function App() {
  const [data, setData] = useState([{
    name: 'Vaishnavi',
    date: '20/08/24',
    gender: 'Female',
    phoneNumber: 123456789,
    email: 'vaishnavi@gmail.com',
    password: '123456',
  }]);

  const [questionData, setQuestionData] = useState([
    {
    question: 'Have you seen any change in your self care or stopped doing it ?', 
    imgs: selfCareImage, 
    Yes:false,
    No:false,
    },
    {
    question: 'Are you feeling difficulty in  talking to friends or family or do not feel like  to talk with anyone anymore ?', 
    imgs: sfd, 
    Yes:false,
    No:false,
    },
    {
    question: 'Are you encountering any decrease in your energy levels or  feeling lazy or feeling drained ?', 
    imgs: ygv, 
    Yes:false,
    No:false,
    },
    {
    question: 'Do observe any increased sense of humor?', 
    imgs: jhwf, 
    Yes:false,
    No:false,
    },
    {
    question: 'Are you getting annoyed or irritated easily or more often?', 
    imgs: ihb, 
    Yes:false,
    No:false,
    },
]);

  const buttonColor = (buttonType) => {
    setQuestionData((prev) => {
      return prev.map((item) => {
        return {
          ...item,
          Yes: buttonType === "Yes" ? true : false,
          No: buttonType === "No" ? true : false,
        };
      });
    });
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
          element={
            data.map((item, index) => (
              <Home key={index} name={item.name} />
            ))
          }
        />
        <Route path="/questions" 
          element={
            questionData.map((items, index) => (
              <Questions key={index} question={items.question} img={items.imgs} Yes={items.Yes} No={items.No} buttonColor={buttonColor} />
            ))
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
