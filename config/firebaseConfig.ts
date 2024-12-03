import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXMT3451znX1Htqy_7ggKewf5FQz_6os8",
  authDomain: "rumoideal-76c7c.firebaseapp.com",
  projectId: "rumoideal-76c7c",
  storageBucket: "rumoideal-76c7c.firebasestorage.app",
  messagingSenderId: "264860515509",
  appId: "1:264860515509:web:9bf26d0f27bb2a170b52fc"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 
const db = getFirestore(app); 

export { db, collection, addDoc, getDocs, deleteDoc, doc };
export { auth };

