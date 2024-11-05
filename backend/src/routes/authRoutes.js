import { Router } from 'express';
import { register, login } from '../controllers/admin/authController.js';
import { lockUser, unlockUser } from '../controllers/admin/authController.js'; 
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
// Khóa tài khoản người dùng (chỉ admin)
router.put('/lock/:userId', authenticateToken, authorizeRole('admin'), lockUser);

// Mở khóa tài khoản người dùng (chỉ admin)
router.put('/unlock/:userId', authenticateToken, authorizeRole('admin'), unlockUser);

export default router;
