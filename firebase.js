// Firebase v9 Modular SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, push, onValue, transaction } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD1EM4rP3PLm14v89Iq-y8QE9RqYWpJJNE",
  authDomain: "phillimon-community.firebaseapp.com",
  databaseURL: "https://phillimon-community-default-rtdb.firebaseio.com",
  projectId: "phillimon-community",
  storageBucket: "phillimon-community.appspot.com",
  messagingSenderId: "294525953038",
  appId: "1:294525953038:web:8f286b605a9a9a130a085f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, push, onValue, transaction };
