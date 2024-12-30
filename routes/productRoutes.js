const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Get all products 
router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// Add a new product
router.post('/', async (req, res) => {
    const { name, description, price, stock } = req.body;
    try {
        const product = await Product.create({ name, description, price, stock });
        res.json(product);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
