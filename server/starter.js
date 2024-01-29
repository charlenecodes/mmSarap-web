require('dotenv').config();
const Recipe = require('./models/Recipe');
const User = require('./models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// prepopulates the DB with the data in this file when the command npm run migrate is ran on the terminal (defined in the package.json file)
(async () => {
    let db = null;

    try {
        mongoose.set('strictQuery', true);
        console.log('establish DB connection...');
        await mongoose.connect(process.env.URI);
        db = mongoose.connection;

        // console.log('drop existing collections...');
        // await db.dropCollection('recipes');
        // await db.dropCollection('users');
        console.log('drop existing database...');
        await db.dropDatabase();

        console.log('create recipe and user...');

        let adobo = await Recipe.create({
            dishName: 'Pork adobo',
            cuisine: 'Filipino',
            ingredients: ['pork', 'garlic', 'bay leaves', 'pepper', 'soy sauce', 'vinegar', 'water'],
            instructions: ['marinade pork in soy sauce then bay leaves and pepper', 'add water until the meat is submerged and allow to simmer uncovered in low heat', 'add vinegar']
        });

        let Charlene = await User.create({
            username: 'charlene',
            name: 'Charlene',
            email: 'email@email.com',
            password: await bcrypt.hash(process.env.PASSWORD, Number(process.env.SALT_ROUNDS)),
            recipes: adobo._id
        });

        // this updates the DB and adds the id of the user to the recipe
        await adobo.updateOne({ addedBy: Charlene._id })

        console.log('closing DB...');
        await db.close();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
})();