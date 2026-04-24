import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import { getJournal, getAllJournals, logFood, logExercise } from '../controllers/journalController.js';

router.use(protect);
router.get('/all', getAllJournals);
router.get('/:date', getJournal);
router.post('/food', logFood);
router.post('/exercise', logExercise);

export default router;
