// ===============================
// HAMBURGER MENU
// ===============================
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});


// ======================================================
// 🔴 STATIC WAY (OLD METHOD) — AB COMMENTED
// ======================================================

// const products = [
//   {
//     name: "T-shirts",
//     price: 499,
//     image: "https://images.pexels.com/photos/4440566/pexels-photo-4440566.jpeg"
//   },
//   {
//     name: "Shoes",
//     price: 799,
//     image: "https://images.pexels.com/photos/26893166/pexels-photo-26893166.jpeg"
//   },
//   {
//     name: "Watch",
//     price: 499,
//     image: "https://images.pexels.com/photos/18509275/pexels-photo-18509275.jpeg"
//   }
// ];

// const productGrid = document.querySelector(".product-grid");

// products.forEach(product => {
//   const div = document.createElement("div");
//   div.className = "product-card";

//   div.innerHTML = `
//     <img src="${product.image}" alt="${product.name}">
//     <h3>${product.name}</h3>
//     <p>₹${product.price}</p>
//     <button>Add to Cart</button>
//   `;

//   productGrid.appendChild(div);
// });


// ======================================================
// 🟢 DYNAMIC WAY (API METHOD) — ACTIVE CODE
// ======================================================

const productGrid = document.querySelector(".product-grid");
const statusMsg = document.getElementById("statusMsg");

// FakeStore API se products la rahe hain
fetch("https://fakestoreapi.com/products")
  .then(res => res.json())          // API response ko JS object me convert
  .then(products => {
    statusMsg.style.display = "none"; // Loading message chhupa do

    // Sirf 8 products dikhane ke liye
    products.slice( 0,8).forEach(product => {

      const div = document.createElement("div");
      div.className = "product-card";

      div.innerHTML = `
        <img src="${product.image}" alt="${product.title}" loading="lazy">
        <h3>${product.title}</h3>
        <p>₹${Math.round(product.price * 80)}</p>
        <button>Add to Cart</button>
      `;

      const button = div.querySelector("button");
      button.addEventListener("click", () => {
        alert(`${product.title} added to cart 🛒`);
      });

      productGrid.appendChild(div);
    });

  })
  .catch(error => {
    console.log("API Error:", error);
  });
