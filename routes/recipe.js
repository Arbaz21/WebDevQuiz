const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const jwt = require('jsonwebtoken');
const Ingredients = require('../models/Ingredients');

router.post('/createRecipe', async (req, res) => {
    try {
        // Find the user based on the JWT token
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token.split(" ")[1], "MY_SECRET");
        if (!decodedToken) {
            return res.status(401).json({ msg: "Unauthorized" });
        }
        // Assuming the user ID is stored in the JWT token payload
        const userId = decodedToken.userId;

       
     // Create the recipe
        const newRecipe = new Recipe({
            title: req.body.title,
            description: req.body.description,
            ingredients: req.body.ingredients,
            preparationTime: req.body.preparationTime,
            cookingTime: req.body.cookingTime,
          
        });
        await newRecipe.save();

        res.json({ msg: "Recipe created successfully", recipe: newRecipe });
    } catch (error) {
        console.error('Error creating recipe:', error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

router.get('/ingredients', async (req, res) => {
    try {
        const ingredients = await Ingredients.find();
        res.json({ ingredients });
    } catch (error) {
        console.error('Error fetching ingredients:', error);
        res.status(500).json({ msg: "Internal server error" });
    }
});


router.get('/ingredients/:ingredientId', async (req, res) => {
    try {
        const ingredient = await Ingredients.findById(req.params.ingredientId);
        if (!ingredient) {
            return res.status(404).json({ msg: "Ingredient not found" });
        }
        res.json({ ingredient });
    } catch (error) {
        console.error('Error fetching ingredient details:', error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

router.post('/ingredients', async (req, res) => {
    try {
        const { name, description, category, quantity, unit } = req.body;
        
        // Create a new ingredient
        const newIngredient = new Ingredients({
            name,
            description,
            category,
            quantity,
            unit
        });

        // Save the new ingredient to the database
        await newIngredient.save();

        res.status(201).json({ msg: "Ingredient added successfully", ingredient: newIngredient });
    } catch (error) {
        console.error('Error adding ingredient:', error);
        res.status(500).json({ msg: "Internal server error" });
    }
});


module.exports = router;

module.exports = router;

module.exports = router;
