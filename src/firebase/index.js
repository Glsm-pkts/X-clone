// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { get } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRvymYiuioJphG-n5uOsO0a4qA2nGgd9w",
  authDomain: "twitter-project-57a9e.firebaseapp.com",
  projectId: "twitter-project-57a9e",
  storageBucket: "twitter-project-57a9e.appspot.com",
  messagingSenderId: "252212784056",
  appId: "1:252212784056:web:9528add123c4bc7a397d4d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//kimlik doğrulama yapısının referansını al
export const auth = getAuth(app);

//google provider kurulumu
export const provider = new GoogleAuthProvider();

//veri tabanı refaransını alma
export const db = getFirestore(app);

//storagenin refaransını alma  
export const storage = getStorage(app);

