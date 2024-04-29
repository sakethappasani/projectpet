import '../navbar.css';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import AdminHome from './AdminHome';
import ViewResponses from './ViewResponses';
import ViewSellers from './ViewSellers';
import SellerRegistrationByAdmin from './SRegByAdmin';
import DeleteSellers from './DeleteSellers';
import DeleteCustomers from './DeleteCustomers';
import ViewCustomers from './ViewCustomers';
import ViewPets from './ViewPets';

const AdminNavBar = () => {
  const navigate = useNavigate()
  const handleLogout = () =>{
    localStorage.removeItem('admin')
    localStorage.removeItem('isAdminLoggedIn')

    navigate('https://sdppaams.netlify.app')
    window.location.reload()
  }

  return (
    <div className="container">
      <nav className="navbar">
        <div className="navbar-container">
          <h1 className="logo">Pet Adoption and Accessories Management System</h1>
          <ul className='navbar-menu'>
            <li className='navbar-item'><Link to="/adminhome" className="navbar-link">Home</Link></li>
            <li className="navbar-item dropdown">
              <span className="navbar-link">Customers</span>
              <div className="dropdown-content">
                <Link to='/viewcustomers' className="navbar-link">View Customers</Link>
                <Link to='/deletecustomers' className="navbar-link">Delete Customers</Link>
              </div>
            </li>
            <li className="navbar-item dropdown">
              <span className="navbar-link">Sellers</span>
              <div className="dropdown-content">
                <Link to='/viewsellers' className="navbar-link">View Sellers</Link>
                <Link to='/deletesellers' className="navbar-link">DeleteSellers</Link>
              </div>
            </li>
            <li className="navbar-item dropdown">
              <span className="navbar-link">Pets</span>
              <div className="dropdown-content">
                <Link to='/viewpets' className="navbar-link">View Pets</Link>
              </div>
            </li>
            <li className='navbar-item'><Link to='/viewresponses' className="navbar-link">View Responses</Link></li>
            <li className='navbar-item'><Link onClick={handleLogout} className="navbar-link">Logout</Link></li>
          </ul>
        </div>
      </nav>

      <Routes>
            <Route path='/adminhome' element={<AdminHome/>} exact/>
            <Route path='/viewcustomers' element={<ViewCustomers/>} exact/>
            <Route path='/deletecustomers' element={<DeleteCustomers/>} exact/>
            <Route path='/viewsellers' element={<ViewSellers/>} exact/>
            <Route path='/deletesellers' element={<DeleteSellers/>} exact/>
            <Route path='/viewresponses' element={<ViewResponses/>} exact/>
            <Route path='/viewpets' element={<ViewPets/>} exact/>
            <Route path='/sregadmin' element={<SellerRegistrationByAdmin/>} exact/>
        </Routes>
    </div>
  );
};

export default AdminNavBar;
