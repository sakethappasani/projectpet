import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import config from '../config';

export default function ViewSellers() {
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
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" align='center'>Data Not Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}
