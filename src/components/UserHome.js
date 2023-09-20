import React, { useState } from 'react';

import Sidebar from './Sidebar';

import Grid from '@mui/material/Grid';

import { styled } from '@mui/material/styles';

import Typography from '@mui/material/Typography';

import Pagination from '@mui/material/Pagination';

import JobsList from './JobsList';

import {Jobs} from './Jobs';
import { useLocation } from 'react-router-dom';
 

const ContentWrapper = styled('div')({

  padding: (theme) => theme.spacing(2), // Add spacing to the content

});

 

function UserHome() {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const success = queryParams.get('success');
  const [selectedJob, setSelectedJob] = useState(null);

 

  const jobsPerPage = 6;

  const [currentPage, setCurrentPage] = useState(1);

 

  const handleChangePage = (event, newPage) => {

    setCurrentPage(newPage);

  };

 

  const startIndex = (currentPage - 1) * jobsPerPage;

  const endIndex = startIndex + jobsPerPage;

  const jobsToDisplay = Jobs.slice(startIndex, endIndex);

 

  return (

    <Grid container spacing={0}>

       {success === 'profile-updated' && (
        <div style={{ backgroundColor: 'green', color: 'white', padding: '10px' }}>
          Profile updated successfully!
        </div>
      )}
      <Grid item xs={12} sm={2} sx={{ display: 'flex', justifyContent: 'center', pt: 1, pr: 0 }}>

        <Sidebar />

      </Grid>

 

      <Grid item xs={12} sm={10} sx={{ display: 'flex' }}>

        <ContentWrapper>

          <Typography variant="h4" className="recommended-text">

            Recommended jobs for you!

          </Typography>

 

 

          <JobsList jobs={jobsToDisplay} />

 

 

          <div style={{ display: 'flex', marginTop: 'auto', alignSelf: 'flex-end' }}>

            {Jobs.length > jobsPerPage && (

              <Pagination

                count={Math.ceil(Jobs.length / jobsPerPage)}

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