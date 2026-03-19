
// HAMBURGER MENU

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});


// ======================================================
// 🟢 DYNAMIC PRODUCTS (API METHOD)
// ======================================================

const productGrid = document.querySelector(".product-grid");
const statusMsg = document.getElementById("statusMsg");

// FakeStore API se products la rahe hain
fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(products => {

    if (statusMsg) statusMsg.style.display = "none";

    // Sirf 8 products dikhane ke liye
    products.slice(0, 8).forEach(product => {

      // 🔹 1. LINK BANAYA (NEW)
      const link = document.createElement("a");
      link.href = `product.html?id=${product.id}`;
      
      link.style.textDecoration = "none";
      link.style.color = "inherit";

      // 🔹 2. PRODUCT CARD (OLD CODE)
      const div = document.createElement("div");
      div.className = "product-card";

      div.innerHTML = `
        <img src="${product.image}" alt="${product.title}" loading="lazy">
        <h3>${product.title}</h3>
        <p>₹${Math.round(product.price * 80)}</p>
        <button> Add to Cart</button>
      `;

      // 🔹 3. BUTTON CLICK (STOP PAGE REDIRECT)
      const button = div.querySelector("button");
      button.addEventListener("click", (e) => {
        e.preventDefault(); // 🔥 important
        alert(`${product.title} added to cart 🛒`);
      });

      // 🔹 4. CARD KO LINK KE ANDAR DALA
      link.appendChild(div);

      // 🔹 5. LINK KO GRID ME DALA
      productGrid.appendChild(link);
    });

  })
  .catch(error => {
    console.log("API Error:", error);
  });
