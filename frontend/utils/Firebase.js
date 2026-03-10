
import {getAuth,GoogleAuthProvider} from "firebase/auth"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginonecart-36247.firebaseapp.com",
  projectId: "loginonecart-36247",
  storageBucket: "loginonecart-36247.firebasestorage.app",
  messagingSenderId: "425112450897",
  appId: "1:425112450897:web:221f7361c25489c69a0570"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const provider= new GoogleAuthProvider()

export {auth,provider}