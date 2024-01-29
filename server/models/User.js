const mongoose = require('mongoose');
// ^ this is the structure
// ^ const userSchema = new Schema({})
// ^ module.exports = new model("User", userSchema);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    //  automatically puts the value in lowercase
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
    },
  ],
});

// Create and export the User model so we can create User documents
module.exports = new mongoose.model('User', userSchema);
