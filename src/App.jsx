import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './Components/Landing';
import SignUp from 'src\Components\SignUp.jsx';
import LoginPage from './Components/LoginPage';
import Details from './Components/Details';
import Home from './Components/Home';

function App() {
  const [data, setData] = useState([{
    name: 'Vaishnavi',
    date: '20/08/24',
    gender: 'Female',
    phoneNumber: 123456789,
    email: 'vaishnavi@gmail.com',
    password: '123456',
  }]);

  // The second useState is redundant unless you need to use the data.
  const [questionData, setQuestionData] = useState([{
    question: 'How long have you been working as a software engineer?',
  }]);

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
      </Routes>
    </Router>
  );
}

export default App;
