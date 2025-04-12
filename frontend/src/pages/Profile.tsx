import React from 'react';
import { Typography, Box } from '@mui/material';

const Profile: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Profile
      </Typography>
      <Typography>
        User profile will be implemented here
      </Typography>
    </Box>
  );
};

export default Profile;