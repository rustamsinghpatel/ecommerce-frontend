console.log("Cart JS Loaded");

// ===============================
// 1️⃣ Select Elements
// ===============================
const cartItemsContainer = document.getElementById("cartItems");
const cartTotalElement = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

// ===============================
// 2️⃣ Get Cart Data
// ===============================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ===============================
// 3️⃣ Save Cart
// ===============================
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ===============================
// 4️⃣ Update Navbar Cart Count
// ===============================
function updateCartCount() {
  const cartCount = document.querySelector(".cart-count");
  if (!cartCount) return;

  let totalItems = 0;
  cart.forEach(item => {
    totalItems += Number(item.quantity) || 0;
  });

  cartCount.textContent = totalItems;
}

// ===============================
// 5️⃣ Calculate Total Price
// ===============================
function calculateTotal() {
  let total = 0;

  cart.forEach(item => {
    total += Number(item.price) * Number(item.quantity);
  });

  return total.toFixed(2);
}
// ===============================
// 6️⃣ Display Cart Items
// ===============================
function displayCartItems() {
  cartItemsContainer.innerHTML = "";

  // 🟥 If Cart Empty
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<h3 class='empty-cart'>Your cart is empty</h3>";
    cartTotalElement.textContent = "0.00";

    if (checkoutBtn) {
      checkoutBtn.disabled = true;
      checkoutBtn.style.opacity = "0.6";
      checkoutBtn.style.cursor = "not-allowed";
    }

    updateCartCount();
    return;
  }

  // 🟢 If Cart Has Items
  if (checkoutBtn) {
    checkoutBtn.disabled = false;
    checkoutBtn.style.opacity = "1";
    checkoutBtn.style.cursor = "pointer";
  }

  cart.forEach((item, index) => {

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");

    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.title}" />

      <div class="item-details">
        <h4>${item.title}</h4>
        <p class="item-variation">
          Size: ${item.size} | Color: ${item.color}
        </p>
        <p class="item-price">Price: ₹ ${item.price}</p>

        <div class="qty-controls">
          <button onclick="decreaseQty(${index})">−</button>
          <span>${item.quantity}</span>
          <button onclick="increaseQty(${index})">+</button>
        </div>

        <p class="item-subtotal">
          Subtotal: ₹ ${(item.price * item.quantity).toFixed(2)}
        </p>

        <button class="remove-btn" onclick="removeItem(${index})">
          Remove
        </button>
      </div>
    `;

    cartItemsContainer.appendChild(itemDiv);
  });

  cartTotalElement.textContent = calculateTotal();

  updateCartCount();
}

// ===============================
// 7️⃣ Increase Quantity
// ===============================
function increaseQty(index) {
  cart[index].quantity++;
  saveCart();
  displayCartItems();
}

// ===============================
// 8️⃣ Decrease Quantity
// ===============================
function decreaseQty(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
    saveCart();
    displayCartItems();
  }
}

// ===============================
// 9️⃣ Remove Item
// ===============================
function removeItem(index) {
  if (confirm("Are you sure you want to remove this item?")) {
    cart.splice(index, 1);
    saveCart();
    displayCartItems();
  }
}

// ===============================
// 🔟 Initial Load
// ===============================
displayCartItems();


// ===============================
// 1️⃣1️⃣ Checkout Button Click
// ===============================
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", function () {
    if (cart.length === 0) return; // safety check
    window.location.href = "checkout.html";
  });
}