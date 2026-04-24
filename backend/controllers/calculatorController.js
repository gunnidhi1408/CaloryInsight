import Calculation from '../models/Calculation.js';
import FoodItem from '../models/FoodItem.js';

// MET values for different exercise types
// MET (Metabolic Equivalent of Task) represents energy cost of physical activities
// These are standard reference values used in exercise science
const MET_VALUES = {
  walking: 3.5,
  running: 8.0,
  cycling: 6.0,
  swimming: 7.0,
  yoga: 2.5,
  jump_rope: 10.0,
  weight_training: 5.0,
  dancing: 4.5,
  hiking: 6.5,
  stretching: 2.3
};

// @route   POST /api/calc/calorie-burn
// @desc    Calculate calories burned during an exercise session
const calculateCalorieBurn = async (req, res, next) => {
  try {
    const { weight, duration, exercise, age, gender } = req.body;

    // basic validation
    if (!weight || !duration || !exercise) {
      return res.status(400).json({ message: 'Weight, duration, and exercise type are all required' });
    }

    if (weight <= 0 || duration <= 0) {
      return res.status(400).json({ message: 'Weight and duration must be positive numbers' });
    }

    const met = MET_VALUES[exercise];
    if (!met) {
      return res.status(400).json({
        message: 'Unknown exercise type. Choose from the available options.',
        validTypes: Object.keys(MET_VALUES)
      });
    }

    // formula: (MET x 3.5 x bodyWeight_kg) / 200 x minutes
    // this is a widely-used estimation based on oxygen consumption
    let caloriesBurned = (met * 3.5 * weight) / 200 * duration;

    // slight adjustment for age - metabolism slows a bit with age
    if (age) {
      if (age > 50) caloriesBurned *= 0.92;
      else if (age > 40) caloriesBurned *= 0.96;
    }

    // women typically burn ~5% fewer calories for same activity
    if (gender === 'female') {
      caloriesBurned *= 0.95;
    }

    // round to 1 decimal place
    caloriesBurned = Math.round(caloriesBurned * 10) / 10;

    // save to user's history
    const calculation = await Calculation.create({
      userId: req.user._id,
      type: 'calorie_burn',
      inputs: { weight, duration, exercise, age, gender },
      result: { caloriesBurned, met, exercise }
    });

    res.json({
      caloriesBurned,
      exercise,
      duration,
      met,
      calculationId: calculation._id
    });
  } catch (error) {
    next(error);
  }
};

// @route   POST /api/calc/bmi
// @desc    Calculate BMI and return category
const calculateBmi = async (req, res, next) => {
  try {
    const { height, weight } = req.body;

    if (!height || !weight) {
      return res.status(400).json({ message: 'Both height (cm) and weight (kg) are required' });
    }

    if (height <= 0 || weight <= 0) {
      return res.status(400).json({ message: 'Height and weight must be positive numbers' });
    }

    // BMI = weight(kg) / height(m)^2
    const heightMeters = height / 100;
    const bmi = weight / (heightMeters * heightMeters);
    const roundedBmi = Math.round(bmi * 10) / 10;

    // WHO classification
    let category;
    let recommendations = [];
    if (bmi < 18.5) {
      category = 'Underweight';
      recommendations = [
        "Increase your calorie intake with nutrient-dense foods.",
        "Eat more protein-rich food like eggs, nuts, and dairy.",
        "Include strength training to build muscle mass."
      ];
    } else if (bmi < 25) {
      category = 'Normal';
      recommendations = [
        "Maintain your balanced diet.",
        "Keep up with regular physical activity.",
        "Stay hydrated and get enough sleep."
      ];
    } else if (bmi < 30) {
      category = 'Overweight';
      recommendations = [
        "Reduce intake of added sugars and processed foods.",
        "Incorporate more cardiovascular exercises (like brisk walking or cycling).",
        "Eat more fiber-rich vegetables to feel full longer."
      ];
    } else {
      category = 'Obese';
      recommendations = [
        "Consult a healthcare provider for a personalized plan.",
        "Focus on portion control and mindful eating.",
        "Start with low-impact exercises like swimming or walking."
      ];
    }

    // healthy weight range for this person's height
    const minHealthy = Math.round(18.5 * heightMeters * heightMeters * 10) / 10;
    const maxHealthy = Math.round(24.9 * heightMeters * heightMeters * 10) / 10;

    // save to history
    const calculation = await Calculation.create({
      userId: req.user._id,
      type: 'bmi',
      inputs: { height, weight },
      result: { bmi: roundedBmi, category, minHealthy, maxHealthy, recommendations }
    });

    res.json({
      bmi: roundedBmi,
      category,
      healthyRange: { min: minHealthy, max: maxHealthy },
      recommendations,
      calculationId: calculation._id
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/calc/food-search?q=apple
// @desc    Search food items by name
const searchFood = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length === 0) {
      return res.status(400).json({ message: 'Please provide a search term' });
    }

    let foods = [];
    const query = q.trim();

    try {
      // Try fetching from USDA API
      const apiKey = process.env.USDA_API_KEY || 'DEMO_KEY';
      const usdaResponse = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(query)}&api_key=${apiKey}&pageSize=10`);
      
      if (usdaResponse.ok) {
        const data = await usdaResponse.json();
        if (data.foods && data.foods.length > 0) {
          foods = data.foods.map(food => {
            // Helper to find nutrient value
            const getNutrient = (id) => {
              const nutrient = food.foodNutrients.find(n => n.nutrientId === id);
              return nutrient ? Math.round(nutrient.value * 10) / 10 : 0;
            };

            return {
              _id: food.fdcId.toString(),
              name: food.description.toLowerCase(),
              caloriesPer100g: getNutrient(1008), // Energy
              protein: getNutrient(1003), // Protein
              carbs: getNutrient(1005), // Carbs
              fat: getNutrient(1004), // Fat
              fiber: getNutrient(1079), // Fiber
              category: food.foodCategory || 'USDA Data'
            };
          });
        }
      }
    } catch (apiError) {
      console.error("USDA API Error:", apiError);
      // Fall through to local database search
    }

    // Fallback to local database if USDA API fails or returns no results
    if (foods.length === 0) {
      foods = await FoodItem.find({
        name: { $regex: query, $options: 'i' }
      }).limit(20);
      
      // If no food found in DB, return a default estimated item
      if (foods.length === 0) {
        foods = [{
          _id: 'default-estimation',
          name: `${query} (Estimated)`,
          caloriesPer100g: 200, // default assumed calories
          protein: 5,
          carbs: 20,
          fat: 10,
          fiber: 2,
          category: 'other'
        }];
      }
    }

    // log the search
    await Calculation.create({
      userId: req.user._id,
      type: 'food_search',
      inputs: { query },
      result: { matchCount: foods.length, topResult: foods[0].name }
    });

    res.json({ results: foods, count: foods.length });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/calc/history
// @desc    Get user's recent calculation history
const getHistory = async (req, res, next) => {
  try {
    // grab the last 30 calculations, newest first
    const calculations = await Calculation.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(30);

    res.json({ history: calculations });
  } catch (error) {
    next(error);
  }
};

// @route   DELETE /api/calc/history/:id
// @desc    Delete a specific calculation history item
const deleteHistory = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const calculation = await Calculation.findOne({ _id: id, userId: req.user._id });
    if (!calculation) {
      return res.status(404).json({ message: 'History record not found' });
    }

    await Calculation.deleteOne({ _id: id });
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export { calculateCalorieBurn, calculateBmi, searchFood, getHistory, deleteHistory };
