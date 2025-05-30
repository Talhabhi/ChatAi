// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp , } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkkmTMhU08-fXMQd6t3DwRp1AbJH2qovg",
  authDomain: "notion-app-8487d.firebaseapp.com",
  projectId: "notion-app-8487d",
  storageBucket: "notion-app-8487d.firebasestorage.app",
  messagingSenderId: "479646202021",
  appId: "1:479646202021:web:b04a09c0ff882085b4f54c",
  measurementId: "G-9Q7LEHFQ9W"
};

// Initialize Firebase
const app = getApps().length ===0 ? initializeApp(firebaseConfig):getApp();
const db = getFirestore(app);
export {db};