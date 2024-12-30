import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const ProductList = () => {
    const [products, setProducts] = useState([]);


    //Get Product from Backend Files
    useEffect(() => {
        axios.get('http://localhost:1337/api/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error("There was an error fetching the products!", error));
    }, []);

    return (
        <div className="product-list">
            <h2>Products</h2>
            <div className="product-grid">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
