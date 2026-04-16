const API_URL = "http://localhost:5000/api";

// This array will hold the items the user adds to their cart
let cart = []; 

// 1. Fetch products from your MongoDB database via your API
async function loadProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        const products = await response.json();

        const container = document.getElementById("products-container");
        container.innerHTML = ""; // Clear out any loading text

        // Loop through each product and create an HTML card
        products.forEach(product => {
            const card = document.createElement("div");
            card.className = "card";
            
            // We use string interpolation to inject the exact product details
            card.innerHTML = `
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button class="add-btn" onclick="addToCart('${product._id}', '${product.name}', ${product.price})">
                    Add to Cart
                </button>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading products:", error);
    }
}

// 2. Handle adding items to the shopping cart
function addToCart(id, name, price) {
    // Add the item to our cart array
    cart.push({ id, name, price });
    
    // Update the UI
    updateCartUI();
    alert(`${name} added to cart!`);
}

// 3. Update the cart count and total price in the top right corner
function updateCartUI() {
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartCount.innerText = cart.length;

    // Calculate total price
    let total = 0;
    cart.forEach(item => {
        total += item.price;
    });
    
    cartTotal.innerText = total.toFixed(2);
}

// 4. A placeholder for the checkout process
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    
    alert(`Thank you for your purchase! Total: $${document.getElementById('cart-total').innerText}\n\n(In a full production app, this would redirect to a login screen so we can attach a JWT token to the order!)`);
    
    // Empty the cart
    cart = [];
    updateCartUI();
}

// Call loadProducts immediately when the page loads
loadProducts();