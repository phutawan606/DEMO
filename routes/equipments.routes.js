const express = require('express');
const router = express.Router();
const db = require('../database/db');
const auth = require('../middleware/auth.middleware');

router.use(auth);

// ดึงรายการอุปกรณ์ทั้งหมดของ User ที่ Login
router.get('/', (req, res) => {
  const sql = `SELECT * FROM equipments WHERE user_id = ? ORDER BY expire_date ASC`;
  db.all(sql, [req.user.id], (err, rows) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(rows);
  });
});

// เพิ่มอุปกรณ์
router.post('/', (req, res) => {
  const { name, brand, category, serial_number, buy_date, expire_date, notes } = req.body;
  const sql = `INSERT INTO equipments (user_id, name, brand, category, serial_number, buy_date, expire_date, notes) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  
  db.run(sql, [req.user.id, name, brand, category, serial_number, buy_date, expire_date, notes], function(err) {
    if (err) return res.status(500).json({ message: err.message });
    res.status(201).json({ id: this.lastID, message: 'เพิ่มอุปกรณ์สำเร็จ' });
  });
});

// ลบอุปกรณ์
router.delete('/:id', (req, res) => {
  const sql = `DELETE FROM equipments WHERE id = ? AND user_id = ?`;
  db.run(sql, [req.params.id, req.user.id], function(err) {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: 'ลบอุปกรณ์เรียบร้อย' });
  });
});

module.exports = router;