import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './response.css';
import config from '../config';

export default function ViewResponses() {
  const [responses, setResponses] = useState([]);

  const fetchResponses = async () => {
    try {
      const response = await axios.get(`${config.url}viewresponses`);
      setResponses(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchResponses();
  }, []);

  const deleteResponse = async (email) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this response?");
      if (confirmDelete) {
        await axios.delete(`${config.url}/deleteresponses/${email}`);
        fetchResponses();
        toast.success('Response deleted successfully!');
      } else {
        toast.error('Deletion cancelled successfully!')
      }
    } catch (error) {
      console.error(error.message);
      toast.error('Failed to delete response.');
    }
  };

  return (
    <div>
      <br/><br/><br/><br/>
    <div className="responses-container">
      <h1 className="responses-header">RESPONSES</h1>
      <div className="card-container">
        {Array.isArray(responses) && responses.length > 0 ? (
          responses.map((response, index) => (
            <div className="card" key={index}>
              <p><strong>Name:</strong> {response.name}</p>
              <p><strong>Email:</strong> {response.email}</p>
              <p><strong>Response:</strong> {response.reason}</p>
              <button onClick={() => deleteResponse(response.email)} className='button'>Delete</button>
            </div>
          ))
        ) : (
          <p align="center" style={{fontWeight:"bold"}}>Data Not Found</p>
        )}
      </div>
      <ToastContainer />
    </div>
    </div>
  );
}
