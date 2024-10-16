import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import '../components/Navigationbar.css';
import logo from '../images/MealMatelogo.png';
import { logout } from '../features/actions';
import { FaRegCircleUser, FaRegIdCard } from 'react-icons/fa6';
import { IoMdLogIn, IoMdLogOut } from 'react-icons/io';

function Navigation() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // For toggling the mobile menu

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      alert('Logged Out');
      navigate('/login'); // Redirect to login after logout
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // Toggle menu visibility on click
  };

  return (
    <div className="nav">
            <img src={logo} alt="Logo" className="nav-logo" style={{margin:'1rem',width:'8%',height:'100%'}}/>

      <div className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/services">Our Services</Link></li>
          <li><Link to="/privacy">Privacy Policy</Link></li>
          <li><Link to="/contact">Contact</Link></li>

          {user ? (
            <>
              <li>
                <Link to="/profile" className="nav-link">
                  <FaRegCircleUser size={24} style={{ marginRight: '5px' }} />
                  Profile
                </Link>
              </li>
              <li>
                <Link to="#" className="nav-link" onClick={handleLogout}>
                  <IoMdLogOut size={24} style={{ marginRight: '5px' }} />
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/register" className="nav-link">
                  <FaRegIdCard size={24} style={{ marginRight: '5px' }} />
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login" className="nav-link">
                  <IoMdLogIn size={24} style={{ marginRight: '5px' }} />
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      {/* Hamburger Menu Icon */}
      <div className="hamburger" onClick={toggleMobileMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </div>
  );
}

export default Navigation;
