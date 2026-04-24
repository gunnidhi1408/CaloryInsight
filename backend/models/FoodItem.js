import mongoose from 'mongoose';

const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  caloriesPer100g: {
    type: Number,
    required: true
  },
  protein: {
    type: Number,
    default: 0
  },
  carbs: {
    type: Number,
    default: 0
  },
  fat: {
    type: Number,
    default: 0
  },
  fiber: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    enum: ['fruit', 'vegetable', 'grain', 'protein', 'dairy', 'snack', 'beverage', 'fast_food', 'oil', 'breakfast', 'other'],
    default: 'other'
  }
});

// text index helps with searching food by name
foodItemSchema.index({ name: 'text' });

const FoodItem = mongoose.model('FoodItem', foodItemSchema);
export default FoodItem;
