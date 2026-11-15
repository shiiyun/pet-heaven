
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { UserRound } from 'lucide-react';

const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="navbar">

      <div className="logo">
        <Link to="/">
          <img src="/images/logo.png"alt="Pet Heaven Logo"/>
        </Link>
      </div>

      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/adoption">Adoption</Link></li>
        <li><Link to="/services">Our Services</Link></li>
        <li><Link to="/aboutus">About Us</Link></li>

        {!isLoggedIn ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        ) : (
          <>
            <li>
              <Link to="/profile" className="profile-link" title="My Profile" aria-label="My Profile">
                <UserRound size={26} />
              </Link>
            </li>
            <li>
              <button onClick={onLogout} className="logout-button">Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
