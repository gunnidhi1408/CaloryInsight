import mongoose from 'mongoose';

const journalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: String, // YYYY-MM-DD
    required: true
  },
  foodItems: [{
    name: String,
    calories: Number
  }],
  exercises: [{
    name: String,
    caloriesBurned: Number
  }],
  totalCaloriesIn: {
    type: Number,
    default: 0
  },
  totalCaloriesOut: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// A user can only have one journal entry per day
journalSchema.index({ userId: 1, date: 1 }, { unique: true });

const Journal = mongoose.model('Journal', journalSchema);
export default Journal;
