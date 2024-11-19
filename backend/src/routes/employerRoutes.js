import { Router } from 'express';
const router = Router();
import { updateProfile, getApplicantsForJob  } from '../controllers/employer/employerController.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

// Route để cập nhật hồ sơ employer (sau khi đăng nhập)
router.put('/profile/update/:userId', authenticateToken, authorizeRole('employer'), updateProfile);

// Route để nhà tuyển dụng xem danh sách ứng viên cho một công việc cụ thể
router.get('/:jobId/applicants',authenticateToken, authorizeRole('employer'), getApplicantsForJob);

export default router;
