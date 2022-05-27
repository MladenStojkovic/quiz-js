// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHp4Ghz9xde_VZYyUGwdt7GbKip_Er6L0",
  authDomain: "codestantine-f7bc0.firebaseapp.com",
  projectId: "codestantine-f7bc0",
  storageBucket: "codestantine-f7bc0.appspot.com",
  messagingSenderId: "739845041150",
  appId: "1:739845041150:web:51275e7e5df0afbeca6eaf"
};





// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default db;