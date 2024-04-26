import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../registration.css'; 
import config from '../config';

export default function SellerRegistration() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    contact: '',
    email: '',
    password: '',
    company: '',
    location: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}insertseller`, formData);
      if (response.status === 200) {
        setFormData({
          firstname: '',
          lastname: '',
          contact: '',
          email: '',
          password: '',
          company: '',
          location: ''
        });
        toast.success('Seller registered successfully!');
        setTimeout(() => {
          window.location.href = "/sellerlogin"; 
        }, 3000); 
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError("An error occurred while processing your request.");
      }
    }
  };

  return (
    <div>
      <br/><br/><br/><br/>
    <div className="registration-container">
      <div className="registration-form">
        <h3>Seller Registration</h3>
        {error && <h4 className="error-message" align="center">{error}</h4>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstname">First Name</label>
            <input type="text" id="firstname" value={formData.firstname} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="lastname">Last Name</label>
            <input type="text" id="lastname" value={formData.lastname} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="contact">Contact</label>
            <input type="text" id="contact" value={formData.contact} onChange={handleChange} pattern="[6789][0-9]{9}" required />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="company">Company</label>
            <input type="text" id="company" value={formData.company} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="location">Location</label>
            <input type="text" id="location" value={formData.location} onChange={handleChange} required />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
      <ToastContainer /> {/* To render the toast messages */}
    </div>
    </div>
  );
}
