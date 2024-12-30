const express = require('express');
const router = express.Router();

let cart = [];

// Get all items in the cart
router.get('/', (req, res) => {
    res.json(cart);
});

// Add an item to the cart 
router.post('/', (req, res) => {
    const { id, name, price, quantity } = req.body;
    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ id, name, price, quantity });
    }

    res.json({ message: 'Item added to cart', cart });
});

// Remove an item from the cart 
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    cart = cart.filter((item) => item.id !== parseInt(id));
    res.json({ message: 'Item removed from cart', cart });
});

// Clear the cart 
router.post('/checkout', (req, res) => {
    cart = [];
    res.json({ message: 'Checkout successful, cart cleared!' });
});

module.exports = router;
