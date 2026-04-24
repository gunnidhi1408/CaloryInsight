import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import {
  calculateCalorieBurn,
  calculateBmi,
  searchFood,
  getHistory,
  deleteHistory
} from '../controllers/calculatorController.js';

// all these routes require authentication
router.use(protect);

router.post('/calorie-burn', calculateCalorieBurn);
router.post('/bmi', calculateBmi);
router.get('/food-search', searchFood);
router.get('/history', getHistory);
router.delete('/history/:id', deleteHistory);

export default router;
