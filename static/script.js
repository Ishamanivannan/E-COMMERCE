/* =========================================================
   EasyShop JavaScript - Cart Logic
   The cart is stored in the browser using localStorage.
   This keeps the backend simple (no login or sessions needed).
   ========================================================= */

// ---------- ADD A PRODUCT TO THE CART ----------
function addToCart(id, name, price, image, quantity) {
    // quantity is optional; if not given, default to 1
    if (!quantity) {
        quantity = 1;
    }

    // Get the current cart from localStorage (or empty array if nothing yet)
    var cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if this product is already in the cart
    var found = false;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            cart[i].quantity += quantity;  // increase the quantity
            found = true;
            break;
        }
    }

    // If not found, add it as a new item
    if (!found) {
        cart.push({
            id: id,
            name: name,
            price: price,
            image: image,
            quantity: quantity
        });
    }

    // Save the cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update the cart count shown in the navbar
    updateCartCount();

    // Show a small message to the user
    alert(name + " added to cart!");
}

// ---------- UPDATE THE CART COUNT IN THE NAVBAR ----------
function updateCartCount() {
    var cart = JSON.parse(localStorage.getItem("cart") || "[]");
    var count = 0;

    // Add up the total quantity of all items
    for (var i = 0; i < cart.length; i++) {
        count += cart[i].quantity;
    }

    // Show the count next to the Cart link
    var countElement = document.getElementById("cart-count");
    if (countElement) {
        countElement.innerText = count;
    }
}

// ---------- RUN WHEN EVERY PAGE LOADS ----------
document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
});
