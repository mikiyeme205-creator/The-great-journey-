import { useEffect, useState } from 'react';
import { getOrders, updateOrder } from './api';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getOrders();
    setOrders(data);
  }

  async function changeStatus(id, status) {
    await updateOrder(id, status);
    load();
  }

  return (
    <div>
      <h2>የዳቦ ትዕዛዝ አስተዳዳሪ</h2>

      {orders.map(o => (
        <div key={o.id} style={{ border: '1px solid #ccc', margin: 5 }}>
          <p>📞 {o.phone}</p>
          <p>🍞 {o.size}</p>
          <p>💰 {o.price} ብር</p>
          <p>💳 {o.payment_method}</p>
          <p>📦 {o.status}</p>

          <button onClick={() => changeStatus(o.id, 'Delivered')}>
            ተረክቧል
          </button>

          <button onClick={() => changeStatus(o.id, 'Paid')}>
            ተከፍሏል
          </button>
        </div>
      ))}
    </div>
  );
}
