fetch('http://localhost:3000/orders')
  .then(res => res.json())
  .then(data => {
    const table = document.getElementById('orders');
    data.forEach(o => {
      table.innerHTML += `
        <tr>
          <td>${o.phone}</td>
          <td>${o.size}</td>
          <td>${o.price}</td>
          <td>${o.payment_method}</td>
          <td>${o.status}</td>
          <td>
            <button onclick="markDelivered(${o.id})">Delivered</button>
          </td>
        </tr>
      `;
    });
  });

function markDelivered(id) {
  fetch(`http://localhost:3000/orders/${id}`, {
    method: 'PUT'
  }).then(() => location.reload());
}
