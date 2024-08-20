import React, { useState } from 'react'
import Landing from './Components/Landing'
import SignUp from './Components/SIgnUp'
import LoginPage from './Components/LoginPage'
import Details from './Components/Details'
import Home from './Components/Home'

function   App() {
  const [data,setdata] = useState([{
    Name:'Vaishnavi',
    Date:'20/08/24',
    Gender:'Female',
    PhoneNumber:123456789,
    Email:'vaishnavi@gmail.com',
    Password:'123456',
  }])
  return (
    <div>
      {/* <Landing/> */}
      {/* <SignUp/> */}
      {/* <LoginPage/> */}
      {/* <Details/> */}
      <Home/>

    </div>
  )
}

export default App