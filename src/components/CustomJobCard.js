import React from 'react';

import Stack from '@mui/material/Stack';

import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';

 

import Divider from '@mui/material/Divider';

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import Button from '@mui/material/Button';

import { Link } from 'react-router-dom';

 

function CustomJobCard({ job }) {

  const handleViewJob = () => {

    // Handle view job action here

  };

 

  return (

    <Card

      sx={{

        width: '100%',

        maxWidth: '500px', // Adjust the maximum width as needed

        margin: '10px', // Add margin between cards

      }}

    >

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

        spacing={36}

        sx={{ marginBottom: '12px', paddingRight: '24px' }}

      >

        <Link to={`/job/${job.id}` }><Button onClick={handleViewJob}>View Job</Button></Link>

       

        <Button>Save Job</Button>

      </Stack>

    </Card>

  );

}

 

export default CustomJobCard;