import React, { useState } from 'react';
import axios from 'axios';
import '../common.css'
import { useNavigate } from 'react-router-dom';
import config from '../config';

export default function AdminLogin({onAdminLogin}) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      const response = await axios.post(`${config.url}checkadminlogin`, formData);
      if (response.data != null) 
      {
        onAdminLogin()
        localStorage.setItem('admin',JSON.stringify(response.data))
        navigate("/adminhome")
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
        <h2>Admin Login</h2>
        {
          message ? <p className="message" align="center" style={{color:"red"}}>{message}</p> : error
        }
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="submit-button">Login</button>
        </form>
      </div>
    </div>
  );
}
