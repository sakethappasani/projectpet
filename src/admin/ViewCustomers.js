import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './view.css';
import config from '../config';

export default function ViewCustomers() {
  const [users, setUsers] = useState([]);
  // const [searchTerm, setSearchTerm] = useState('');

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${config.url}viewcustomers`);
      setUsers(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div>
      <br/><br/><br/>
      <div className="users-container">
        <h1 className="users-header">CUSTOMERS</h1>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>CustID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(users) && users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.custID}</td>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.gender}</td>
                    <td>{user.dateofbirth}</td>
                    <td>{user.contact}</td>
                    <td>{user.email}</td>
                    <td>{user.location}</td>
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
      </div>
    </div>
  );
}
