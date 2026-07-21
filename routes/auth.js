const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sql, poolPromise } = require('../db');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const pool = await poolPromise;
    await pool.request()
      .input('fullName', sql.NVarChar, fullName)
      .input('email', sql.NVarChar, email)
      .input('hash', sql.NVarChar, hash)
      .query('INSERT INTO Users (FullName, Email, PasswordHash) VALUES (@fullName, @email, @hash)');
    res.status(201).json({ message: 'Account created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const pool = await poolPromise;
    const result = await pool.request()
      .input('email', sql.NVarChar, email)
      .query('SELECT * FROM Users WHERE Email = @email');

    const user = result.recordset[0];
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.PasswordHash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.UserId }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token, fullName: user.FullName });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;