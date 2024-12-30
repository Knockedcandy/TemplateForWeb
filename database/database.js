const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');


dotenv.config();


const dbPath = process.env.DATABASE_STORAGE || path.join(__dirname, 'database', 'mydatabase.sqlite');


if (!fs.existsSync(path.dirname(dbPath))) {
    console.error('Database folder does not exist:', path.dirname(dbPath));
} else {
    console.log('Database storage path:', dbPath);
}


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbPath,
});

//Connect the database
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error;
    }
};

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
});

// Automatically sync 
(async () => {
    try {
        await sequelize.sync();
        console.log('Database synced successfully!');
    } catch (err) {
        console.error('Error syncing database:', err);
    }
})();

module.exports = { sequelize, Product, connectDB };
