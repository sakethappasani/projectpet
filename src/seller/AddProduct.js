import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import config from '../config';

export default function AddProduct() {
    const [sellerData, setSellerData] = useState("");
    const [formData, setFormData] = useState({
        productName: '',
        productDes: '',
        price: '',
        addedBy: '',
        addedByID: '' 
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const storedSellerData = localStorage.getItem('seller');
        if (storedSellerData) {
            const parsedSellerData = JSON.parse(storedSellerData);
            setSellerData(parsedSellerData);
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${config.url}addproduct`, {...formData, addedBy: sellerData.company, addedByID: sellerData.sellerID});
            if (response.status === 200) {
                setFormData({
                    productName: '',
                    productDes: '',
                    price: '',
                    addedBy: '',
                    addedByID: ''
                });
                toast.success('Product Added Successfully');
                setTimeout(() => {
                    window.location.href = "/myproducts";
                }, 1000);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data);
            } else {
                setError('An error occurred while processing your request');
            }
        }
    };

    return (
        <div>
            <br />
            <div className='registration-container'>
                <div className='registration-form'>
                    <h3>Add Product</h3>
                    {error && <p className='error-message'>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Product Name</label>
                            <input type="text" id="productName" value={formData.productName} onChange={handleChange} required />
                        </div>
                        <div>
                            <label>Product Description</label>
                            <textarea id='productDes' value={formData.productDes} onChange={handleChange} required></textarea>
                        </div>
                        <div>
                            <label>Price</label>
                            <input type='number' id='price' value={formData.price} onChange={handleChange} required />
                        </div>
                        <button type='submit'>Add Product</button> {/* removed onSubmit from button */}
                    </form>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}
