import { Router } from 'express';
const router = Router();
import { updateApplicant } from '../controllers/applicant/applicantProfileController.js'; // Hàm controller để cập nhật hồ sơ
import { authenticateToken, authorizeRole } from '../middleware/auth.js'; // Middleware xác thực và phân quyền

// Route để cập nhật hồ sơ ứng viên
router.put('/profile', authenticateToken, authorizeRole('applicant'), updateApplicant);

export default router;
