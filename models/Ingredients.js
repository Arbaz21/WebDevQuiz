const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String }, // e.g., dairy, protein, vegetable, etc.
  quantity: { type: Number }, // Quantity of the ingredient
  unit: { type: String }, // Unit of measurement (e.g., grams, kilograms, cups, etc.)
 
  
});

module.exports = mongoose.model('Ingredient', ingredientSchema);
