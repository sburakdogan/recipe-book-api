const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    createdOn: {
        type: Date,
        default: new Date
    }
})

module.exports = mongoose.model('user', UserSchema);