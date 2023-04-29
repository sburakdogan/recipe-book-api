const express = require('express');
const { getRecipes, createRecipe, deleteRecipe, updateRecipe, getRecipe } = require('../controllers/recipesController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getRecipes);
router.get('/:id', getRecipe);
router.post('/', authMiddleware, createRecipe);
router.put('/:id', authMiddleware, updateRecipe);
router.delete('/:id', authMiddleware, deleteRecipe);

module.exports = router;