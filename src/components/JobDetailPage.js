import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { Jobs } from './Jobs'; // Import your job data

import Sidebar from './Sidebar';

 

import Grid from '@mui/material/Grid';

import { styled } from '@mui/material/styles';

 

import Stack from '@mui/material/Stack';

import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';

 

import Divider from '@mui/material/Divider';

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import Button from '@mui/material/Button';

import { Link } from 'react-router-dom';

function JobDetailPage() {

  const ContentWrapper = styled('div')({

    padding: (theme) => theme.spacing(2), // Add spacing to the content

  });

  const handleViewJob = () => {

    // Handle view job action here

  };

 

  const { id } = useParams(); // Get the job ID from the URL parameter

  //console.log(id);

 

  // Sample job data (you can replace this with your API fetch)

  const [job, setJob] = useState(null);

 

  // Simulate fetching job details based on the ID

  useEffect(() => {

    // Find the job with the matching ID

    const foundJob = Jobs.find((j) => j.id === parseInt(id));

 

    if (foundJob) {

      setJob(foundJob);

    }

  }, [id]);

 

  if (!job) {

    // Handle the case where the job is not found

    return <div>Job not found</div>;

  }

 

  return (

    <div>

     

      <Grid container spacing={0}>

      <Grid item xs={12} sm={2} sx={{ display: 'flex', justifyContent: 'center', pt: 1, pr: 0 }}>

        <Sidebar />

      </Grid>

 

      <Grid item xs={12} sm={10} sx={{ display: 'flex' }}>

        <ContentWrapper>

 

 

          {/* <CustomJobCard job={job} /> */}

          <Card sx={{

    width: '80vw', // Set the width to '100%' for full width

    border:'1px solid red',

  }}>

     

      <CardContent

        sx={{

          display: 'flex',

          flexDirection: 'row',

          justifyContent: 'space-between',

          alignItems: 'center',

          paddingRight: '24px',

        }}

      >

        <Stack spacing={3}>

          <Typography variant="body2" color="text.secondary">

            {job.title}

          </Typography>

          <Stack direction="row" spacing={1}>

            <Typography variant="body2" color="text.secondary">

              {job.company}

            </Typography>

            <Divider orientation="vertical" flexItem />

            <Stack direction="row" spacing={0.5} alignItems="center">

              <LocationOnOutlinedIcon fontSize="small" />

              <Typography variant="body2" color="text.secondary">

                {job.location}

              </Typography>

            </Stack>

          </Stack>

          <Stack direction="row" spacing={6}>

            <Typography variant="body2" color="text.secondary">

              {job.salary}

            </Typography>

            <Typography variant="body2" color="text.secondary">

              {job.experience}

            </Typography>

          </Stack>

          <Typography variant="body2" color="text.secondary">

            Posted on {job.datePosted}

          </Typography>

        </Stack>

        <img

          src="/assets/1.jpg"

          alt="company name"

          height="64px"

          width="64px"

        />

      </CardContent>

      <Stack

        direction="row"

        gap="space-between"

        sx={{ marginBottom: '12px', paddingRight: '24px' }}

      >

        <Link to={`/job/${job.id}` }><Button sx={{backgroundColor:'blue'}} onClick={handleViewJob}>Apply</Button></Link>

        <Link to={`/user` }><Button onClick={handleViewJob}>Cancel</Button></Link>

       

        <Button>Save Job</Button>

      </Stack>

    </Card>

 

 

         

        </ContentWrapper>

      </Grid>

    </Grid>

 

 

    </div>

  );

}

 

export default JobDetailPage;