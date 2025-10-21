import express from 'express';
import { 
  submitContact, 
  getAllContacts, 
  getContact, 
  updateContact, 
  deleteContact 
} from '../controllers/contactController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route - submit contact form
router.post('/', submitContact);

// Protected routes - admin only (you can add admin middleware later)
router.get('/', protect, getAllContacts);
router.get('/:id', protect, getContact);
router.put('/:id', protect, updateContact);
router.delete('/:id', protect, deleteContact);

export default router;
