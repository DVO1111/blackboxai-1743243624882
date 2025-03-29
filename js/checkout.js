document.addEventListener('DOMContentLoaded', () => {
    const orderItemsContainer = document.querySelector('.order-items');
    const orderSubtotal = document.querySelector('.order-subtotal');
    const orderTotal = document.querySelector('.order-total');
    const placeOrderBtn = document.getElementById('place-order');

    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Render order summary
    function renderOrderSummary() {
        // Clear existing items
        while (orderItemsContainer.firstChild) {
            orderItemsContainer.removeChild(orderItemsContainer.firstChild);
        }

        // Calculate subtotal
        let subtotal = 0;
        cart.forEach(item => {
            subtotal += item.price * item.quantity;
            
            const orderItem = document.createElement('div');
            orderItem.className = 'flex justify-between py-2';
            orderItem.innerHTML = `
                <div class="flex items-center">
                    <span class="quantity text-gray-600 mr-2">${item.quantity}x</span>
                    <span class="product-name">${item.name}</span>
                </div>
                <span class="item-total font-medium">$${(item.price * item.quantity).toFixed(2)}</span>
            `;
            orderItemsContainer.appendChild(orderItem);
        });

        // Calculate totals
        const shipping = 9.99;
        const tax = subtotal * 0.1; // 10% tax
        const total = subtotal + shipping + tax;

        // Update displayed totals
        orderSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        document.querySelectorAll('.order-summary div:nth-child(2) span:last-child')[0].textContent = `$${shipping.toFixed(2)}`;
        document.querySelectorAll('.order-summary div:nth-child(3) span:last-child')[0].textContent = `$${tax.toFixed(2)}`;
        orderTotal.textContent = `$${total.toFixed(2)}`;
    }

    // Handle place order button click
    placeOrderBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Validate forms
        const shippingForm = document.getElementById('shipping-form');
        const paymentForm = document.getElementById('payment-form');
        
        if (!shippingForm.checkValidity() || !paymentForm.checkValidity()) {
            alert('Please fill out all required fields correctly.');
            return;
        }

        // In a real application, you would process the payment here
        // For this demo, we'll just show a success message and clear the cart
        alert('Order placed successfully! Thank you for your purchase.');
        
        // Clear the cart
        localStorage.removeItem('cart');
        
        // Redirect to home page
        window.location.href = 'index.html';
    });

    // Initial render
    renderOrderSummary();
});