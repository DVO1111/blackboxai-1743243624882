// Cart functionality
document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.cart-items');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    const cartSubtotal = document.querySelector('.cart-subtotal');

    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Render cart items
    function renderCart() {
        if (cart.length === 0) {
            emptyCartMessage.classList.remove('hidden');
            cartSubtotal.textContent = '$0.00';
            return;
        }

        emptyCartMessage.classList.add('hidden');
        
        // Clear existing items
        while (cartItemsContainer.firstChild) {
            if (cartItemsContainer.firstChild.classList && 
                cartItemsContainer.firstChild.classList.contains('empty-cart-message')) {
                break;
            }
            cartItemsContainer.removeChild(cartItemsContainer.firstChild);
        }

        // Add current cart items
        let subtotal = 0;
        cart.forEach((item, index) => {
            subtotal += item.price * item.quantity;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'p-6 flex flex-col md:flex-row gap-4';
            cartItem.innerHTML = `
                <div class="flex-shrink-0">
                    <div class="bg-gray-200 h-24 w-24 flex items-center justify-center rounded">
                        <i class="fas fa-mobile-alt text-3xl text-gray-400"></i>
                    </div>
                </div>
                <div class="flex-grow">
                    <h3 class="text-lg font-medium text-gray-800">${item.name}</h3>
                    <p class="text-primary font-bold">$${item.price.toFixed(2)}</p>
                    <div class="mt-2 flex items-center">
                        <button class="quantity-btn decrease px-2 py-1 border border-gray-300 rounded-l" data-index="${index}">
                            <i class="fas fa-minus text-xs"></i>
                        </button>
                        <span class="quantity px-3 py-1 border-t border-b border-gray-300">${item.quantity}</span>
                        <button class="quantity-btn increase px-2 py-1 border border-gray-300 rounded-r" data-index="${index}">
                            <i class="fas fa-plus text-xs"></i>
                        </button>
                    </div>
                </div>
                <div class="flex flex-col items-end">
                    <span class="item-total text-lg font-bold text-primary">$${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="remove-item mt-2 text-red-500 hover:text-red-700 text-sm" data-index="${index}">
                        <i class="fas fa-trash mr-1"></i> Remove
                    </button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        // Update subtotal
        cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;

        // Add event listeners to quantity buttons
        document.querySelectorAll('.quantity-btn').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                const isIncrease = this.classList.contains('increase');
                updateQuantity(index, isIncrease);
            });
        });

        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                removeItem(index);
            });
        });
    }

    // Update item quantity
    function updateQuantity(index, isIncrease) {
        if (isIncrease) {
            cart[index].quantity += 1;
        } else {
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                removeItem(index);
                return;
            }
        }
        saveCart();
        renderCart();
    }

    // Remove item from cart
    function removeItem(index) {
        cart.splice(index, 1);
        saveCart();
        renderCart();
        updateCartCount();
        showNotification('Item removed from cart');
    }

    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Update cart count in header
    function updateCartCount() {
        const cartCount = document.querySelectorAll('.cart-count');
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.forEach(element => {
            element.textContent = totalItems;
            element.classList.toggle('hidden', totalItems === 0);
        });
    }

    // Show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Initial render
    renderCart();
    updateCartCount();
});