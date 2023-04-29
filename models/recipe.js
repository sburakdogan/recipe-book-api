const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    ingredients: [{
        type: String,
        required: true,
        trim: true
    }],
    constructionSteps: [{
        type: String,
        required: true,
        trim: true
    }],
    createdOn: {
        type: Date,
        default: new Date
    }
})

module.exports = mongoose.model('recipe', RecipeSchema);