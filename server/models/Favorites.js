const mongoose = require("mongoose");

const favoritesSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

// Create and export the User model so we can create User documents
module.exports = new mongoose.model("Favorites", favoritesSchema);
