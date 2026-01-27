const ordersTable = document.getElementById('orders');

// Helper: Save orders to localStorage
function saveOrdersCache(data) {
  localStorage.setItem('ordersCache', JSON.stringify(data));
}

// Helper: Load orders from cache
function loadOrdersCache() {
  const cached = localStorage.getItem('ordersCache');
  return cached ? JSON.parse(cached) : [];
}

// Display orders in table
function displayOrders(data) {
  ordersTable.innerHTML = '';
  data.forEach(o => {
    ordersTable.innerHTML += `
      <tr>
        <td>${o.phone}</td>
        <td>${o.size}</td>
        <td>${o.price}</td>
        <td>${o.payment_method}</td>
        <td>${o.status}</td>
        <td>
          <button onclick="markDelivered(${o.id})" ${o.status !== 'PENDING' ? 'disabled' : ''}>
            Delivered
          </button>
        </td>
      </tr>
    `;
  });
}

// Fetch orders from server
async function fetchOrders() {
  try {
    const res = await fetch('https://digital-bread-delivery-system.netlify.app/orders', {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('adminToken') }
    });
    const data = await res.json();
    saveOrdersCache(data); // save for offline
    displayOrders(data);
  } catch (err) {
    // Offline fallback
    const cached = loadOrdersCache();
    if (cached.length > 0) {
      console.warn('Offline mode: displaying cached orders');
      displayOrders(cached);
    } else {
      ordersTable.innerHTML = '<tr><td colspan="6">No orders available offline</td></tr>';
    }
  }
}

// Mark order as delivered
async function markDelivered(id) {
  try {
    await fetch(`https://digital-bread-delivery-system.netlify.app/orders/${id}`, {
      method: 'PUT',
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('adminToken') }
    });
    // Update cache locally
    let cached = loadOrdersCache();
    cached = cached.map(o => (o.id === id ? { ...o, status: 'DELIVERED' } : o));
    saveOrdersCache(cached);
    displayOrders(cached);
  } catch {
    alert('Cannot update order while offline. Changes will sync when online.');
  }
}

// Initial load
fetchOrders();

// Optional: auto-refresh every 30 seconds if online
setInterval(fetchOrders, 30000);
