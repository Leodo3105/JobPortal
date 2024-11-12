import { Router } from 'express';
const router = Router();
import { updateProfile } from '../controllers/employer/employerController.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

// Route để cập nhật hồ sơ employer (sau khi đăng nhập)
router.put('/profile/:userId', authenticateToken, authorizeRole('employer'), updateProfile);

export default router;
// Route để xem danh sách ứng viên apply của employer (sau khi đăng nhập)
router.get('/jobs/:Id/applicants', authenticateToken, authorizeRole('employer'), getApplicantsForJob);