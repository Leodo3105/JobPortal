const express = require('express');
const { addIndustry, updateIndustry, deleteIndustry, getAllIndustries } = require('../controllers/admin/industryController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

// Thêm ngành nghề mới (chỉ admin)
router.post('/', authenticateToken, authorizeRole('admin'), addIndustry);

// Cập nhật ngành nghề (chỉ admin)
router.put('/:id', authenticateToken, authorizeRole('admin'), updateIndustry);

// Xóa ngành nghề (chỉ admin)
router.delete('/:id', authenticateToken, authorizeRole('admin'), deleteIndustry);

// Lấy danh sách tất cả ngành nghề (public)
router.get('/', getAllIndustries);

module.exports = router;
