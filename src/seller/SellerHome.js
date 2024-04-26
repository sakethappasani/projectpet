import React, { useEffect, useState } from 'react';

export default function SellerHome() {
  const [sellerData, setSellerData] = useState("");

  useEffect(() => {
    const storedSellerData = localStorage.getItem('seller');
    if (storedSellerData) {
      const parsedSellerData = JSON.parse(storedSellerData);
      setSellerData(parsedSellerData)
    }
  }, []);

  return (
    <div>
      <br/><br/><br/><br/>
    <div>
      {sellerData && (
        <div>
          <h2 align="center" style={{color:"green"}}>Welcome {sellerData.firstname+" "+sellerData.lastname}</h2>
        </div>
      )}
    </div>
    </div>
  );
}