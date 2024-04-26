import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './contact.css'; 
import config from '../config';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}contactform`, formData);
      if (response.status === 200) {
        setFormData({
          name: '',
          email: '',
          reason: ''
        });
        toast.success('Your query has been submitted successfully!');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data);
      } else {
        toast.error('An error occurred while processing your request.');
      }
    }
  };

  return (
    <div>
      <br/><br/>
    <div className="registration-container">
      <div className="registration-form">
        <h3>Contact Form</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Full Name</label>
            <input type="text" id="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <label>Email</label>
            <input type="email" id="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label>Query</label>
            <textarea
              id="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              placeholder="Explain your issue briefly"
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <ToastContainer /> {/* To render the toast messages */}
    </div>
    </div>
  );
}
