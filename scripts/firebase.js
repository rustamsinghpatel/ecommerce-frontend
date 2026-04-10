// ===============================
// FIREBASE IMPORTS
// ===============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";


// ===============================
// FIREBASE CONFIG
// ===============================
const firebaseConfig = {
  apiKey: "AIzaSyDUHs4j15escZLRts5Dmltv4mcjzWzNCtc",
  authDomain: "ecommerce-auth-8ffcf.firebaseapp.com",
  projectId: "ecommerce-auth-8ffcf",
  storageBucket: "ecommerce-auth-8ffcf.firebasestorage.app",
  messagingSenderId: "92498318910",
  appId: "1:92498318910:web:10b6f7cb6e2b314a12e36f"
};


// ===============================
// INITIALIZE FIREBASE
// ===============================
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log("Firebase Connected ✅");


// ===============================
// SIGNUP FUNCTION
// ===============================
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User Created:", userCredential.user);
      alert("Signup Successful ✅");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  });
}


// ===============================
// LOGIN FUNCTION
// ===============================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login Success:", userCredential.user);
      alert("Login Successful ✅");

      // Optional redirect
      window.location.href = "index.html";

    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  });
}


// ===============================
// AUTH STATE CHECK (Auto Login)
// ===============================
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User already logged in:", user.email);
  } else {
    console.log("No user logged in");
  }
});


// ===============================
// LOGOUT FUNCTION (Optional)
// ===============================
window.logoutUser = async function () {
  try {
    await signOut(auth);
    alert("Logged Out ✅");
    window.location.href = "auth.html";
  } catch (error) {
    alert(error.message);
  }
};
// 🚪 Logout
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
    alert("Logged Out Successfully ✅");
    window.location.href = "auth.html";
  } catch (error) {
    alert(error.message);
  }
});