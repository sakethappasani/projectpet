import React from 'react';
import '../navbar.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Contact from './Contact';
import About from './About';
import SellerLogin from '../seller/SellerLogin';
import AdminLogin from '../admin/AdminLogin';
import CustomerLogin from '../customer/CustomerLogin';
import CustomerRegistration from '../customer/CustomerRegistration';
import SellerRegistration from '../seller/SellerRegistration';

const MainNavBar = (props) => {
  return (
    <div className="container">
      <nav className="navbar">
        <div className="navbar-container">
          <h1 className="logo">Pet Adoption and Accessories Management System</h1>
          <ul className='navbar-menu'>
            <li className='navbar-item'><Link to="/home" className="navbar-link">Home</Link></li>
            <li className="navbar-item dropdown">
              <span className="navbar-link">Login</span>
              <div className="dropdown-content">
                <Link to='/customerlogin' className="navbar-link">Customer Login</Link>
                <Link to='/sellerlogin' className="navbar-link">Seller Login</Link>
                <Link to='/adminlogin' className="navbar-link">Admin Login</Link>
              </div>
            </li>
            <li className='navbar-item'><Link to='/about' className="navbar-link">About</Link></li>
            <li className='navbar-item'><Link to='/contact' className="navbar-link">Contact</Link></li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path='/' element={<Home/>} exact/>
        <Route path='/home' element={<Home/>} exact/>
        <Route path='/registration' element={<CustomerRegistration/>} exact/>
        <Route path='/sellerregistration' element={<SellerRegistration/>} exact/>
        <Route path='/customerlogin' element={<CustomerLogin onCustomerLogin={props.onCustomerLogin}/>} exact/>
        <Route path='/sellerlogin' element={<SellerLogin onSellerLogin={props.onSellerLogin}/>} exact/>
        <Route path='/adminlogin' element={<AdminLogin onAdminLogin = {props.onAdminLogin}/>} exact/>
        <Route path='/contact' element={<Contact/>} exact/>
        <Route path='/about' element={<About/>} exact/>
      </Routes>
    </div>
  );
};

export default MainNavBar;
