import mongoose from 'mongoose';

const calculationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['calorie_burn', 'bmi', 'food_search'],
    required: true
  },
  inputs: {
    type: Object,
    required: true
  },
  result: {
    type: Object,
    required: true
  }
}, {
  timestamps: true
});

// compound index so we can quickly fetch a specific user's recent history
calculationSchema.index({ userId: 1, createdAt: -1 });

const Calculation = mongoose.model('Calculation', calculationSchema);
export default Calculation;
