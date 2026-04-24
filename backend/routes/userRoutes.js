import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import { getProfile, updateProfile } from '../controllers/userController.js';

// both routes need the user to be logged in
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

export default router;
