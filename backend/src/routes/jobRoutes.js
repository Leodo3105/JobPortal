import { Router } from 'express';
const router = Router();
import { createJob, getJobs, getJobById, updateJob, deleteJob } from '../controllers/employer/jobController.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

// Route để tạo công việc mới
router.post('/', authenticateToken, authorizeRole('employer'), createJob);

// Route để lấy danh sách công việc
router.get('/', getJobs);

// Route để lấy chi tiết một công việc
router.get('/:id', getJobById);

// Route để cập nhật công việc
router.put('/:id', authenticateToken, authorizeRole('employer'), updateJob);

// Route để xóa công việc
router.delete('/:id', authenticateToken, authorizeRole('employer'), deleteJob);

export default router;
