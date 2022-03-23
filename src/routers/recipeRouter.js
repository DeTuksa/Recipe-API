const express = require('express');
const router = new express.Router();
const Recipe = require('../models/recipe');

const auth = require('../middleware/auth');

//Route to create a new recipe
router.post('/create-recipe', auth, async (req, res) => {

    const recipe = new Recipe({
        ...req.body,
        user: req.user._id
    })

    try {
        await recipe.save()
        res.status(201).send(recipe)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/get-all-recipes', auth, async (req, res) => {
    try {
        const allRecipe = await Recipe.find()
        res.send({
            message: "Request successful",
            recipes: allRecipe
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router;