const express = require('express');
const db = require('../db');
const sendSMS = require('../sms/ethio');

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
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      // 📩 Send SMS after successful order
      sendSMS(
        phone,
        `የዳቦ ትዕዛዝዎ ተቀብሏል። መጠን: ${size} | ዋጋ: ${price} ብር`
      );

      res.json({
        success: true,
        orderId: this.lastID,
        price: price
      });
    }
  );
});

module.exports = router;
