import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  goalType: {
    type: String,
    enum: ['weight_loss', 'weight_gain'],
    required: true
  },
  startWeight: {
    type: Number,
    required: true
  },
  targetWeight: {
    type: Number,
    required: true
  },
  currentWeight: {
    type: Number,
    required: true
  },
  deadline: {
    type: Date,
    required: false
  }
}, {
  timestamps: true
});

const Goal = mongoose.model('Goal', goalSchema);
export default Goal;
