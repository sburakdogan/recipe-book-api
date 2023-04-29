const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const database = require('./config/database');
const AuthRoute = require('./routes/authRoute.js');
const RecipeRoute = require('./routes/recipeRoute.js');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', AuthRoute);
app.use('/recipes', RecipeRoute);

const port = process.env.PORT || 5000;

database();

app.listen(port, () => {
    console.log("server is running...")
})