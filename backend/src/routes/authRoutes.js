const express = require('express');
const { register, login } = require('../controllers/admin/authController');
const { lockUser, unlockUser } = require('../controllers/admin/authController'); // Sửa đường dẫn nếu cần
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
// Khóa tài khoản người dùng (chỉ admin)
router.put('/lock/:userId', authenticateToken, authorizeRole('admin'), lockUser);

// Mở khóa tài khoản người dùng (chỉ admin)
router.put('/unlock/:userId', authenticateToken, authorizeRole('admin'), unlockUser);

module.exports = router;
