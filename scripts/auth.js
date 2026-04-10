// ===============================
// GET REQUIRED ELEMENTS
// ===============================
const loginToggle = document.getElementById("loginToggle");   // Login tab button
const signupToggle = document.getElementById("signupToggle"); // Signup tab button
const loginForm = document.getElementById("loginForm");       // Login form
const signupForm = document.getElementById("signupForm");     // Signup form



// ===============================
// SWITCH TO LOGIN FORM
// ===============================
loginToggle.addEventListener("click", () => {

  loginForm.classList.add("active");      // show login form
  signupForm.classList.remove("active");  // hide signup form

  loginToggle.classList.add("active");    // highlight login button
  signupToggle.classList.remove("active");// remove highlight from signup
});



// ===============================
// SWITCH TO SIGNUP FORM
// ===============================
signupToggle.addEventListener("click", () => {

  signupForm.classList.add("active");     // show signup form
  loginForm.classList.remove("active");   // hide login form

  signupToggle.classList.add("active");   // highlight signup button
  loginToggle.classList.remove("active"); // remove highlight from login
});



// ===============================
// LOGIN FORM VALIDATION
// ===============================
loginForm.addEventListener("submit", function (e) {
  e.preventDefault(); // stop page reload

  const email = loginForm.querySelector("input[type='email']").value;
  const password = loginForm.querySelector("input[type='password']").value;

  // Check email format
  if (!email.includes("@")) {
    alert("Enter valid email");
    return;
  }

  // Check password length
  if (password.length < 8) {
    alert("Password must be at least 8 characters");
    return;
  }

  alert("Login Successful ✅");
});
// ===== Signup Form Validation =====
signupForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const fullName = document.getElementById("fullName");
  const email = document.getElementById("signupEmail");
  const password = document.getElementById("signupPassword");
  const confirmPassword = document.getElementById("confirmPassword");

  let isValid = true;

  // Clear old errors
  document.querySelectorAll("#signupForm .error").forEach(err => {
    err.innerText = "";
  });

  // ===== Full Name =====
  if (fullName.value.trim() === "") {
    fullName.nextElementSibling.innerText = "Full name is required";
    isValid = false;
  }

  // ===== Email =====
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.value.match(emailPattern)) {
    email.nextElementSibling.innerText = "Enter valid email";
    isValid = false;
  }

  // ===== Password =====
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (!password.value.match(passwordPattern)) {
    password.nextElementSibling.innerText =
      "Min 8 chars, 1 uppercase, 1 lowercase, 1 number";
    isValid = false;
  }

  // ===== same as Confirm Password =====
  if (password.value !== confirmPassword.value) {
    confirmPassword.nextElementSibling.innerText =
      "Passwords do not match";
    isValid = false;
  }

  // ===== If All Valid =====
  if (isValid) {
    alert("Signup Successful ✅");
  }
});