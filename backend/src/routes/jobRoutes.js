import { Router } from 'express';
const router = Router();
import { createJob, getJobs, getJobById, updateJob, deleteJob } from '../controllers/employer/jobController.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

// Route để tạo công việc mới
router.post('/add', authenticateToken, authorizeRole('employer'), createJob);

// Route để lấy danh sách công việc
router.get('/list', getJobs);

// Route để lấy chi tiết một công việc
router.get('/detail/:id', getJobById);

// Route để cập nhật công việc
router.put('/update/:id', authenticateToken, authorizeRole('employer'), updateJob);

// Route để xóa công việc
router.delete('/delete/:id', authenticateToken, authorizeRole('employer'), deleteJob);

export default router;
