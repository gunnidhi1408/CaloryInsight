import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import { getGoal, setGoal, updateProgress } from '../controllers/goalController.js';

router.use(protect);
router.route('/').get(getGoal).post(setGoal);
router.put('/progress', updateProgress);

export default router;
