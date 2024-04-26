import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../config';

export default function DeleteSellers() {
  const [sellers, setSellers] = useState([]);

  const fetchSellers = async () => {
    try {
      const response = await axios.get(`${config.url}viewsellers`);
      setSellers(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  const deleteSeller = async (email) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this seller?");
      if (confirmDelete) {
        await axios.delete(`${config.url}/deleteseller/${email}`);
        fetchSellers();
        toast.success('Seller deleted successfully!');
      } else {
        toast.error('Deletion cancelled successfully!')
      }
    } catch (error) {
      console.error(error.message);
      toast.error('Failed to delete seller.');
    }
  };

  return (
    <div>
      <br/><br/><br/>
    <div className="users-container">
      <h1 className="users-header">SELLERS</h1>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Company</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(sellers) && sellers.length > 0 ? (
              sellers.map((seller, index) => (
                <tr key={index}>
                  <td>{seller.firstname}</td>
                  <td>{seller.lastname}</td>
                  <td>{seller.contact}</td>
                  <td>{seller.email}</td>
                  <td>{seller.company}</td>
                  <td>{seller.location}</td>
                  <td>
                    <button onClick={() => deleteSeller(seller.email)} className='button'>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" align='center'>Data Not Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="add-seller-button-container">
        <Link to="/sregadmin" className="add-seller-button">Add Seller</Link>
      </div>

      <ToastContainer/>
    </div>
    </div>
  );
}