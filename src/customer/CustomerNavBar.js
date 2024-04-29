import React from 'react';
import '../navbar.css';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import CustomerHome from './CustomerHome';
import CustomerProfile from './CustomerProfile';
import AddPet from './AddPet';
import ViewAllPets from './ViewAllPets';
import MyPets from './MyPets';
import ViewProducts from './ViewProducts';


const CustomerNavBar = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('isCustomerLoggedIn')
    localStorage.removeItem('customer')
    navigate("")
    window.location.reload()
  }

  return (
    <div className="container">
      <nav className="navbar">
        <div className="navbar-container">
          <h1 className="logo">Pet Adoption and Accessories Management System</h1>
          <ul className='navbar-menu'>
            <li className='navbar-item'><Link to="/customerhome" className="navbar-link">Home</Link></li>
            <li className='navbar-item'><Link to="/viewallpets" className="navbar-link">View All Pets</Link></li>
            <li className='navbar-item'><Link to='/addpet' className="navbar-link">Add Pet</Link></li>
            <li className='navbar-item'><Link to='/mypets' className="navbar-link">My Pets</Link></li>
            <li className='navbar-item'><Link to='/products' className="navbar-link">Products</Link></li>
            <li className='navbar-item'><Link to='/customerprofile' className="navbar-link">Profile</Link></li>
            <li className='navbar-item'><Link onClick={handleLogout} className="navbar-link">Logout</Link></li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path='/customerhome' element={<CustomerHome/>} exact/>
        <Route path='/customerprofile' element={<CustomerProfile/>} exact/>
        <Route path='/viewallpets' element={<ViewAllPets/>} exact/>
        <Route path='/addpet' element={<AddPet/>} exact/>
        <Route path='/mypets' element={<MyPets/>} exact/>
        <Route path='/products' element={<ViewProducts/>} exact/>
      </Routes>
    </div>
  );
};

export default CustomerNavBar;
