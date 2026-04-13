// ======================================================
// 1️⃣ Page Load Check
// ======================================================
console.log("Product JS Loaded");


// ======================================================
// 2️⃣ Get Product ID from URL
// ======================================================
const params = new URLSearchParams(window.location.search);
const productId = params.get("id") || 1; // Default to 1 if no id provided


// ======================================================
// 3️⃣ Select DOM Elements
// ======================================================
const productTitle = document.getElementById("productTitle");
const productPrice = document.getElementById("productPrice");
const productDescription = document.getElementById("productDescription");
const productImage = document.getElementById("productImage");

const quantityText = document.getElementById("quantity");
const plusBtn = document.getElementById("plus");
const minusBtn = document.getElementById("minus");

const addToCartBtn = document.getElementById("addToCartBtn");
const cartCount = document.querySelector(".cart-count");

const sizeSelect = document.getElementById("size");
const colorSelect = document.getElementById("color");


// ======================================================
// 4️⃣ Variables
// ======================================================
let basePrice = 0;
let quantity = 1;
let currentProduct = null;


// ======================================================
// 5️⃣ Update Cart Count
// ======================================================
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let totalItems = 0;

  cart.forEach(item => {
    totalItems += Number(item.quantity) || 0;
  });

  if (cartCount) {
    cartCount.textContent = totalItems;
  }
}


// ======================================================
// 6️⃣ Update Total Price
// ======================================================
function updateTotalPrice() {
  if (!basePrice || isNaN(basePrice)) return;

  const totalPrice = basePrice * quantity;

  if (productPrice) {
    productPrice.textContent = "₹ " + totalPrice.toFixed(2);
  }
}


// ======================================================
// 7️⃣ Quantity Buttons
// ======================================================
if (plusBtn) {
  plusBtn.addEventListener("click", () => {
    if (quantity < 10) {
      quantity++;
      quantityText.textContent = quantity;
      updateTotalPrice();
    }
  });
}

if (minusBtn) {
  minusBtn.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      quantityText.textContent = quantity;
      updateTotalPrice();
    }
  });
}


// ======================================================
// 8️⃣ Fetch Product Data (DummyJSON)
// ======================================================
if (productId) {

  fetch(`https://dummyjson.com/products/${productId}`)
    .then(res => res.json())
    .then(product => {

      console.log("Loaded Product:", product);

      currentProduct = product;
      basePrice = Number(product.price);

      if (productTitle) productTitle.textContent = product.title;
      if (productDescription) productDescription.textContent = product.description;

      // 🔥 DummyJSON uses thumbnail
      if (productImage) productImage.src = product.thumbnail;

      updateTotalPrice();
    })
    .catch(err => {
      console.error("API Error:", err);
    });
}


// ======================================================
// 9️⃣ Add To Cart
// ======================================================
if (addToCartBtn) {
  addToCartBtn.addEventListener("click", () => {

    if (!currentProduct) {
      alert("Product not loaded yet");
      return;
    }

    if (!sizeSelect.value || !colorSelect.value) {
      alert("Please select size and color");
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let productData = {
      id: currentProduct.id,
      title: currentProduct.title,
      price: Number(basePrice),
      image: currentProduct.thumbnail,
      size: sizeSelect.value,
      color: colorSelect.value,
      quantity: Number(quantity)
    };

    // Check duplicate (id + size + color)
    let existingItem = cart.find(item =>
      item.id === productData.id &&
      item.size === productData.size &&
      item.color === productData.color
    );

    if (existingItem) {
      existingItem.quantity += productData.quantity;
    } else {
      cart.push(productData);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert("Product Added to Cart ✅");
  });
}


// ======================================================
// 🔟 Initial Load
// ======================================================
updateCartCount();