import { Router } from 'express';
import { getApplicantProfiles, getApplicantProfile, deleteApplicantProfile,
         getEmployerProfiles, getEmployerProfile, deleteEmployerProfile } from '../controllers/admin/profileController.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

const router = Router();

// Ứng viên
router.get('/applicants', authenticateToken, authorizeRole('admin'), getApplicantProfiles);
router.get('/applicant/profile/:userId', authenticateToken, authorizeRole('admin'), getApplicantProfile);
router.delete('/applicant/profile/:userId', authenticateToken, authorizeRole('admin'), deleteApplicantProfile);

// Nhà tuyển dụng
router.get('/employers', authenticateToken, authorizeRole('admin'), getEmployerProfiles);
router.get('/employer/profile/:userId', authenticateToken, authorizeRole('admin'), getEmployerProfile);
router.delete('/employer/profile/:userId', authenticateToken, authorizeRole('admin'), deleteEmployerProfile);

export default router;
