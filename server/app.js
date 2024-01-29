require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// ^ CONNECT TO MONGO SERVER - it is important to specify the dbname here, especially if it was added in the URI
mongoose.connect(process.env.URI, {
    dbName: 'mmSarap'
})
    .then(() => {
        console.log(`Connected to ${process.env.DB_NAME}DB`)
    }).catch((err) => {
        console.error(`Error connecting to ${process.env.DB_NAME}DB: ${err}`)
    })

const app = express();

// ^ SET UP MIDDLEWARE
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}));

// ^ SET UP ROUTES - this tells express to prefix the following with /users
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const recipeRouter = require('./routes/recipes')
app.use("/", indexRouter) 
app.use("/users", userRouter)
app.use("/recipes", recipeRouter)

// ^ START SERVER - difference with connect vs. start server?
// run with the command npm run dev as we specified in the package.json
app.listen(3000, (err) => {
    if(err) {
        console.log('Server could not be started')
    }
    console.log('Server is running on Port 3000')
});