'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { sequelize } = require('./database/database'); //Get database
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes'); // Goes to Cart Window 


dotenv.config();

const app = express();


app.use(cors());
app.use(bodyParser.json());


//Routes for everything else
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// Home route
app.get("/", (req, res) => {
    res.status(200).send("Welcome to the Home Page!");
});

// Sync database and start the server
const PORT = process.env.PORT || 5000;
sequelize.sync({ force: false })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Failed to connect to the database:', error);
    });
