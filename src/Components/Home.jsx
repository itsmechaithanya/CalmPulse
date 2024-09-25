import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import 'remixicon/fonts/remixicon.css';
import white from '../assets/iPhone 14/c1-removebg-preview 1.png';
import { db } from './firebase';
import { doc, getDoc } from "firebase/firestore";

function Home() {
  const location = useLocation();
  const [name, setName] = useState("");  // State to hold the username
  const userEmail = location.state?.email; // Retrieve the email passed from the login page

  // Fetch user details from Firestore
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (userEmail) {
        try {
          const userDoc = await getDoc(doc(db, "details", userEmail)); // Fetch user details by email
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setName(userData.username);  // Set the username from Firestore
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user details: ", error);
        }
      } else {
        console.error("No userEmail provided!");
      }
    };

    fetchUserDetails();
  }, [userEmail]);

  return (
    <div className='h-[100vh] w-[100vw] bg-[#7A4BC8]'>
      <h1 className='text-[3vh] font-semibold pt-[6vh] pl-[4vw]'>
        Welcome, {name ? name : "username"} <i className="ri-shake-hands-fill text-[#fce3c7]"></i>
      </h1>
      <h1 className='text-white flex justify-center text-center mt-[5vh] font-light text-[3vh] px-[2vw]'>
        Let's get to know about your feelings
      </h1>
      <div className='flex justify-center'>
        <img src={white} alt="Decorative" className='h-[40vh]' />
      </div>
      <h1 className='text-white flex justify-center text-center mt-[5vh] font-light text-[3vh] capitalize px-[2vw]'>
        You will have to answer a few questions
      </h1>
      <div className='h-[20vh] flex justify-center items-center'>
        <Link to="/questions" state={{ questionSet: 'QuestionsOne' }}> 
          <button className='bg-white text-[2.5vh] px-[10vw] py-[2vh] rounded-[5vh]'>
            Ready
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
