import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import logo from '../images/logo.png';

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const navigate = useNavigate();
  const logout = () => {
    // Perform logout actions (e.g., clear authentication tokens)
    // After successful logout, call the handleLogout function from the parent component
    handleLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h3 className="navbar-title">
          <img src={logo} alt="Talent Tracker" />
        </h3>
      </div>
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
             Home
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/about" className="navbar-link">
             About
          </Link>
        </li>
        {isLoggedIn ? (
          <>
            <li className="navbar-item">
              <button className="navbar-link" onClick={logout}>
               Logout
              </button>
            </li>
          </>
        ) : (<>
          <li className="navbar-item">
            <Link to="/login" className="navbar-link">
            JobSeekerLogin
            </Link>
          </li>
           
          <li className="navbar-item">
            <Link to="/employerlogin" className="navbar-link">
             RecruiterLogin
            </Link>
          </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
