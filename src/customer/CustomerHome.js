import React, { useEffect, useState } from 'react';

export default function CustomerHome() {
  const [customerData, setCustomerData] = useState("");

  useEffect(() => {
    const storedCustomerData = localStorage.getItem('customer');
    if (storedCustomerData) {
      const parsedCustomerData = JSON.parse(storedCustomerData);
      setCustomerData(parsedCustomerData)
    }
  }, []);

  return (
    <div>
      <br/><br/><br/><br/>
    <div>
      {customerData && (
        <div>
          <h2 align="center" style={{color:"green"}}>Welcome {customerData.firstname+" "+customerData.lastname}</h2>
        </div>
      )}
    </div>
    </div>
  );
}