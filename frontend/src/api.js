const API = 'http://localhost:5000';

export async function createOrder(phone, size, payment_method) {
  const res = await fetch(`${API}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, size, payment_method })
  });
  return res.json();
}

export async function getOrders() {
  const res = await fetch(`${API}/admin/orders`);
  return res.json();
}

export async function updateOrder(id, status) {
  await fetch(`${API}/admin/orders/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
}
