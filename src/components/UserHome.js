// UserHome.js
import React from 'react';
import Sidebar from './Sidebar';
import JobCard from './JobCard';
import '../css/UserHome.css';

const jobs = [
  {
    id: 1,
    title: 'Fullstack Developer',
    company: 'NSEIT',
    location: 'Mumbai',
    salary: '3.5 to 10LPA',
    experience: '4-6 Yrs',
  },
  {
    id: 2,
    title: 'Frontend Developer',
    company: 'ABC Corp',
    location: 'Bangalore',
    salary: '5 to 12LPA',
    experience: '3-5 Yrs',
  },
  {
    id: 3,
    title: 'Java Developer',
    company: 'TekWorks',
    location: 'Vijayawada',
    salary: '8 to 12LPA',
    experience: '3-5 Yrs',
  },
  {
    id: 2,
    title: 'PHP Developer',
    company: 'Symphonize',
    location: 'Bangalore',
    salary: '10 to 12LPA',
    experience: '3-5 Yrs',
  },
  // Add more job data
];

const UserHome = () => {
  return (
    <div className="user-home">
      <Sidebar />
      <div className="main-content">
        <h1 className="recommended-text">Recommended jobs for you!</h1>
        <div className="job-cards-container">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserHome;
