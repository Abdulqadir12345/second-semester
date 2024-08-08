document.addEventListener('DOMContentLoaded', () => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const totalPrice = localStorage.getItem('totalPrice') || '0.00';

  const orderSummaryTable = document.getElementById('order-summary-table').querySelector('tbody');
  const totalPriceElement = document.getElementById('total-price');

  function updateOrderSummaryTable(items) {
      orderSummaryTable.innerHTML = '';

      items.forEach(item => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${item.name}</td>
              <td>${item.quantity}</td>
              <td>$${item.pricePerUnit.toFixed(2)}</td>
              <td>$${item.totalItemPrice.toFixed(2)}</td>
          `;
          orderSummaryTable.appendChild(row);
      });
  }

  updateOrderSummaryTable(cartItems);
  totalPriceElement.textContent = totalPrice;
});
