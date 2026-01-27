const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./bread.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      phone TEXT,
      size TEXT,
      price INTEGER,
      payment_method TEXT,
      status TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
