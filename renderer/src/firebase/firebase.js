import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBEfXJj1dU_nkMHZVw7q37n-bwYqCc6BrI",
  authDomain: "escobar-systems.firebaseapp.com",
  projectId: "escobar-systems",
  storageBucket: "escobar-systems.appspot.com",
  messagingSenderId: "841601199508",
  appId: "1:841601199508:web:334c61d6b4e46542c0b381",
  measurementId: "G-QFHBJYKKZR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
