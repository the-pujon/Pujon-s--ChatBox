import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "chat-app-538e0.firebaseapp.com",
  projectId: "chat-app-538e0",
  storageBucket: "chat-app-538e0.appspot.com",
  messagingSenderId: "939826166076",
  appId: "1:939826166076:web:32f938fb067de40baa8639",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
