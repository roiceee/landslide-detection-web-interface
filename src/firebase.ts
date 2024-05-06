// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYE92QH6zpBigrnzvH1wfEUfzn8uwp2uc",
  authDomain: "landslide-detection-73262.firebaseapp.com",
  projectId: "landslide-detection-73262",
  storageBucket: "landslide-detection-73262.appspot.com",
  messagingSenderId: "317539191522",
  appId: "1:317539191522:web:0974b41a89de2ebcd86cbb",
  measurementId: "G-VBBSGVR9PP",
  databaseURL: "https://landslide-detection-73262-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
