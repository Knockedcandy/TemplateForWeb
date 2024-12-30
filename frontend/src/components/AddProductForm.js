import React, { useState } from 'react';
import '../styles/AddProductForm.css';


const AddProductForm = ({ onAddProduct }) => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const uploadedFile = event.target.files[0];
        if (uploadedFile) {
            setFile(URL.createObjectURL(uploadedFile));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (productName && price) {
            onAddProduct({ name: productName, price, image: file });
            setProductName('');
            setPrice('');
            setFile(null);
        }
    };

    return (
        <form className="product-form" onSubmit={handleSubmit}>
            <h2>Add New Product</h2>

            <div className="upload-box">
                {file ? (
                    <img src={file} alt="Preview" className="image-preview" />
                ) : (
                    <label htmlFor="file-upload" className="upload-label">
                        <span className="plus-icon">+</span>
                        <p>Upload Design</p>
                    </label>
                )}
                <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
            </div>

            <input
                type="text"
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
            />

            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />

            <button type="submit">Add Product</button>
        </form>
    );
};

export default AddProductForm;
