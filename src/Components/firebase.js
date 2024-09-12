// import { initializeApp } from "firebase/app";
// import {getAuth} from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyDtYVawsOtEABSZVLdO3W4gGEgTO2x6AUM",
//   authDomain: "calmpulse-b88ca.firebaseapp.com",
//   projectId: "calmpulse-b88ca",
//   storageBucket: "calmpulse-b88ca.appspot.com",
//   messagingSenderId: "149589104250",
//   appId: "1:149589104250:web:94abdf72d515a30730cdc3",
//   measurementId: "G-EEC5CHBRH8"
// };

// const app = initializeApp(firebaseConfig);

// export const auth=getAuth();
// export default app;

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyDtYVawsOtEABSZVLdO3W4gGEgTO2x6AUM",
  authDomain: "calmpulse-b88ca.firebaseapp.com",
  projectId: "calmpulse-b88ca",
  storageBucket: "calmpulse-b88ca.appspot.com",
  messagingSenderId: "149589104250",
  appId: "1:149589104250:web:94abdf72d515a30730cdc3",
  measurementId: "G-EEC5CHBRH8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export necessary Firebase functions
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, db };
export default app;

