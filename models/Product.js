const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');

const Product = sequelize.define('Product', {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false },
}, {
    timestamps: true,
});

module.exports = Product;

