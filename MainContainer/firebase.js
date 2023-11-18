// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNKB5NDaLbelVeJaif4EVtDE60OyvmLRw",
  authDomain: "elements-48f47.firebaseapp.com",
  projectId: "elements-48f47",
  storageBucket: "elements-48f47.appspot.com",
  messagingSenderId: "431925941151",
  appId: "1:431925941151:web:352fac27a1347f62b863aa",
  measurementId: "G-EGX1TF183Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
