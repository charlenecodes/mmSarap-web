const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    dishName: {
        type: String,
        required: true
    },
    cuisine: {
        type: String,
        required: true
    },
    ingredients: [{
        type: String,
        required: true
    }],
    instructions: [{
        type: String,
        required: true
    }],
    photos: [{
        type: String,
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    addedBy: {
        type: String,
    }
});

// Create and export the User model so we can create User documents
module.exports = new mongoose.model("Recipe", recipeSchema);