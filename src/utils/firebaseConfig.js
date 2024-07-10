import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAyXhsoAFqrjgsnp_eIDXqDbc2d99hthc4",
  authDomain: "arpitha-b-t.firebaseapp.com",
  databaseURL: "https://arpitha-b-t-default-rtdb.firebaseio.com",
  projectId: "arpitha-b-t",
  storageBucket: "arpitha-b-t.appspot.com",
  messagingSenderId: "666485800076",
  appId: "1:666485800076:web:d2d0aedf9e1b26dc7b0fa9",
  measurementId: "G-30F2B4P615"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);