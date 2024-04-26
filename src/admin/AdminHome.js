import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

export default function AdminHome() {
  const [adminData, setAdminData] = useState("");
  const [counts, setCounts] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedAdminData = localStorage.getItem('admin');
    if (storedAdminData) {
      const parsedAdminData = JSON.parse(storedAdminData);
      setAdminData(parsedAdminData);
      fetchCounts(); 
    }
  }, []);

  const fetchCounts = async () => {
    try {
      const response = await axios.get(`${config.url}analysis`);
      setCounts(response.data);
    } catch (error) {
      setError('Failed to fetch counts');
    }
  };

  return (
    <div>
      <br/><br/><br/><br/>
      <div>
        {adminData && (
          <div>
            <h2 align="center" style={{color:"green"}}>Welcome {adminData.username}</h2>
            {counts ? (
              <div>
                <h3 align="center">Counts:</h3>
                <div className="profile-card">
                  <p><strong>Sellers:</strong> {counts.sellers}</p>
                </div>
                <div className="profile-card">
                  <p><strong>Products:</strong> {counts.productCount}</p>
                </div>
                <div className="profile-card">
                  <p><strong>Customers:</strong> {counts.customerCount}</p>
                </div>
              </div>
            ) : (
              <p>Loading counts...</p>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
}