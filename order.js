document.addEventListener('DOMContentLoaded', () => {
    const cartTable = document.getElementById('cart-table').querySelector('tbody');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;

    document.getElementById('add-to-cart').addEventListener('click', () => {
        const form = document.getElementById('order-form');
        const formData = new FormData(form);
        let cartItems = [];
        totalPrice = 0; // Reset total price for the new calculation

        formData.forEach((value, key) => {
            if (value && !isNaN(value) && value > 0) {
                const inputElement = form.querySelector(`[name="${key}"]`);
                const pricePerUnit = parseFloat(inputElement.getAttribute('data-price'));
                const quantity = parseFloat(value);
                const totalItemPrice = pricePerUnit * quantity;

                cartItems.push({
                    name: key.charAt(0).toUpperCase() + key.slice(1),
                    quantity,
                    pricePerUnit,
                    totalItemPrice
                });

                totalPrice += totalItemPrice;
            }
        });

        updateCartTable(cartItems);
        updateTotalPrice();
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Store cart items in localStorage
        localStorage.setItem('totalPrice', totalPrice.toFixed(2)); // Store total price in localStorage
    });

    document.getElementById('add-to-favourites').addEventListener('click', () => {
        const form = document.getElementById('order-form');
        const formData = new FormData(form);
        let favouriteItems = {};

        formData.forEach((value, key) => {
            if (value && !isNaN(value) && value > 0) {
                const inputElement = form.querySelector(`[name="${key}"]`);
                const pricePerUnit = parseFloat(inputElement.getAttribute('data-price'));
                const quantity = parseFloat(value);

                favouriteItems[key] = {
                    quantity,
                    pricePerUnit
                };
            }
        });

        localStorage.setItem('favourites', JSON.stringify(favouriteItems));
        alert('Items have been added to favourites!');
    });

    document.getElementById('apply-favourites').addEventListener('click', () => {
        const favourites = JSON.parse(localStorage.getItem('favourites')) || {};
        const form = document.getElementById('order-form');

        let cartItems = [];
        totalPrice = 0; // Reset total price for the new calculation

        Object.keys(favourites).forEach(key => {
            const inputElement = form.querySelector(`[name="${key}"]`);
            if (inputElement) {
                inputElement.value = favourites[key].quantity;

                const pricePerUnit = favourites[key].pricePerUnit;
                const quantity = favourites[key].quantity;
                const totalItemPrice = pricePerUnit * quantity;

                cartItems.push({
                    name: key.charAt(0).toUpperCase() + key.slice(1),
                    quantity,
                    pricePerUnit,
                    totalItemPrice
                });

                totalPrice += totalItemPrice;
            }
        });

        updateCartTable(cartItems);
        updateTotalPrice();
        alert('Favourites have been applied!');
    });

    document.getElementById('buy-now').addEventListener('click', () => {
        window.location.href = 'checkout.html';
    });

    function updateCartTable(items) {
        cartTable.innerHTML = '';

        items.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.pricePerUnit.toFixed(2)}</td>
                <td>$${item.totalItemPrice.toFixed(2)}</td>
            `;
            cartTable.appendChild(row);
        });
    }

    function updateTotalPrice() {
        totalPriceElement.textContent = totalPrice.toFixed(2);
    }
});
