import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
  toggleCommentLike
} from '../controllers/commentController.js';

const router = express.Router();

// Comment routes for specific post
router.get('/:postId/comments', getComments);
router.post('/:postId/comments', protect, createComment);

// Individual comment routes
router.put('/:id', protect, updateComment);
router.delete('/:id', protect, deleteComment);
router.post('/:id/like', protect, toggleCommentLike);

export default router;
