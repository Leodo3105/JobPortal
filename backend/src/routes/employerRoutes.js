import { Router } from 'express';
const router = Router();
import { updateProfile } from '../controllers/employer/employerController.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

// Route để cập nhật hồ sơ employer (sau khi đăng nhập)
router.put('/profile', authenticateToken, authorizeRole('employer'), updateProfile);

export default router;
