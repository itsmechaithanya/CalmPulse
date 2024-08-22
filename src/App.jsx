import React, { useState } from 'react'
import Landing from './Components/Landing'
import SignUp from './Components/SIgnUp'
import LoginPage from './Components/LoginPage'
import Details from './Components/Details'
import Home from './Components/Home'

function   App() {
  const [data,setdata] = useState([{
    name:'Vaishnavi',
    date:'20/08/24',
    gender:'Female',
    phoneNumber:123456789,
    email:'vaishnavi@gmail.com',
    password:'123456',
  }])

  useState([{
    question:'How long have you been working as a software engineer?',
    
  }])

  return (
    <>
      {/* <Landing/> */}
      {/* <SignUp/> */}
      {/* <LoginPage/> */}
      {/* <Details/> */}
      {data.map((items)=>(
        <Home name={items.name}/>
      ))}
    </>
  )
}

export default App