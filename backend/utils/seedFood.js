import mongoose from 'mongoose';
import dotenv from 'dotenv';
import FoodItem from '../models/FoodItem.js';
import foodData from '../data/foodData.js';

dotenv.config();

// seed the food items collection from our static dataset
const seedFoodData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // clear existing food items first
    await FoodItem.deleteMany({});
    console.log('Cleared old food data');

    // insert our dataset
    const inserted = await FoodItem.insertMany(foodData);
    console.log(`Seeded ${inserted.length} food items successfully`);

    await mongoose.connection.close();
    console.log('Done! Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
};

seedFoodData();
