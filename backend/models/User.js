import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  // optional profile fields the user can fill in later
  age: {
    type: Number,
    min: 10,
    max: 120,
    default: null
  },
  weight: {
    type: Number,
    min: 20,
    max: 300,
    default: null
  },
  height: {
    type: Number, // in centimeters
    min: 50,
    max: 300,
    default: null
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;
