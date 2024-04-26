import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../registration.css'
import config from '../config';

export default function CustomerRegistration() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    dateofbirth: '',
    gender: '',
    contact: '',
    email: '',
    password: '',
    location: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}insertcustomer`, formData);
      if (response.status === 200) {
        setFormData({
          firstname: '',
          lastname: '',
          dateofbirth: '',
          gender: '',
          contact: '',
          email: '',
          password: '',
          location: ''
        });
        toast.success('Registered successfully! Redirecting to login page...');
        setTimeout(() => {
          window.location.href = "/customerlogin"; 
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
      <br/><br/><br/><br/><br/>
    <div className="registration-container">
      <div className="registration-form">
        <h3>Customer Registration</h3>
        {error && <p className="error-message">{error}</p>}
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
            <label htmlFor="dateofbirth">Date of Birth</label>
            <input type="date" id="dateofbirth" value={formData.dateofbirth} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="gender">Gender</label>
            <select id="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
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
            <label htmlFor="location">Location</label>
            <input type="text" id="location" value={formData.location} onChange={handleChange} required />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
      <ToastContainer /> 
    </div>
    </div>
  );
}
