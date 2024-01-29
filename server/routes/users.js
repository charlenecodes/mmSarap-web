const express = require('express');
const router = express.Router();
require('dotenv').config();

// * IMPORTANT to be able to use mongoose queries
const User = require('../models/User');

// * all begin with /users

// ^ MIDDLEWARE
// need to be with the function keyword, otherwise it doesn't work

// ^ ENDPOINTS
//^ GET all users - NOT NEEDED in final app, just to see the data in postman
router.get("/", async (req, res) => {
    try {
        // User.find() return everything that was created with the User schema
        res.send(await User.find());
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
})



module.exports = router;