import express from 'express';
import { createPost, createComment } from '../../controllers/postController.js';
import { authenticateToken } from '../../middleware/authMiddleware.js';

const router = express.Router();

// Route tạo bài viết (chỉ employer)
router.post('/employer/posts', authenticateToken, createPost);

// Route tạo bình luận (cả employer và applicant)
router.post('/posts/:postId/comments', authenticateToken, createComment);

export default router;
