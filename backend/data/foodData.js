// Hand-curated food nutrition dataset
// Values are approximate per 100 grams
// Sources: general nutrition knowledge, publicly available food composition info

const foodData = [
  // ---- Fruits ----
  { name: 'apple', caloriesPer100g: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4, category: 'fruit' },
  { name: 'banana', caloriesPer100g: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6, category: 'fruit' },
  { name: 'orange', caloriesPer100g: 47, protein: 0.9, carbs: 12, fat: 0.1, fiber: 2.4, category: 'fruit' },
  { name: 'mango', caloriesPer100g: 60, protein: 0.8, carbs: 15, fat: 0.4, fiber: 1.6, category: 'fruit' },
  { name: 'strawberry', caloriesPer100g: 33, protein: 0.7, carbs: 8, fat: 0.3, fiber: 2.0, category: 'fruit' },
  { name: 'watermelon', caloriesPer100g: 30, protein: 0.6, carbs: 8, fat: 0.2, fiber: 0.4, category: 'fruit' },
  { name: 'grapes', caloriesPer100g: 69, protein: 0.7, carbs: 18, fat: 0.2, fiber: 0.9, category: 'fruit' },
  { name: 'pineapple', caloriesPer100g: 50, protein: 0.5, carbs: 13, fat: 0.1, fiber: 1.4, category: 'fruit' },
  { name: 'papaya', caloriesPer100g: 43, protein: 0.5, carbs: 11, fat: 0.3, fiber: 1.7, category: 'fruit' },
  { name: 'avocado', caloriesPer100g: 160, protein: 2.0, carbs: 9, fat: 15, fiber: 6.7, category: 'fruit' },
  { name: 'guava', caloriesPer100g: 68, protein: 2.6, carbs: 14, fat: 1.0, fiber: 5.4, category: 'fruit' },
  { name: 'pomegranate', caloriesPer100g: 83, protein: 1.7, carbs: 19, fat: 1.2, fiber: 4.0, category: 'fruit' },

  // ---- Vegetables ----
  { name: 'tomato', caloriesPer100g: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2, category: 'vegetable' },
  { name: 'potato', caloriesPer100g: 77, protein: 2.0, carbs: 17, fat: 0.1, fiber: 2.2, category: 'vegetable' },
  { name: 'onion', caloriesPer100g: 40, protein: 1.1, carbs: 9, fat: 0.1, fiber: 1.7, category: 'vegetable' },
  { name: 'spinach', caloriesPer100g: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2, category: 'vegetable' },
  { name: 'broccoli', caloriesPer100g: 34, protein: 2.8, carbs: 7, fat: 0.4, fiber: 2.6, category: 'vegetable' },
  { name: 'carrot', caloriesPer100g: 41, protein: 0.9, carbs: 10, fat: 0.2, fiber: 2.8, category: 'vegetable' },
  { name: 'cucumber', caloriesPer100g: 15, protein: 0.7, carbs: 3.6, fat: 0.1, fiber: 0.5, category: 'vegetable' },
  { name: 'lettuce', caloriesPer100g: 15, protein: 1.4, carbs: 2.9, fat: 0.2, fiber: 1.3, category: 'vegetable' },
  { name: 'bell pepper', caloriesPer100g: 31, protein: 1.0, carbs: 6, fat: 0.3, fiber: 2.1, category: 'vegetable' },
  { name: 'sweet potato', caloriesPer100g: 86, protein: 1.6, carbs: 20, fat: 0.1, fiber: 3.0, category: 'vegetable' },
  { name: 'cabbage', caloriesPer100g: 25, protein: 1.3, carbs: 6, fat: 0.1, fiber: 2.5, category: 'vegetable' },
  { name: 'cauliflower', caloriesPer100g: 25, protein: 1.9, carbs: 5, fat: 0.3, fiber: 2.0, category: 'vegetable' },

  // ---- Grains ----
  { name: 'white rice', caloriesPer100g: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4, category: 'grain' },
  { name: 'brown rice', caloriesPer100g: 112, protein: 2.6, carbs: 24, fat: 0.9, fiber: 1.8, category: 'grain' },
  { name: 'wheat bread', caloriesPer100g: 265, protein: 9.0, carbs: 49, fat: 3.2, fiber: 2.7, category: 'grain' },
  { name: 'oats', caloriesPer100g: 389, protein: 17, carbs: 66, fat: 7, fiber: 11, category: 'grain' },
  { name: 'pasta', caloriesPer100g: 131, protein: 5.0, carbs: 25, fat: 1.1, fiber: 1.8, category: 'grain' },
  { name: 'corn', caloriesPer100g: 86, protein: 3.3, carbs: 19, fat: 1.4, fiber: 2.7, category: 'grain' },
  { name: 'quinoa', caloriesPer100g: 120, protein: 4.4, carbs: 21, fat: 1.9, fiber: 2.8, category: 'grain' },

  // ---- Protein foods ----
  { name: 'chicken breast', caloriesPer100g: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, category: 'protein' },
  { name: 'egg', caloriesPer100g: 155, protein: 13, carbs: 1.1, fat: 11, fiber: 0, category: 'protein' },
  { name: 'salmon', caloriesPer100g: 208, protein: 20, carbs: 0, fat: 13, fiber: 0, category: 'protein' },
  { name: 'tuna', caloriesPer100g: 132, protein: 28, carbs: 0, fat: 1.3, fiber: 0, category: 'protein' },
  { name: 'beef', caloriesPer100g: 250, protein: 26, carbs: 0, fat: 15, fiber: 0, category: 'protein' },
  { name: 'tofu', caloriesPer100g: 76, protein: 8, carbs: 1.9, fat: 4.8, fiber: 0.3, category: 'protein' },
  { name: 'paneer', caloriesPer100g: 265, protein: 18, carbs: 1.2, fat: 21, fiber: 0, category: 'protein' },
  { name: 'lentils', caloriesPer100g: 116, protein: 9, carbs: 20, fat: 0.4, fiber: 7.9, category: 'protein' },
  { name: 'chickpeas', caloriesPer100g: 164, protein: 8.9, carbs: 27, fat: 2.6, fiber: 7.6, category: 'protein' },
  { name: 'peanuts', caloriesPer100g: 567, protein: 26, carbs: 16, fat: 49, fiber: 8.5, category: 'protein' },

  // ---- Dairy ----
  { name: 'whole milk', caloriesPer100g: 61, protein: 3.2, carbs: 4.8, fat: 3.3, fiber: 0, category: 'dairy' },
  { name: 'yogurt', caloriesPer100g: 59, protein: 10, carbs: 3.6, fat: 0.4, fiber: 0, category: 'dairy' },
  { name: 'cheese', caloriesPer100g: 402, protein: 25, carbs: 1.3, fat: 33, fiber: 0, category: 'dairy' },
  { name: 'butter', caloriesPer100g: 717, protein: 0.9, carbs: 0.1, fat: 81, fiber: 0, category: 'dairy' },

  // ---- Snacks ----
  { name: 'dark chocolate', caloriesPer100g: 546, protein: 5, carbs: 60, fat: 31, fiber: 7, category: 'snack' },
  { name: 'popcorn', caloriesPer100g: 375, protein: 11, carbs: 74, fat: 4.3, fiber: 15, category: 'snack' },
  { name: 'almonds', caloriesPer100g: 579, protein: 21, carbs: 22, fat: 50, fiber: 12, category: 'snack' },
  { name: 'cashews', caloriesPer100g: 553, protein: 18, carbs: 30, fat: 44, fiber: 3.3, category: 'snack' },
  { name: 'potato chips', caloriesPer100g: 536, protein: 7, carbs: 53, fat: 35, fiber: 4.4, category: 'snack' },

  // ---- Beverages ----
  { name: 'orange juice', caloriesPer100g: 45, protein: 0.7, carbs: 10, fat: 0.2, fiber: 0.2, category: 'beverage' },
  { name: 'coconut water', caloriesPer100g: 19, protein: 0.7, carbs: 3.7, fat: 0.2, fiber: 1.1, category: 'beverage' },
  { name: 'cola', caloriesPer100g: 42, protein: 0, carbs: 11, fat: 0, fiber: 0, category: 'beverage' },
  { name: 'green tea', caloriesPer100g: 1, protein: 0, carbs: 0, fat: 0, fiber: 0, category: 'beverage' },
  { name: 'coffee black', caloriesPer100g: 2, protein: 0.1, carbs: 0, fat: 0, fiber: 0, category: 'beverage' },

  // ---- Indian Staples ----
  { name: 'roti / chapati', caloriesPer100g: 297, protein: 9, carbs: 46, fat: 10, fiber: 9.7, category: 'grain' },
  { name: 'dal tadka (cooked)', caloriesPer100g: 116, protein: 9, carbs: 20, fat: 0.4, fiber: 7.9, category: 'protein' },
  { name: 'idli', caloriesPer100g: 100, protein: 3, carbs: 21, fat: 0.4, fiber: 1.5, category: 'grain' },
  { name: 'dosa (plain)', caloriesPer100g: 168, protein: 3.9, carbs: 29, fat: 3.7, fiber: 0.9, category: 'grain' },
  { name: 'paratha (plain)', caloriesPer100g: 326, protein: 8, carbs: 49, fat: 12, fiber: 4.8, category: 'grain' },

  // ---- Fast Food / Packaged ----
  { name: 'pizza (cheese)', caloriesPer100g: 266, protein: 11, carbs: 33, fat: 10, fiber: 2.3, category: 'fast_food' },
  { name: 'hamburger', caloriesPer100g: 295, protein: 14, carbs: 24, fat: 14, fiber: 1.1, category: 'fast_food' },
  { name: 'french fries', caloriesPer100g: 312, protein: 3.4, carbs: 41, fat: 15, fiber: 3.8, category: 'fast_food' },
  { name: 'instant noodles', caloriesPer100g: 385, protein: 8, carbs: 55, fat: 15, fiber: 2, category: 'fast_food' },

  // ---- Seeds & Dry Fruit ----
  { name: 'chia seeds', caloriesPer100g: 486, protein: 17, carbs: 42, fat: 31, fiber: 34, category: 'snack' },
  { name: 'walnuts', caloriesPer100g: 654, protein: 15, carbs: 14, fat: 65, fiber: 6.7, category: 'snack' },
  { name: 'raisins', caloriesPer100g: 299, protein: 3.1, carbs: 79, fat: 0.5, fiber: 3.7, category: 'snack' },
  { name: 'dates', caloriesPer100g: 282, protein: 2.5, carbs: 75, fat: 0.4, fiber: 8, category: 'snack' },

  // ---- Oils & Cooking Essentials ----
  { name: 'olive oil', caloriesPer100g: 884, protein: 0, carbs: 0, fat: 100, fiber: 0, category: 'oil' },
  { name: 'ghee', caloriesPer100g: 900, protein: 0, carbs: 0, fat: 100, fiber: 0, category: 'oil' },
  { name: 'coconut oil', caloriesPer100g: 862, protein: 0, carbs: 0, fat: 100, fiber: 0, category: 'oil' },

  // ---- Breakfast Foods ----
  { name: 'corn flakes', caloriesPer100g: 357, protein: 8, carbs: 84, fat: 0.4, fiber: 1.2, category: 'breakfast' },
  { name: 'pancakes', caloriesPer100g: 227, protein: 6, carbs: 28, fat: 10, fiber: 0, category: 'breakfast' },
  { name: 'muesli', caloriesPer100g: 370, protein: 11, carbs: 65, fat: 6, fiber: 8, category: 'breakfast' }
];

export default foodData;
