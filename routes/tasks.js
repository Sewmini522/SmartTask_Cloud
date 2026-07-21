const express = require('express');
const jwt = require('jsonwebtoken');
const { sql, poolPromise } = require('../db');
const router = express.Router();

function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    req.userId = jwt.verify(token, process.env.JWT_SECRET).userId;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Get all tasks for the logged-in user
router.get('/', auth, async (req, res) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('userId', sql.Int, req.userId)
    .query('SELECT * FROM Tasks WHERE UserId = @userId ORDER BY DueDate ASC');
  res.json(result.recordset);
});

// Add a new task
router.post('/', auth, async (req, res) => {
  const { title, description, dueDate, reminderType, fileUrl } = req.body;
  const pool = await poolPromise;
  await pool.request()
    .input('userId', sql.Int, req.userId)
    .input('title', sql.NVarChar, title)
    .input('description', sql.NVarChar, description)
    .input('dueDate', sql.DateTime, dueDate)
    .input('reminderType', sql.NVarChar, reminderType)
    .input('fileUrl', sql.NVarChar, fileUrl)
    .query(`INSERT INTO Tasks (UserId, Title, Description, DueDate, ReminderType, FileUrl)
            VALUES (@userId, @title, @description, @dueDate, @reminderType, @fileUrl)`);
  res.status(201).json({ message: 'Task added' });
});

// Update a task (edit or mark complete)
router.put('/:id', auth, async (req, res) => {
  const { title, description, dueDate, status } = req.body;
  const pool = await poolPromise;
  await pool.request()
    .input('id', sql.Int, req.params.id)
    .input('title', sql.NVarChar, title)
    .input('description', sql.NVarChar, description)
    .input('dueDate', sql.DateTime, dueDate)
    .input('status', sql.NVarChar, status)
    .query(`UPDATE Tasks SET Title=@title, Description=@description,
            DueDate=@dueDate, Status=@status WHERE TaskId=@id`);
  res.json({ message: 'Task updated' });
});

// Delete a task
router.delete('/:id', auth, async (req, res) => {
  const pool = await poolPromise;
  await pool.request().input('id', sql.Int, req.params.id)
    .query('DELETE FROM Tasks WHERE TaskId=@id');
  res.json({ message: 'Task deleted' });
});

// Get tasks due within the next hour that haven't been reminded yet
router.get('/due-soon', async (req, res) => {
  const pool = await poolPromise;
  const result = await pool.request().query(`
    SELECT Tasks.TaskId, Tasks.Title, Tasks.DueDate, Users.Email, Users.FullName
    FROM Tasks
    JOIN Users ON Tasks.UserId = Users.UserId
    WHERE Tasks.ReminderSent = 0
      AND Tasks.Status = 'Pending'
      AND Tasks.DueDate BETWEEN GETDATE() AND DATEADD(HOUR, 1, GETDATE())
  `);
  res.json(result.recordset);
});

// Mark a task's reminder as sent
router.put('/:id/reminder-sent', async (req, res) => {
  const pool = await poolPromise;
  await pool.request().input('id', sql.Int, req.params.id)
    .query('UPDATE Tasks SET ReminderSent = 1 WHERE TaskId = @id');
  res.json({ message: 'Marked as sent' });
});

module.exports = router;