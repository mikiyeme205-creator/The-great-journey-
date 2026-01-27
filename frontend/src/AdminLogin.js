import { useState } from 'react';

export default function AdminLogin({ onLogin }) {
  const [username, setU] = useState('');
  const [pin, setP] = useState('');

  async function login() {
    const res = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, pin })
    });

    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      onLogin();
    } else alert('Login failed');
  }

  return (
    <div>
      <h3>Admin Login</h3>
      <input placeholder="Username" onChange={e => setU(e.target.value)} />
      <input placeholder="PIN" type="password" onChange={e => setP(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}
