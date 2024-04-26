import { BrowserRouter as Router } from 'react-router-dom';
import MainNavBar from './main/MainNavBar';
import AdminNavBar from './admin/AdminNavBar';
import CustomerNavBar from './customer/CustomerNavBar';
import SellerNavBar from './seller/SellerNavBar';
import { useEffect, useState } from 'react';

function App() {

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isSellerLoggedIn, setIsSellerLoggedIn] = useState(false);
  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(false);

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    const sellerLoggedIn = localStorage.getItem('isSellerLoggedIn') === 'true';
    const customerLoggedIn = localStorage.getItem('isCustomerLoggedIn') === 'true';
    
    setIsAdminLoggedIn(adminLoggedIn);
    setIsSellerLoggedIn(sellerLoggedIn);
    setIsCustomerLoggedIn(customerLoggedIn);
  }, []);

  const onAdminLogin = ()=>{
    localStorage.setItem('isAdminLoggedIn','true')
    setIsAdminLoggedIn(true)
  }

  const onSellerLogin = ()=>{
    localStorage.setItem('isSellerLoggedIn','true')
    setIsSellerLoggedIn(true)
  }

  const onCustomerLogin = ()=>{
    localStorage.setItem('isCustomerLoggedIn','true')
    setIsCustomerLoggedIn(true)
  }


  return (

    <div className="App">
      <Router>
        {
          isAdminLoggedIn?
          <AdminNavBar/>:
          isSellerLoggedIn?
          <SellerNavBar/>:
          isCustomerLoggedIn?
          <CustomerNavBar/>:
          <MainNavBar 
          onAdminLogin={onAdminLogin} 
          onSellerLogin={onSellerLogin} 
          onCustomerLogin={onCustomerLogin}
          />
        }
      </Router>
    </div>
  );
}

export default App;
