import User from '../models/User.js';

// @route   GET /api/user/profile
// @desc    Fetch the logged-in user's profile
const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/user/profile
// @desc    Update profile details
const updateProfile = async (req, res, next) => {
  try {
    const { name, age, weight, height, gender } = req.body;

    // only update fields that were actually sent
    const updates = {};
    if (name !== undefined) updates.name = name;
    if (age !== undefined) updates.age = age;
    if (weight !== undefined) updates.weight = weight;
    if (height !== undefined) updates.height = height;
    if (gender !== undefined) updates.gender = gender;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({ user, message: 'Profile updated successfully' });
  } catch (error) {
    next(error);
  }
};

export { getProfile, updateProfile };
