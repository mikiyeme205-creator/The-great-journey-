// API base URL (works for local + Netlify)
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// helper to get auth headers
function authHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

export async function createOrder(phone, size, payment_method) {
  const res = await fetch(`${API}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, size, payment_method })
  });

  if (!res.ok) {
    throw new Error('Failed to create order');
  }

  return res.json();
}

export async function getOrders() {
  const res = await fetch(`${API}/admin/orders`, {
    headers: authHeaders()
  });

  if (!res.ok) {
    throw new Error('Failed to fetch orders');
  }

  return res.json();
}

export async function updateOrder(id, status) {
  const res = await fetch(`${API}/admin/orders/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify({ status })
  });

  if (!res.ok) {
    throw new Error('Failed to update order');
  }

  return res.json();
}
