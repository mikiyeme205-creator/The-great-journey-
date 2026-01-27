const express = require('express');
const db = require('../db');

const router = express.Router();

// Get all orders
router.get('/orders', (req, res) => {
  db.all(`SELECT * FROM orders ORDER BY created_at DESC`, [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// Update order status
router.put('/orders/:id', (req, res) => {
  const { status } = req.body;

  db.run(
    `UPDATE orders SET status = ? WHERE id = ?`,
    [status, req.params.id],
    function () {
      res.json({ updated: this.changes });
    }
  );
});

module.exports = router;
