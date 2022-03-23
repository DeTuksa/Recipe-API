const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
    {
        'title': {
            type: String,
            required: true,
            trim: true
        },
        'description': {
            type: String,
        },
        'ingredients': {
            type: String,
            required: true,
            trim: true
        },
        'procedure': {
            type: String,
            required: true,
            trim: true,
        },
        'image': {
            type: Buffer
        },
        'user': {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
)

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe