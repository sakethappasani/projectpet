import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import SellerHome from './SellerHome';
import SellerProfile from './SellerProfile';
import '../navbar.css'
import AddProduct from './AddProduct';
import MyProducts from './MyProducts';

const SellerNavBar = () => {
  const navigate = useNavigate()
  const handleLogout = () =>{
    localStorage.removeItem('isSellerLoggedIn')
    localStorage.removeItem('seller')
    
    navigate("")
    window.location.reload()
  }

  return (
    <div className="container">
      <nav className="navbar">
        <div className="navbar-container">
          <h1 className="logo">Pet Adoption and Accessories Management System</h1>
          <ul className='navbar-menu'>
            <li className='navbar-item'><Link to="/sellerhome" className="navbar-link">Home</Link></li>
            <li className='navbar-item'><Link to="/addproduct" className="navbar-link">Product</Link></li>
            <li className='navbar-item'><Link to="/myproducts" className="navbar-link">My Products</Link></li>
            <li className='navbar-item'><Link to="/sellerprofile" className="navbar-link">Profile</Link></li>
            <li className='navbar-item'><Link onClick={handleLogout} className="navbar-link">Logout</Link></li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path='/sellerhome' element={<SellerHome />} exact/>
        <Route path='/sellerprofile' element={<SellerProfile />} exact/>
        <Route path='/addproduct' element={<AddProduct />} exact/>
        <Route path='/myproducts' element={<MyProducts />} exact/>

      </Routes>
    </div>
  );
};

export default SellerNavBar;
