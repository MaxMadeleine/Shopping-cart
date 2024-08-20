// Initialize an empty array to store cart items
let cart = [];

// Function to add an item to the cart
function addToCart(productName, productPrice, quantityId) {
    // Get the quantity value from the input field with the specified quantityId
    let quantity = parseInt(document.getElementById(quantityId).value);
    
    // Validate that quantity is at least 1; show alert and return if not
    if (quantity < 1) {
        alert('Quantity must be at least 1.');
        return;
    }

    // Check if the product already exists in the cart based on its name
    const existingItemIndex = cart.findIndex(item => item.name === productName);

    // If the product exists in the cart, update its quantity and total cost
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += quantity;
        cart[existingItemIndex].total = cart[existingItemIndex].price * cart[existingItemIndex].quantity;
    } else {
        // If the product does not exist in the cart, calculate total cost and add it to cart
        const total = productPrice * quantity;
        cart.push({ name: productName, price: productPrice, quantity: quantity, total: total });
    }

    // Update the cart display, show notification, and update cart button text
    updateCart();
    showNotification();
    updateCartButton();
}

// Function to update the cart display
function updateCart() {
    const cartContent = document.getElementById('cart-content');
    const cartTotal = document.getElementById('cart-total');
    cartContent.innerHTML = '';

    // If cart is empty, display a message and return
    if (cart.length === 0) {
        cartContent.innerHTML = '<p>Your cart is empty.</p>';
        cartTotal.textContent = 'Total: $0.00';
        return;
    }

    let totalAmount = 0;

    // Loop through each item in the cart and create HTML elements to display them
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <span>${item.name} - $${item.price.toFixed(2)} each</span>
            <input type="number" min="0" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">
            <span class="remove" onclick="removeFromCart(${index})">x</span>
            <span>Total: $${item.total.toFixed(2)}</span>
        `;
        cartContent.appendChild(itemElement);
        totalAmount += item.total;
    });

    // Update the total amount displayed at the bottom of the cart
    cartTotal.textContent = `Total: $${totalAmount.toFixed(2)}`;
}

// Function to update quantity of an item in the cart
function updateQuantity(index, newQuantity) {
    cart[index].quantity = parseInt(newQuantity);
    // Ensure quantity doesn't go below 0
    if (cart[index].quantity < 0) {
        cart[index].quantity = 0;
    }
    // Update total cost for the item and refresh cart display
    cart[index].total = cart[index].price * cart[index].quantity;
    updateCart();
}

// Function to remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1);  // Remove item from cart array
    updateCart();  // Refresh cart display
}

// Function to toggle visibility of the cart modal
function toggleCartModal() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.classList.toggle('hidden');  // Toggle visibility of modal
}

// Function to show a notification message
function showNotification() {
    const notification = document.getElementById('notification');
    notification.classList.add('visible');  // Make notification visible
    // Hide notification after 2 seconds
    setTimeout(() => {
        notification.classList.remove('visible');
    }, 2000);
}

// Function to simulate checkout process
function checkout() {
    // Alert if cart is empty; otherwise, redirect to payment page with total amount
    if (cart.length === 0) {
        alert('Your cart is empty. Add some items before checking out.');
        return;
    }
    alert('Redirecting to payment page. Total amount: $' + getTotalAmount());
}

// Function to calculate total amount of all items in the cart
function getTotalAmount() {
    let total = 0;
    cart.forEach(item => {
        total += item.total;
    });
    return total.toFixed(2);  // Return total amount formatted to 2 decimal places
}

// Function to update the text of the cart button with the total count of items in the cart
function updateCartButton() {
    const cartButton = document.getElementById('cart-button');
    let totalCount = 0;

    // Calculate total count of items in the cart
    cart.forEach(item => {
        totalCount += item.quantity;
    });

    // Update cart button text with total item count
    cartButton.innerText = `Shopping Cart (${totalCount})`;
}

// Perform initial actions when the window loads
window.onload = function() {
    updateCartButton();  // Update cart button text with initial total item count
};
