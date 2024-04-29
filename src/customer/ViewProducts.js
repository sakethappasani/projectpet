import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './viewproducts.css';
import image from '../image2.jpeg';
import config from '../config';

export default function ViewProducts() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${config.url}viewproducts`);
      setProducts(response.data);
    } catch (error) {
      console.log("Error fetching products:", error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  });


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
                    <button className="buy-now-button" >Buy Now</button>
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
