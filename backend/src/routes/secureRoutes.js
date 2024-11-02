const express = require('express');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

router.get('/admin-only', authenticateToken, authorizeRole('admin'), (req, res) => {
  res.json({ message: 'Welcome Admin!' });
});

router.get('/user-profile', authenticateToken, (req, res) => {
  res.json({ message: 'This is your profile', user: req.user });
});

module.exports = router;
