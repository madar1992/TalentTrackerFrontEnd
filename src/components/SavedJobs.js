import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/system';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Button from '@mui/material/Button';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 'calc(50% - 16px)',
  marginBottom: theme.spacing(2),
}));

const CardContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  '& > *': {
    flexBasis: 'calc(50% - 16px)',
    marginBottom: theme.spacing(2),
  },
}));

const ButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '16px',
  padding: '16px',
});

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const { userId } = useParams();
  const jwtToken = localStorage.getItem('jwtToken');

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const response = await axios.get(`${apiUrl}/getSavedJobs/${userId}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setSavedJobs(response.data);
      } catch (error) {
        console.error('Error fetching saved jobs:', error);
      }
    };

    fetchSavedJobs();
  }, [userId, jwtToken]);

  return (
    <CardContainer>
      {savedJobs.map((job, index) => (
        <StyledCard key={index}>
          <CardContent>
            <Typography variant="h5" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              {job.title}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: (theme) => theme.palette.secondary.main }}>
              {job.company}
            </Typography>
            <div sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOnOutlinedIcon fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                {job.location}
              </Typography>
            </div>
            <div sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle1">
                Salary: {job.salary}
              </Typography>
              <Typography variant="subtitle1">
                Experience: {job.experience}
              </Typography>
            </div>
            <Typography variant="body2" sx={{ marginTop: (theme) => theme.spacing(1), color: (theme) => theme.palette.text.secondary }}>
              Posted on {job.datePosted}
            </Typography>
          </CardContent>
          
          <ButtonContainer>
            <Button variant="contained" color="primary">
              Apply
            </Button>
            <Button variant="outlined" color="secondary">
              Cancel
            </Button>
          </ButtonContainer>
        </StyledCard>
      ))}
    </CardContainer>
  );
};

export default SavedJobs;
