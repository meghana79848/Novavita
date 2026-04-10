import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "MOCK_API_KEY",
  authDomain: "mock-vitanova.firebaseapp.com",
  projectId: "mock-vitanova",
  storageBucket: "mock-vitanova.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:mock123"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// For mockup purposes:
export const isMock = true;
