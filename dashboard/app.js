const ordersTable = document.getElementById('orders');

// ---------------------------
// CONFIG
// ---------------------------
const API = 'https://bread-backend.onrender.com'; // Replace with your backend
const ADMIN_TOKEN_KEY = 'adminToken';

// ---------------------------
// CACHE HELPERS
// ---------------------------
function saveOrdersCache(data) {
  localStorage.setItem('ordersCache', JSON.stringify(data));
}

function loadOrdersCache() {
  const cached = localStorage.getItem('ordersCache');
  return cached ? JSON.parse(cached) : [];
}

// ---------------------------
// DISPLAY ORDERS
// ---------------------------
function displayOrders(data) {
  ordersTable.innerHTML = '';

  if (!data || data.length === 0) {
    ordersTable.innerHTML = '<tr><td colspan="6">No orders available</td></tr>';
    return;
  }

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
            Deliver
          </button>
        </td>
      </tr>
    `;
  });
}

// ---------------------------
// FETCH ORDERS
// ---------------------------
async function fetchOrders() {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);
  if (!token) {
    ordersTable.innerHTML = '<tr><td colspan="6">Admin not logged in</td></tr>';
    return;
  }

  try {
    const res = await fetch(`${API}/admin/orders`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!res.ok) throw new Error('Network response was not ok');

    const data = await res.json();
    saveOrdersCache(data);
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

// ---------------------------
// MARK DELIVERED
// ---------------------------
async function markDelivered(id) {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);
  if (!token) {
    alert('Admin not logged in');
    return;
  }

  try {
    const res = await fetch(`${API}/admin/orders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status: 'DELIVERED' })
    });

    if (!res.ok) throw new Error('Failed to update order');

    // Update cache locally
    let cached = loadOrdersCache();
    cached = cached.map(o => (o.id === id ? { ...o, status: 'DELIVERED' } : o));
    saveOrdersCache(cached);
    displayOrders(cached);
  } catch {
    alert('Cannot update order while offline. Changes will sync when online.');
  }
}

// ---------------------------
// INITIAL LOAD
// ---------------------------
fetchOrders();

// Optional: auto-refresh every 30s if online
setInterval(fetchOrders, 30000);

// ---------------------------
// EXPOSE FUNCTIONS GLOBALLY (for inline HTML buttons)
window.markDelivered = markDelivered;
