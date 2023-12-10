// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9awmWsZLuvfzKEylFn6P8fdCoPdo4wv0",
  authDomain: "es-elements.firebaseapp.com",
  projectId: "es-elements",
  storageBucket: "es-elements.appspot.com",
  messagingSenderId: "406862801097",
  appId: "1:406862801097:web:1a0833b0a61e24981f4518",
  measurementId: "G-CR26CXHJ41",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
