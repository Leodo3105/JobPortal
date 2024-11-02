const express = require('express');
const router = express.Router();
const jobController = require('../controllers/employer/jobController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

// Route để tạo công việc mới
router.post('/', authenticateToken, authorizeRole('employer'), jobController.createJob);

// Route để lấy danh sách công việc
router.get('/', jobController.getJobs);

// Route để lấy chi tiết một công việc
router.get('/:id', jobController.getJobById);

// Route để cập nhật công việc
router.put('/:id', authenticateToken, authorizeRole('employer'), jobController.updateJob);

// Route để xóa công việc
router.delete('/:id', authenticateToken, authorizeRole('employer'), jobController.deleteJob);

module.exports = router;
