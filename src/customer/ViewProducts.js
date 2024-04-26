import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './viewproducts.css'; // Import CSS file for styling
import image from '../image2.jpeg';
import { Razorpay } from 'razorpay-checkout'; // Import Razorpay library
import config from '../config';

export default function ViewProducts() {
  const [customerData, setCustomerData] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedCustomerData = localStorage.getItem('customer');
    if (storedCustomerData) {
      const parsedCustomerData = JSON.parse(storedCustomerData);
      setCustomerData(parsedCustomerData);
    }
  }, []);

  const fetchProducts = async () => {
    try {
      console.log("Fetching products...");
      const response = await axios.get(`${config.url}viewproducts`);
      console.log("Products fetched:", response.data);
      setProducts(response.data);
    } catch (error) {
      console.log("Error fetching products:", error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleBuyNow = async (productName, productPrice) => {
    const options = {
      key: 'rzp_test_xUIHrkrkhUtUlU',
      amount: productPrice * 100, // Convert price to paise (Razorpay expects price in paise)
      currency: 'INR',
      name: 'Your Company Name',
      description: `Purchase of ${productName}`,
      image: '/your-company-logo.png',
      handler: function(response) {
        alert('Payment successful');
        // You can add further actions here after successful payment
      },
      prefill: {
        name: customerData?.name || '',
        email: customerData?.email || '',
        contact: customerData?.phone || ''
      }
    };
    const rzp = new Razorpay(options);
    rzp.open();
  };

  return (
    <div>
      <br/><br/><br/><br/>
      <div className="products-container">
        <h1 className="products-header">PRODUCTS</h1>
        <div className="products-list">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product, index) => (
              <div className="product-card" key={index}>
                <div className="product-front">
                  <div className="product-image">
                    <img src={image} alt={product.productName} />
                  </div>
                  <div className="product-details">
                    <h2 className="product-name">{product.productName}</h2>
                    <p className="product-description">{product.addedBy}</p>
                    <p className="product-price">Price: {product.price}</p>
                    {/* Call handleBuyNow function with product details */}
                    <button className="buy-now-button" onClick={() => handleBuyNow(product.productName, product.price)}>Buy Now</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="product-card">
              <p className="no-products">No Products Found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}