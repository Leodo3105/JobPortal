import { Router } from 'express';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

const router = Router();

router.get('/admin-only', authenticateToken, authorizeRole('admin'), (_req, res) => {
  res.json({ message: 'Welcome Admin!' });
});

router.get('/user-profile', authenticateToken, (req, res) => {
  res.json({ message: 'This is your profile', user: req.user });
});

export default router;
