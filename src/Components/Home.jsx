import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import 'remixicon/fonts/remixicon.css';
import white from '../assets/iPhone 14/c1-removebg-preview 1.png';
import { db } from './firebase';
import { doc, getDoc } from "firebase/firestore";

function Home() {
  const location = useLocation();
  const [name, setName] = useState("");  // State to hold the username
  const userId = location.state?.userId; // Retrieve userId (email) passed from Details page

  // Fetch user details from Firestore
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (userId) {
        try {
          const userDoc = await getDoc(doc(db, "details", userId));
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
        console.error("No userId provided!");
      }
    };

    fetchUserDetails();
  }, [userId]);

  return (
    <div className='h-screen w-screen bg-[#7A4BC8]'>
      <h1 className='text-2xl font-semibold pt-[6vh] pl-[4vh]'>
        Welcome, {name ? name : "Guest"} <i className="ri-shake-hands-fill text-[#fce3c7]"></i>
      </h1>
      <h1 className='text-white flex justify-center text-center mt-10 font-light text-2xl px-3'>
        Let's get to know about your feelings
      </h1>
      <div className='flex justify-center'>
        <img src={white} alt="Decorative" />
      </div>
      <h1 className='text-white flex justify-center text-center mt-20 font-light text-2xl capitalize px-3'>
        You will have to answer a few questions
      </h1>
      <div className='h-[20vh] flex justify-center items-center'>
        <Link to="/questions" state={{ questionSet: 'QuestionsOne' }}> 
          <button className='bg-white text-xl px-20 py-4 rounded-full'>
            Ready
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
