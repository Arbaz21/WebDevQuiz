const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  ingredients: [{
    ingredient: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' },
    quantity: { type: Number }, // Quantity of the ingredient in the recipe
    unit: { type: String }, // Unit of measurement for the ingredient in the recipe
  }],
  preparationTime: { type: Number }, // Preparation time in minutes
  cookingTime: { type: Number }, // Cooking time in minutes
  
});

module.exports = mongoose.model('Recipe', recipeSchema);
