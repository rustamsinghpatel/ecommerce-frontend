// ===============================
// GET REQUIRED ELEMENTS
// ===============================
const loginToggle = document.getElementById("loginToggle");   
const signupToggle = document.getElementById("signupToggle"); 
const loginForm = document.getElementById("loginForm");       
const signupForm = document.getElementById("signupForm");     


// ===============================
// SWITCH TO LOGIN FORM
// ===============================
loginToggle.addEventListener("click", () => {

  loginForm.classList.add("active");      
  signupForm.classList.remove("active");  

  loginToggle.classList.add("active");    
  signupToggle.classList.remove("active");
});


// ===============================
// SWITCH TO SIGNUP FORM
// ===============================
signupToggle.addEventListener("click", () => {

  signupForm.classList.add("active");     
  loginForm.classList.remove("active");   

  signupToggle.classList.add("active");   
  loginToggle.classList.remove("active");
});


// ==========================================================
// ❌ LOGIN FORM VALIDATION (Disabled - Handled by Firebase)
// ==========================================================

// loginForm.addEventListener("submit", function (e) {
//   e.preventDefault();

//   const email = loginForm.querySelector("input[type='email']").value;
//   const password = loginForm.querySelector("input[type='password']").value;

//   if (!email.includes("@")) {
//     alert("Enter valid email");
//     return;
//   }

//   if (password.length < 8) {
//     alert("Password must be at least 8 characters");
//     return;
//   }

//   alert("Login Successful ✅");
// });


// ==========================================================
// ❌ SIGNUP FORM VALIDATION (Disabled - Handled by Firebase)
// ==========================================================

// signupForm.addEventListener("submit", function (e) {
//   e.preventDefault();

//   const fullName = document.getElementById("fullName");
//   const email = document.getElementById("signupEmail");
//   const password = document.getElementById("signupPassword");
//   const confirmPassword = document.getElementById("confirmPassword");

//   let isValid = true;

//   document.querySelectorAll("#signupForm .error").forEach(err => {
//     err.innerText = "";
//   });

//   if (fullName.value.trim() === "") {
//     fullName.nextElementSibling.innerText = "Full name is required";
//     isValid = false;
//   }

//   const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
//   if (!email.value.match(emailPattern)) {
//     email.nextElementSibling.innerText = "Enter valid email";
//     isValid = false;
//   }

//   const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

//   if (!password.value.match(passwordPattern)) {
//     password.nextElementSibling.innerText =
//       "Min 8 chars, 1 uppercase, 1 lowercase, 1 number";
//     isValid = false;
//   }

//   if (password.value !== confirmPassword.value) {
//     confirmPassword.nextElementSibling.innerText =
//       "Passwords do not match";
//     isValid = false;
//   }

//   if (isValid) {
//     alert("Signup Successful ✅");
//   }
// });