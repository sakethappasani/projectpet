import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './view.css';
import config from '../config';

export default function DeleteCustomers() {
  const [users, setUsers] = useState([]);

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

  const deleteUser = async (email) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this user?");
      if (confirmDelete) {
        await axios.delete(`${config.url}deletecustomer/${email}`);
        fetchCustomers();
        toast.success('User deleted successfully!');
      } else {
        toast.error('Deletion cancelled successfully!')
      }
    } catch (error) {
      console.error(error.message);
      toast.error('Failed to delete user.');
    }
  };

  return (
    <div>
      <br/><br/><br/>
    <div className="users-container">
      <h1 className="users-header">CUSTOMERS</h1>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index}>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.gender}</td>
                  <td>{user.dateofbirth}</td>
                  <td>{user.contact}</td>
                  <td>{user.email}</td>
                  <td>{user.location}</td>
                  <td>
                    <button onClick={() => deleteUser(user.email)} className='button'>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" align='center'>Data Not Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer/>
    </div>
    </div>
  );
}
