import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import navlogo from '../Assets/nav-logo.svg';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  
  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    setIsLoggedIn(false);
    navigate('/logina'); 
  };

  return (
    <div className='navbar'>
      <img src={navlogo} className='nav-logo' alt="Logo" />
      {isLoggedIn ? (
        <button onClick={handleLogout} className='loginbtna'>Logout</button>
      ) : (
        <Link to="/logina">
          <button className='loginbtna'>Login</button>
        </Link>
      )}
    </div>
  );
}

export default Navbar;
