document.addEventListener("DOMContentLoaded", function () {
    const cartCount = document.querySelectorAll(".cart-count");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    
    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartCount.forEach(count => {
            count.textContent = cart.length;
            count.style.display = cart.length > 0 ? "flex" : "none";
        });
    }
    
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const productCard = this.closest(".product-card");
            const productId = productCard.getAttribute("data-id");
            const productName = productCard.querySelector(".product-name").textContent;
            const productPrice = productCard.querySelector(".product-price").textContent;
            
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            let productExists = cart.find(item => item.id === productId);
            
            if (productExists) {
                productExists.quantity += 1;
            } else {
                cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
            }
            
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
        });
    });
    
    updateCartCount();
});
