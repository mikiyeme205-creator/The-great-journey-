const express = require('express');
const db = require('../db');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/orders', auth, (req, res) => {
  db.all(`SELECT * FROM orders ORDER BY created_at DESC`, [], (err, rows) => {
    res.json(rows);
  });
});

router.put('/orders/:id', auth, (req, res) => {
  db.run(
    `UPDATE orders SET status = ? WHERE id = ?`,
    [req.body.status, req.params.id],
    function () {
      res.json({ updated: this.changes });
    }
  );
});

module.exports = router;
