const express = require('express');
const router = express.Router();
const { updateProfile } = require('../controllers/employer/employerController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

// Route để cập nhật hồ sơ employer (sau khi đăng nhập)
router.put('/profile', authenticateToken, authorizeRole('employer'), updateProfile);

module.exports = router;
