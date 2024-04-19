const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const authRouter = require("./auth");
const recipeRouter = require('./recipe');
const ingredientRouter = require('./routes/ingredient'); 



// Routes that do not pass through the middleware
router.use("/auth", authRouter);

// Middleware to verify JWT token
router.use(async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ msg: "Token not found" });
        }
        const user = jwt.verify(token.split(" ")[1], "MY_SECRET");
        req.user = user;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ msg: "Invalid token" });
    }
});

// Routes that pass through the middleware
router.use("/recipes", recipeRouter);

module.exports = router;
