import { Router } from 'express';
import { addIndustry, updateIndustry, deleteIndustry, getAllIndustries } from '../controllers/admin/industryController.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

const router = Router();

// Thêm ngành nghề mới (chỉ admin)
router.post('/add', authenticateToken, authorizeRole('admin'), addIndustry);

// Cập nhật ngành nghề (chỉ admin)
router.put('/update/:id', authenticateToken, authorizeRole('admin'), updateIndustry);

// Xóa ngành nghề (chỉ admin)
router.delete('/delete/:id', authenticateToken, authorizeRole('admin'), deleteIndustry);

// Lấy danh sách tất cả ngành nghề (public)
router.get('/list', getAllIndustries);

export default router;
