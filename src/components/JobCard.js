import React from 'react';
import '../css/JobCard.css'; // Import your CSS file
import Location from '../images/Location.png'
import Company from '../images/Company.png'
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {

  const navigate = useNavigate();
  const handleViewJob = () => {
    // Navigate to the job description page
    navigate(`/job/${job.id}`); // Use the appropriate URL based on your routes
  };
  return (
    <div className="job-card-container">
      <div className="job-card">
        {/* Company Logo */}
        <img
          className="company-logo"
          src={Company} // Replace with the actual logo image source
          alt="Company Logo"
        />
        <div className="outer-paper">
          <div className="box-shadow"></div>
          <h2 className="job-title">{job.title}</h2>
          <div className="company-location">
            <p className="company-name">{job.company}</p>
            <img
              className="location-image"
              src={Location} // Replace with the actual image source
              alt="Location"
            />
            <p className="location-text">{job.location}</p>
          </div>
          <p className="salary-range">{job.salary}</p>
          <p className="experience">{job.experience}</p>
          <div className="apply-save-buttons">
            <button className="apply-button" onClick={handleViewJob}>View Job</button>
            <button className="save-button">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
