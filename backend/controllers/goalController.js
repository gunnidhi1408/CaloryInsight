import Goal from '../models/Goal.js';

// @route   GET /api/goals
// @desc    Get user's current goal
export const getGoal = async (req, res, next) => {
  try {
    const goal = await Goal.findOne({ userId: req.user._id }).sort({ createdAt: -1 });
    
    if (!goal) {
      return res.status(404).json({ message: 'No goal found' });
    }

    res.json({ goal });
  } catch (error) {
    next(error);
  }
};

// @route   POST /api/goals
// @desc    Set a new goal
export const setGoal = async (req, res, next) => {
  try {
    const { goalType, startWeight, targetWeight, deadline } = req.body;

    if (!goalType || !startWeight || !targetWeight) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const goal = await Goal.create({
      userId: req.user._id,
      goalType,
      startWeight,
      targetWeight,
      currentWeight: startWeight,
      deadline
    });

    res.status(201).json({ goal });
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/goals/progress
// @desc    Update current weight
export const updateProgress = async (req, res, next) => {
  try {
    const { currentWeight } = req.body;

    if (!currentWeight) {
      return res.status(400).json({ message: 'Current weight is required' });
    }

    const goal = await Goal.findOne({ userId: req.user._id }).sort({ createdAt: -1 });

    if (!goal) {
      return res.status(404).json({ message: 'No active goal found to update' });
    }

    goal.currentWeight = currentWeight;
    await goal.save();

    res.json({ goal });
  } catch (error) {
    next(error);
  }
};
