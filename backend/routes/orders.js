const express = require('express');
const db = require('../db');

const router = express.Router();

router.post('/', (req, res) => {
  const { phone, size, payment_method } = req.body;

  if (!phone || !size || !payment_method) {
    return res.status(400).json({ error: 'Missing data' });
  }

  const price = size === 'small' ? 5 : 7;

  db.run(
    `INSERT INTO orders (phone, size, price, payment_method, status)
     VALUES (?, ?, ?, ?, ?)`,
    [phone, size, price, payment_method, 'Pending'],
    function () {
      // 🔔 SMS will be triggered here later
      console.log(`📩 SMS sent to ${phone}: Order confirmed - ${price} birr`);

      res.json({
        success: true,
        orderId: this.lastID,
        price
      });
    }
  );
});

module.exports = router;
