import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Product Graphic
const ProductCard = ({ product, onAddToCart }) => (
    <div className="product-card">
        <img src={product.img} alt={product.name} className="product-image" />
        <h3>{product.name}</h3>
        <p>{product.price}</p>
        <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
);

// Cart screen
const CartOverlay = ({ cart, onUpdateCart, onClose, onCheckout }) => (
    <div className="cart-overlay">
        <div className="cart-content">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                cart.map((item) => (
                    <div key={item.id} className="cart-item">
                        <span>{item.name}</span>
                        <span>Quantity: {item.quantity}</span>
                        <span>Total: ${(item.quantity * parseFloat(item.price.slice(1))).toFixed(2)}</span>
                        <button onClick={() => onUpdateCart(item, 'increment')}>+</button>
                        <button onClick={() => onUpdateCart(item, 'decrement')}>-</button>
                    </div>
                ))
            )}
            <button onClick={onCheckout}>Checkout</button>
            <button onClick={onClose}>Close</button>
        </div>
    </div>
);

//Credit Card page
const CheckoutPage = () => (
    <div className="checkout-page">
        <h2>Enter Credit Card Information</h2>
        <form>
            <label>
                Card Number:
                <input type="text" placeholder="1234 5678 9012 3456" />
            </label>
            <label>
                Expiration Date:
                <input type="text" placeholder="MM/YY" />
            </label>
            <label>
                CVV:
                <input type="text" placeholder="123" />
            </label>
            <button type="submit">Submit</button>
        </form>
    </div>
);

// Main app
const App = () => {
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);

    //Fake products
    const products = [
        { id: 1, name: 'Track Jacket', price: '$49.99', img: '/images/track-jacket.webp' },
        { id: 2, name: 'Hoodie', price: '$39.99', img: '/images/hoodie.webp' },
        { id: 3, name: 'Cap', price: '$19.99', img: '/images/cap.jpg' },
        { id: 4, name: 'Sticker', price: '$2.99', img: '/images/sticker.webp' },
        { id: 5, name: 'Mug', price: '$9.99', img: '/images/mug.webp' },
    ];

    //Add to cart button function
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    // How many product is in the cart functions
    const updateCart = (product, action) => {
        setCart((prevCart) =>
            prevCart
                .map((item) => {
                    if (item.id === product.id) {
                        const updatedQuantity = action === 'increment' ? item.quantity + 1 : item.quantity - 1;
                        return updatedQuantity > 0 ? { ...item, quantity: updatedQuantity } : null;
                    }
                    return item;
                })
                .filter(Boolean)
        );
    };

    //Press the cart button and cart overlays the home screen
    const toggleCart = () => {
        setShowCart(!showCart);
    };

    return (
        <Router>
            <div className="App">
                <header>
                    <h1>Online Store</h1>
                    <div className="header-buttons">
                        <div className="cart-icon" onClick={toggleCart}>
                            ?? Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
                        </div>
                    </div>
                </header>

                {showCart && (
                    <CartOverlay
                        cart={cart}
                        onUpdateCart={updateCart}
                        onClose={toggleCart}
                        onCheckout={() => (window.location.href = '/checkout')}
                    />
                )}

                <main className="container">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <div className="product-grid">
                                    {products.map((product) => (
                                        <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                                    ))}
                                </div>
                            }
                        />
                        <Route path="/checkout" element={<CheckoutPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
