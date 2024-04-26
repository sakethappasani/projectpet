import React, { useEffect, useState } from 'react';
import '../card.css';

export default function CustomerProfile() {
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    const storedCustomerData = localStorage.getItem('customer');
    if (storedCustomerData) {
      const parsedCustomerData = JSON.parse(storedCustomerData);
      setCustomerData(parsedCustomerData);
    }
  }, []);

  return (
    <div>
      <br/><br/><br/>
      <h2 align="center" style={{ color: 'blue' }}>Your Profile</h2>
      {customerData ? (
        <div className='profile-card'>
          <p><strong>First Name:</strong> {customerData.firstname}</p>
          <p><strong>Last Name:</strong> {customerData.lastname}</p>
          <p><strong>Date of Birth:</strong> {customerData.dateofbirth}</p>
          <p><strong>Gender:</strong> {customerData.gender.toUpperCase()}</p>
          <p><strong>Company:</strong> {customerData.contact}</p>
          <p><strong>Email:</strong> {customerData.email}</p>
          <p><strong>Location:</strong> {customerData.location}</p>
        </div>
      ) : (
        <p>No Seller Data Found</p>
      )}
    </div>
  );
}
