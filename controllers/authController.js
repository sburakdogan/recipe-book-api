const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validate } = require('../validation/userValidation.js')

const register = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).json({ "error": error.details[0].message });
        }

        const { email, password } = req.body;

        if (password.length < 5) {
            return res.status(400).json({ message: "Password must contain at least 5 characters" })
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "This email is already exist" });
        }

        const passwordHash = await bcrypt.hash(password, 12);  
        const createdUser = await User.create({
            email,
            password: passwordHash
        });

        const token = jwt.sign({ id: createdUser.id, email: createdUser.email }, process.env.SECRET_TOKEN, { expiresIn: '1h' });
        
        return res.status(201).json({
            status: 'created',
            user: createdUser,
            token
        })
    } catch (err) {
        return res.status(500).json({ message: "Unexpected error: " + err.message });
    }
}

const login = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).json({ "error": error.details[0].message });
        }
        
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message: "User not found"});
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if(!comparePassword) {
            return res.status(400).json({message: "User not found"});
        }

        const token = jwt.sign({id: user.id, email: user.email}, process.env.SECRET_TOKEN, {expiresIn: '1h'});
        
        return res.status(200).json({
            status: 'ok',
            user,
            token
        });
    } catch (err) {
        return res.status(500).json({ message: "Unexpected error: " + err.message });
    }
}  

module.exports = {register, login}