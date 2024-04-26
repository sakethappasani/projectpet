import React, { useEffect, useState } from 'react';
import '../card.css';

export default function SellerProfile() {
  const [sellerData, setSellerData] = useState(null);

  useEffect(() => {
    const storedSellerData = localStorage.getItem('seller');
    if (storedSellerData) {
      const parsedSellerData = JSON.parse(storedSellerData);
      setSellerData(parsedSellerData);
    }
  }, []);

  return (
    <div>
      <br/><br/><br/>
      <h2 align="center" style={{ color: 'blue' }}>Your Profile</h2>
      {sellerData ? (
        <div className='profile-card'>
          <p><strong>First Name:</strong> {sellerData.firstname}</p>
          <p><strong>Last Name:</strong> {sellerData.lastname}</p>
          <p><strong>Company:</strong> {sellerData.company}</p>
          <p><strong>Email:</strong> {sellerData.email}</p>
          <p><strong>Location:</strong> {sellerData.location}</p>
          <p><strong>Contact:</strong> {sellerData.contact}</p>
        </div>
      ) : (
        <p>No Seller Data Found</p>
      )}
    </div>
  );
}
