// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChclYYo-e3WLjfdOoUa96m8-eAyzeefDs",
  authDomain: "spanish-flashcard-22e1a.firebaseapp.com",
  projectId: "spanish-flashcard-22e1a",
  storageBucket: "spanish-flashcard-22e1a.appspot.com",
  messagingSenderId: "503793700467",
  appId: "1:503793700467:web:2819e8d104108affa52406",
  measurementId: "G-E4T4NLZVX4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);