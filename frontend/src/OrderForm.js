import { useState } from 'react';
import { createOrder } from './api';

export default function OrderForm() {
  const [phone, setPhone] = useState('');
  const [size, setSize] = useState('small');
  const [payment, setPayment] = useState('cash');

  async function submit() {
    const data = await createOrder(phone, size, payment);
    alert(`ትዕዛዝ ተሳክቷል። ዋጋ: ${data.price} ብር`);
  }

  return (
    <div>
      <h2>ዳቦ ትዕዛዝ</h2>

      <input
        placeholder="ስልክ ቁጥር"
        onChange={e => setPhone(e.target.value)}
      />

      <select onChange={e => setSize(e.target.value)}>
        <option value="small">ትንሽ – 5 ብር</option>
        <option value="big">ትልቅ – 7 ብር</option>
      </select>

      <select onChange={e => setPayment(e.target.value)}>
        <option value="cash">በመድረሻ ክፍያ</option>
        <option value="telebirr">ቴሌብር</option>
        <option value="cbe">CBE</option>
        <option value="mpesa">M-Pesa</option>
        <option value="other">ሌሎች</option>
      </select>

      <button onClick={submit}>አሁን ይዘዙ</button>
    </div>
  );
}
