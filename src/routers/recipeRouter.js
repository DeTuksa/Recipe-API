const express = require('express');
const router = new express.Router();
const Recipe = require('../models/recipe');
const axios = require('axios');

const auth = require('../middleware/auth');

const options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random',
    params: {number: '10'},
    headers: {
      'X-RapidAPI-Key': process.env.RECIPE_API_KEY,
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  };

  //Route to get 10 random recipes
router.get('/recipes/get-recipe', async (req, res) => {

    try {
        axios.request(options).then(function (response) {
            res.status(200).send({
                message: 'Recipes fetched successfully',
                recipes: response.data.recipes
                })
        }).catch(function (error) {
            return res.status(400).send(error)
        });
    } catch (error) {
        res.status(400).send(error)
    }
})

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

//Route to get all recipes
router.get('/get-all-recipes', auth, async (req, res) => {
    //TODO: Add pagination
    //TODO: Add filtering
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

//Route to get all users recipes
router.get('/user/recipes', auth, async (req, res) => {
    //Add pagination
    const match = {}
    try {
        await req.user.populate({
            path: 'recipes',
            match,
        }).execPopulate()
        res.send({
            message: 'Request successful',
            recipes: req.user.recipes
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router;