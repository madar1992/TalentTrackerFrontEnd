import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faFileAlt, faHeart, faBell, faClipboard } from '@fortawesome/free-solid-svg-icons';
import avatar from '../images/avatar.jpg';
import { useUserContext } from './UserProvider';
import axios from 'axios';

const Residebar = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [appliedJobs, setAppliedJobs] = useState([]); // State for applied jobs
  const [savedJobs, setSavedJobs] = useState([]); // State for saved jobs
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  const handleUpdateProfileClick = () => {
    // Navigate to the profile page
    navigate('/postjob');
  };

  // Function to fetch applied jobs
  const fetchAppliedJobs = () => {
    // Get the JWT token from local storage
    const jwtToken = localStorage.getItem('jwtToken');

    // Make an API call to fetch applied jobs based on user ID with the JWT token in the headers
    axios.get(`${apiUrl}/getAppliedJobs/${user.id}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
        setAppliedJobs(response.data); // Update the appliedJobs state
      })
      .catch((error) => {
        console.error('Error fetching applied jobs:', error);
      });
  };

  // Function to fetch saved jobs
  const fetchSavedJobs = () => {
    // Get the JWT token from local storage
    const jwtToken = localStorage.getItem('jwtToken');

    // Make an API call to fetch saved jobs based on user ID with the JWT token in the headers
    axios.get(`${apiUrl}/getSavedJobs/${user.id}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
        setSavedJobs(response.data); // Update the savedJobs state
      })
      .catch((error) => {
        console.error('Error fetching saved jobs:', error);
      });
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
        Post a Job
        </button>
      </div>
      <div className="button-container">
        <ul>
          
          <li onClick={() => navigate('/employer')}>
            <button>
              <FontAwesomeIcon icon={faSearch} /> Dashboard
            </button>
          </li>
          <li onClick={fetchSavedJobs}>
            <button>
              <FontAwesomeIcon icon={faHeart} /> Job Openings
            </button>
          </li>
          <li onClick={() => navigate('/alerts')}>
            <button>
              <FontAwesomeIcon icon={faBell} /> Applicants
            </button>
          </li>
          <li onClick={() => navigate('/my-resume')}>
            <button>
              <FontAwesomeIcon icon={faClipboard} /> Interviews
            </button>
          </li>
          <li onClick={() => navigate('/my-resume')}>
            <button>
              <FontAwesomeIcon icon={faUser} /> Team Members
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Residebar;
