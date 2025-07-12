// firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDeKvLsBqZ-kXIcopKyqkqQnBFc4PD_wE0",
  authDomain: "cbchola-kas.firebaseapp.com",
  projectId: "cbchola-kas",
  storageBucket: "cbchola-kas.firebasestorage.app",
  messagingSenderId: "988391521907",
  appId: "1:988391521907:web:4b681dd787af12894b7406",
  measurementId: "G-FGYCSME62E"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
