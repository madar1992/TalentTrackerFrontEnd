import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faFileAlt, faHeart, faBell, faClipboard } from '@fortawesome/free-solid-svg-icons'; // Import other icons as needed
import avatar from '../images/avatar.jpg'
import { useUserContext } from './UserProvider';

const Sidebar = () => {

  const navigate = useNavigate();
  const { user } = useUserContext();
  const handleUpdateProfileClick = () => {
    // Navigate to the profile page
    navigate('/profile');
  };

  return (
    <div className="sidebar">
    <div className="sidebar-top">
      <div className="avatar-container">
        <img src={avatar} alt="Avatar" className="avatar" />
      </div>
      <div className="user-name">{user ? user.name : 'Guest'}</div>
      <div className="user-email">{user ? user.email : 'Guest@gmail.com'}</div>
      <button className="update-profile-button" onClick={handleUpdateProfileClick}>
        Update Profile
      </button>
      </div>
      <ul>
        <li><FontAwesomeIcon icon={faSearch} />Find Jobs</li>
        <li><FontAwesomeIcon icon={faFileAlt} />Jobs Applied</li>
        <li><FontAwesomeIcon icon={faHeart} />Saved Jobs</li>
        <li><FontAwesomeIcon icon={faBell} />Alerts</li>
        <li><FontAwesomeIcon icon={faClipboard} />My Resume</li>
      </ul>
    </div>
  );
};

export default Sidebar;
