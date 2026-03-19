// ======================================================
// 1️⃣ Page Load Check
// ======================================================
console.log("JS Loaded");


// ======================================================
// 2️⃣ Get Product ID from URL
// Example: product.html?id=3
// ======================================================
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

console.log("Product ID:", productId);


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
// 4️⃣ Cart Count Load on Page Start
// ======================================================
let cart = JSON.parse(localStorage.getItem("cart")) || [];
cartCount.textContent = cart.length;


// ======================================================
// 5️⃣ Variables
// ======================================================
let basePrice = 0;
let quantity = 1;
let currentProduct = null;


// ======================================================
// 6️⃣ Update Total Price Function
// ======================================================
function updateTotalPrice() {

  const totalPrice = basePrice * quantity;

  productPrice.textContent = "₹ " + totalPrice.toFixed(2);

}


// ======================================================
// 7️⃣ Quantity Buttons Events
// ======================================================

// Increase Quantity
plusBtn.addEventListener("click", () => {

  if (quantity < 10) {   // max limit
    quantity++;
    quantityText.textContent = quantity;

    updateTotalPrice();
  }

});


// Decrease Quantity
minusBtn.addEventListener("click", () => {

  if (quantity > 1) {
    quantity--;
    quantityText.textContent = quantity;

    updateTotalPrice();
  }

});


// ======================================================
// 8️⃣ Fetch Product Data from API
// ======================================================
if (productId) {

  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then(res => res.json())
    .then(product => {

      console.log(product);

      currentProduct = product;

      productTitle.textContent = product.title;

      basePrice = product.price;
      productPrice.textContent = "₹ " + basePrice.toFixed(2);

      productDescription.textContent = product.description;

      productImage.src = product.image;

    })

    .catch(err => console.error("Error:", err));

} else {

  console.log("No Product ID found in URL");

}


// ======================================================
// 9️⃣ Add To Cart Event
// ======================================================
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

  cart.push({
    ...currentProduct,
    size: sizeSelect.value,
    color: colorSelect.value,
    quantity: quantity
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  cartCount.textContent = cart.length;

  alert("Product Added to Cart");

});