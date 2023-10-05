import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import JobsList from './JobsList';
import Sidebar from './Sidebar';
import { useUserContext } from './UserProvider';
import { styled } from '@mui/material/styles';
import AppliedJobs from './AppliedJobs'; // Import the AppliedJobs component
import SavedJobs from './SavedJobs';
import SearchBoxComponent from './SearchBoxComponent'; // Replace with the actual import path

const ContentWrapper = styled('div')({
  padding: (theme) => theme.spacing(2), // Add spacing to the content
});

function UserHome() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const success = queryParams.get('success');
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]); // State to hold the job data
  const [appliedJobs, setAppliedJobs] = useState([]); // State to hold applied job data
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const jobsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const user1 = useUserContext();
  const user = user1.user;
  const id = user.id;
  const [showSavedJobs, setShowSavedJobs] = useState(false);
  const [showAppliedJobs, setShowAppliedJobs] = useState(true); // Set to true initially
  const [showSearchBox, setShowSearchBox] = useState(false);


  const toggleSearchBox = () => {
    setShowSearchBox(!showSearchBox);
  };
  // Define a function to fetch job data
  const fetchJobs = async () => {
    try {
      const response = await Axios.get(`${apiUrl}/getAllJobs/${id}`); // Replace with your API endpoint
      const jobData = response.data; // Assuming your API response is an array of job objects
      setJobs(jobData);
    } catch (error) {
      console.error('Error fetching job data:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [id]); // Fetch jobs when the user ID changes

  const handleFindJobsClick = () => {
    setShowSavedJobs(false); // Hide saved jobs
    setShowAppliedJobs(true); // Show applied jobs
  };

  const handleAppliedJobsClick = () => {
    setShowSavedJobs(false); // Hide saved jobs
    setShowAppliedJobs(true); // Show applied jobs
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const jobsToDisplay = jobs.slice(startIndex, endIndex);

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} sm={2} sx={{ display: 'flex', justifyContent: 'center', pt: 1, pr: 0 }}>
        {/* Pass setShowAppliedJobs and setShowSavedJobs to the Sidebar component */}
        <Sidebar setShowAppliedJobs={setShowAppliedJobs} setShowSavedJobs={setShowSavedJobs} toggleSearchBox={toggleSearchBox} />
      </Grid>
      <Grid item xs={12} sm={10} sx={{ display: 'flex' }}>
        <ContentWrapper>
          <Typography variant="h4" className="recommended-text">
            Recommended jobs for you!

            {jobs.length === 0 && (
              <div style={{ color: 'red' }}>
                If you are not able to get any recommended job, please update your profile first
              </div>
            )}
            {success === 'profile-updated' && (
              <div style={{ backgroundColor: 'green', color: 'white', padding: '0px', height: '40px', width: '450px' }}>
                Profile updated successfully!
              </div>
            )}

          </Typography>

          {/* Conditionally render the search box */}
          {showSearchBox && <SearchBoxComponent />}
          <JobsList jobs={jobsToDisplay} />
          
          {/* Conditionally display the AppliedJobs or SavedJobs component */}
          {showAppliedJobs && <AppliedJobs userId={id} />} {/* Pass the user ID to the AppliedJobs component */}
          {showSavedJobs && <SavedJobs userId={id} />} {/* Pass the user ID to the SavedJobs component */}
          
          <div style={{ display: 'flex', marginTop: 'auto', alignSelf: 'flex-end' }}>
            {jobs.length > jobsPerPage && (
              <Pagination
                count={Math.ceil(jobs.length / jobsPerPage)}
                page={currentPage}
                onChange={handleChangePage}
                variant="outlined"
                shape="rounded"
              />
            )}
          </div>
        </ContentWrapper>
      </Grid>
    </Grid>
  );
}

export default UserHome;
