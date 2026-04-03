// ======================================================
// 🟢 DYNAMIC PRODUCTS (API METHOD)
// ======================================================

const productGrid = document.querySelector(".product-grid");
const statusMsg = document.getElementById("statusMsg");

// DummyJSON API se products la rahe hain
fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {

    const products = data.products; // 🔥 Important

    if (statusMsg) statusMsg.style.display = "none";

    // Sirf 8 products dikhane ke liye
    products.slice(0, 8).forEach(product => {

      console.log("FULL PRODUCT:", product);
      console.log("Price from API:", product.price);

      // 🔹 1. LINK BANAYA
      const link = document.createElement("a");
      link.href = `product.html?id=${product.id}`;
      link.style.textDecoration = "none";
      link.style.color = "inherit";

      // 🔹 2. PRODUCT CARD
      const div = document.createElement("div");
      div.className = "product-card";

      div.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}" loading="lazy">
        <h3>${product.title}</h3>
        <p>₹${Math.round(product.price * 80)}</p>
        <button>Add to Cart</button>
      `;

      // 🔹 3. BUTTON CLICK (STOP PAGE REDIRECT)
      const button = div.querySelector("button");
      button.addEventListener("click", (e) => {
        e.preventDefault();
        alert(`${product.title} added to cart 🛒`);
      });

      // 🔹 4. CARD KO LINK KE ANDAR DALA
      link.appendChild(div);

      // 🔹 5. GRID ME ADD KIYA
      productGrid.appendChild(link);
    });

  })
  .catch(error => {
    console.log("API Error:", error);
  });