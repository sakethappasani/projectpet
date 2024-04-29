import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../customer/viewproducts.css'; // Import CSS file for styling
import image from '../image2.jpeg';
import { ToastContainer, toast } from 'react-toastify';
import config from '../config';

export default function MyProducts() {
  const [sellerData, setSellerData] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedSellerData = localStorage.getItem('seller');
    if (storedSellerData) {
      const parsedSellerData = JSON.parse(storedSellerData);
      setSellerData(parsedSellerData);
    }
  }, []);

  useEffect(() => {
    if (sellerData) {
      fetchProducts();
    }
  });

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${config.url}/myproducts/${sellerData.sellerID}`);
      setProducts(response.data);
    } catch (error) {
      console.log("Error fetching products:", error.message);
    }
  };

  const deleteProduct = async (productID) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this Product ?");
      if (confirmDelete) {
        const response = await axios.delete(`${config.url}/deleteproduct/${productID}`);
        if (response.status === 200) {
          fetchProducts();
          toast.success("Product Deleted Successfully");
        } else {
          toast.error("Failed to delete product");
        }
      } else {
        toast.error("Deletion Cancelled");
      }
    } catch (error) {
      toast.error("Failed to Delete Product");
    }
  }

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
                    <button className="delete-button" onClick={() => deleteProduct(product.productID)}>Delete</button>
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
        <ToastContainer/>
      </div>
    </div>
  );
}
