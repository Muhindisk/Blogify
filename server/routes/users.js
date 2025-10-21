import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getUserProfile,
  updateProfile,
  toggleFollow,
  getFollowers,
  getFollowing,
  searchUsers
} from '../controllers/userController.js';

const router = express.Router();

// Protected routes (must come before parameterized routes)
router.put('/profile', protect, updateProfile);

// Public routes
router.get('/search', searchUsers);
router.get('/:username', getUserProfile);
router.get('/:userId/followers', getFollowers);
router.get('/:userId/following', getFollowing);

// More protected routes
router.post('/:userId/follow', protect, toggleFollow);

export default router;
