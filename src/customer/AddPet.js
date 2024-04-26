import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../registration.css';
import config from '../config';

export default function AddPet() {
  const [customerData,setCustomerData] = useState("")

  useEffect(() => {
    const storedCustomerData = localStorage.getItem('customer')
    if(setCustomerData)
    {
      const parsedCustomerData = JSON.parse(storedCustomerData)
      setCustomerData(parsedCustomerData)
    } 
  }, [])
  
  const [formData, setFormData] = useState({
    petname: '',
    category: '',
    breed: '',
    gender: '',
    age: '',
    addedby : '',
    customer : '',
    customerID : ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}insertpet`,{ ...formData, customer:customerData, addedby : `${customerData.firstname} ${customerData.lastname}`, customerID : customerData.custID});
      if (response.status === 200) {
        setFormData({
          petname: '',
          category: '',
          breed: '',
          gender: '',
          age: '',
          addedby : '',
          customer : '',
          customerID : ''
        });
        toast.success('Pet registered successfully!');
        setTimeout(() => {
          window.location.href="/viewallpets"; 
        }, 1000); 
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError('An error occurred while processing your request.');
      }
    }
  };

  return (
    <div>
      <br/><br/>
      <div className="registration-container">
        <div className="registration-form">
          <h3>Pet Registration</h3>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="petname">Pet Name</label>
              <input type="text" id="petname" value={formData.petname} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <select id="category" value={formData.category} onChange={handleChange} required>
                <option value="">Select Category</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="bird">Bird</option>
                <option value="fish">Fish</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div>
              <label htmlFor="breed">Breed</label>
              <input type="text" id="breed" value={formData.breed} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="gender">Gender</label>
              <select id="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label htmlFor="age">Age</label>
              <input type="number" id="age" value={formData.age} onChange={handleChange} required />
            </div>
            <button type="submit">Register Pet</button>
          </form>
        </div>
        <ToastContainer /> 
      </div>
    </div>
  );
}
