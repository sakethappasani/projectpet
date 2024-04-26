import React, { useState } from 'react';
import axios from 'axios';
import '../common.css';
import { useNavigate } from 'react-router-dom';
import config from '../config';

export default function SellerLogin({onSellerLogin}) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}checksellerlogin`, formData);
      if (response.data != null) {
        onSellerLogin()
        localStorage.setItem('seller',JSON.stringify(response.data))
        navigate('/sellerhome')
      } else {
        setMessage("Login Failed");
        setError("");
      }
    } catch (error) {
      setMessage("");
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h2>Seller Login</h2>
        {message ? <p className="error-message">{message}</p>:<p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="submit-button">Login</button>
        </form>
        <p>Don't have an account? <a href="/sellerregistration">Register as Seller</a></p>
      </div>
    </div>
  );
}
