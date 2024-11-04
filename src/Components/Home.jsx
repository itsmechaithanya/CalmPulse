import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import 'remixicon/fonts/remixicon.css';
import white from '../assets/iPhone 14/c1-removebg-preview 1.png';
import { db, auth } from './firebase'; // Import auth for accessing the authenticated user
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";  // To listen for authentication state changes

function Home() {
  const [userName, setUserName] = useState(''); // State to store the user's name
  const [userId, setUserId] = useState(null); // State to store the user ID
  const questionSet = 'QuestionsOne';

  // Fetch the authenticated user and then fetch the user's name from Firestore
  useEffect(() => {
    const fetchUserData = async (uid) => {
      try {
        console.log("Fetching user data for UID:", uid); // Debug: Check UID
        // Fetch the user's document from Firestore (replace 'Users' with your collection name)
        const userDocRef = doc(db, 'Users', uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          console.log("User data fetched:", userData); // Debug: Check the fetched data
          setUserName(userData.username); // Fetch 'username' instead of 'name'
        } else {
          console.log("No such user document exists!");
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    // Listen for the authentication state to change (user login)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User authenticated:", user); // Debug: Check if user is authenticated
        setUserId(user.uid); // Set the user ID
        fetchUserData(user.uid); // Fetch the user's data from Firestore using the uid
      } else {
        console.log("No user is logged in");
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className='h-screen w-screen bg-[#7A4BC8]'>
      {/* Welcome message that displays the user name */}
      <h1 className='text-2xl font-semibold pt-[6vh] pl-[4vh]'>
        Welcome {userName ? userName : 'Guest'}{' '}
        <i className="ri-shake-hands-fill text-[#fce3c7]"></i>
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
        <Link to="/homeone" state={{ questionSet }}> {/* Updated link to Homeone */}
          <button className='bg-white text-xl px-20 py-4 rounded-full'>
            Ready
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;