console.log("Cart JS Loaded");

// ===============================
// 1️⃣ Select Containers
// ===============================
const cartItemsContainer = document.getElementById("cartItems");

// ===============================
// 2️⃣ Get Cart Data
// ===============================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ===============================
// 3️⃣ Save Cart Function
// ===============================
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ===============================
// 4️⃣ Calculate Total
// ===============================
function calculateTotal() {
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
  });

  return total;
}

// ===============================
// 5️⃣ Display Cart Items
// ===============================
function displayCartItems() {

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<h3>Your cart is empty</h3>";
    return;
  }

  cart.forEach((item, index) => {

    let itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");

    itemDiv.innerHTML = `
      <h4>${item.title}</h4>
      <p>Price: ₹ ${item.price}</p>

      <div>
        <button onclick="decreaseQty(${index})">−</button>
        <span>${item.quantity}</span>
        <button onclick="increaseQty(${index})">+</button>
      </div>

      <p>Subtotal: ₹ ${item.price * item.quantity}</p>

      <button onclick="removeItem(${index})">Remove</button>
      <hr>
    `;

    cartItemsContainer.appendChild(itemDiv);
  });

  // Show Total at bottom
  let totalDiv = document.createElement("div");
  totalDiv.innerHTML = `<h2>Total: ₹ ${calculateTotal()}</h2>`;
  cartItemsContainer.appendChild(totalDiv);
}

// ===============================
// 6️⃣ Increase Quantity
// ===============================
function increaseQty(index) {
  cart[index].quantity++;
  saveCart();
  displayCartItems();
}

// ===============================
// 7️⃣ Decrease Quantity
// ===============================
function decreaseQty(index) {

  if (cart[index].quantity > 1) {
    cart[index].quantity--;
    saveCart();
    displayCartItems();
  }
}

// ===============================
// 8️⃣ Remove Item
// ===============================
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  displayCartItems();
}

// ===============================
// 9️⃣ Initial Load
// ===============================
displayCartItems();