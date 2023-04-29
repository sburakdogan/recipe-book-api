const Recipe = require('../models/recipe.js');
const { validate } = require('../validation/recipeValidation.js')

const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        return res.status(200).json({
            recipes
        });
    } catch (err) {
        return res.status(500).json({ message: "Unexpected error: " + err })
    }
}

const getRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findById(id);
        return res.status(200).json({
            recipe
        })
    } catch (err) {
        return res.status(500).json({ message: "Unexpected error: " + err })
    }
}

const createRecipe = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).json({ "error": error.details[0].message });
        }

        const createdRecipe = await Recipe.create(req.body);
        return res.status(201).json({
            createdRecipe
        });
    } catch (err) {
        return res.status(500).json({ message: "Unexpected error: " + err })
    }
}

const updateRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findByIdAndUpdate(id, req.body);
        if (!recipe) {
            return res.status(404).json({ message: `Cannot find any recipe with id ${id}` })
        }
        const updatedRecipe = await Recipe.findById(id);
        return res.status(200).json({
            updatedRecipe
        });
    } catch (err) {
        return res.status(500).json({ message: "Unexpected error: " + err })
    }
}

const deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        await Recipe.findByIdAndRemove(id);
        return res.status(200).json({
            message: "deleted"
        })
    } catch (err) {
        return res.status(500).json({ message: "Unexpected error: " + err })
    }
}

module.exports = { getRecipes, getRecipe, createRecipe, updateRecipe, deleteRecipe }