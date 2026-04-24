import Journal from '../models/Journal.js';

// @route   GET /api/journal/:date
// @desc    Get journal for a specific date (YYYY-MM-DD)
export const getJournal = async (req, res, next) => {
  try {
    const { date } = req.params;
    let journal = await Journal.findOne({ userId: req.user._id, date });

    if (!journal) {
      // Return empty structure if not found
      return res.json({ 
        journal: {
          date,
          foodItems: [],
          exercises: [],
          totalCaloriesIn: 0,
          totalCaloriesOut: 0
        } 
      });
    }

    res.json({ journal });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/journal/all
// @desc    Get all journal entries for user
export const getAllJournals = async (req, res, next) => {
  try {
    const journals = await Journal.find({ userId: req.user._id }).sort({ date: -1 });
    res.json({ journals });
  } catch (error) {
    next(error);
  }
};

// @route   POST /api/journal/food
// @desc    Log a food item
export const logFood = async (req, res, next) => {
  try {
    const { date, name, calories } = req.body;

    if (!date || !name || calories === undefined) {
      return res.status(400).json({ message: 'Date, food name, and calories are required' });
    }

    let journal = await Journal.findOne({ userId: req.user._id, date });

    if (!journal) {
      journal = new Journal({ userId: req.user._id, date });
    }

    journal.foodItems.push({ name, calories });
    journal.totalCaloriesIn += Number(calories);

    await journal.save();

    res.json({ journal });
  } catch (error) {
    next(error);
  }
};

// @route   POST /api/journal/exercise
// @desc    Log an exercise
export const logExercise = async (req, res, next) => {
  try {
    const { date, name, caloriesBurned } = req.body;

    if (!date || !name || caloriesBurned === undefined) {
      return res.status(400).json({ message: 'Date, exercise name, and calories burned are required' });
    }

    let journal = await Journal.findOne({ userId: req.user._id, date });

    if (!journal) {
      journal = new Journal({ userId: req.user._id, date });
    }

    journal.exercises.push({ name, caloriesBurned });
    journal.totalCaloriesOut += Number(caloriesBurned);

    await journal.save();

    res.json({ journal });
  } catch (error) {
    next(error);
  }
};
