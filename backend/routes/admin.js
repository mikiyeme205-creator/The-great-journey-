const express = require('express');
const db = require('../db');
const jwtAuth = require('../middleware/JwtAuth'); // ✅ FIX CASE

const router = express.Router();

// GET all orders
router.get('/orders', jwtAuth, (req, res) => {
  db.all('SELECT * FROM orders', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// UPDATE order status
router.put('/orders/:id', jwtAuth, (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  db.run(
    'UPDATE orders SET status = ? WHERE id = ?',
    [status, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

module.exports = router;
