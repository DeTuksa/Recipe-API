const mongoose = require('mongoose');

const cocktailSchema = new mongoose.Schema(
    {
        //Drink id
        'idDrink': {
            type: String,
            trim: true
        },
        //Drink name
        'strDrink':{
            type: String,
            trim: true
        },
        //Drink Category
        'strCategory':{
            type: String,
            trim: true
        },
        //Drink glass
        'strGlass':{
            type: String,
            trim: true
        },
        //Drink Instructions
        'strInstructions':{
            type: String,
            trim: true
        },
        //Drink Ingredient 1
        'strIngredient1':{
            type: String,
            trim: true
        },
        //Drink Ingredient 2
        'strIngredient2':{
            type: String,
            trim: true
        },
        //Drink Ingredient 3
        'strIngredient3':{
            type: String,
            trim: true
        },
        //Drink Ingredient 4
        'strIngredient4':{
            type: String,
            trim: true
        },
        //Drink Ingredient 5
        'strIngredient5':{
            type: String,
            trim: true
        },
        //Drink Ingredient 6
        'strIngredient6':{
            type: String,
            trim: true
        },
        //Drink Ingredient 7
        'strIngredient7':{
            type: String,
            trim: true
        },
        //Drink Ingredient 8
        'strIngredient8':{
            type: String,
            trim: true
        },
        //Drink Ingredient 9
        'strIngredient9':{
            type: String,
            trim: true
        },
        //Drink Ingredient 10
        'strIngredient10':{
            type: String,
            trim: true
        },
        //Drink Ingredient 11
        'strIngredient11':{
            type: String,
            trim: true
        },
        //Drink Ingredient 12
        'strIngredient12':{
            type: String,
            trim: true
        },
        //Drink Ingredient 13
        'strIngredient13':{
            type: String,
            trim: true
        },
        //Drink Ingredient 14
        'strIngredient14':{
            type: String,
            trim: true
        },
        //Drink Ingredient 15
        'strIngredient15':{
            type: String,
            trim: true
        },
        'strDrinkThumb': {
            type: String
        },
        'user': {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
)

const Cocktail = mongoose.model('Cocktail', cocktailSchema)

module.exports = Cocktail